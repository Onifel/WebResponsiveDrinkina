import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import rightArrow from '../assets/icons/right-arrow.png'
import { AnimatePresence, motion, } from "framer-motion";
import FormAddress from "./FormAddress";

const AddressSett = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const [value, setValue] = useState("")
    const inputRef = useRef()
    const [showSlide, setShowSlide] = useState(false)
    const [selectedFormData, setSelectedFormData] = useState(null)
    const [showAddress, setShowAddress] = useState(false)
    const [listAddress, setListAddress] = useState(() => {
        const stored = localStorage.getItem('listAddress')
        return stored ? JSON.parse(stored) : []
    })
    const [formData, setFormData] = useState({
        name:'',
        street: '',
        apt: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        instructions: '',
        default: false
    })
    const location = useLocation()

    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }      

    const handleDel = (id) => {
        setListAddress(prev => prev.filter((_, index) => index !== id))
    }

    useEffect(() => {
        const saved = location.state?.savedAddress
        if (saved){
            setListAddress(prev => {
                const exists = prev.some(addr =>
                    addr.street === saved.street &&
                    addr.city === saved.city &&
                    addr.state === saved.state &&
                    addr.zip === saved.zip
                )
                return exists ? prev : [...prev, saved]
            })
            setShowAddress(true)
            
        }
    }, [location.state])

    useEffect(() => {
        localStorage.setItem('listAddress', JSON.stringify(listAddress))
    }, [listAddress])    

    useEffect(() => {
        if (!window.google || !inputRef.current) return;

        const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["geocode"],
            componentRestrictions: {country: "us"},
        })

        ac.addListener("place_changed", () => {
            const place = ac.getPlace()
            if (!place.formatted_address) return;

            const addressComponents = place.address_components || []
            const getComponent = (type) => addressComponents.find(c => c.types.includes(type))?.long_name || ''
            const newFormData = {
                ...formData,
                street: `${getComponent('street_number')} ${getComponent('route')}`,
                zip: getComponent('postal_code'),
                city: getComponent('locality') || getComponent('sublocality'),
                state: getComponent('administrative_area_level_1'),
                country: getComponent('country'),
            }

            setValue(place.formatted_address)
            setSelectedFormData(newFormData)
            setShowSlide(true); 
        })
    }, [])

    useEffect(() => {
        if (showAddress) {
            setValue("")
        }
    }, [showAddress])

  return (
    <AnimatePresence>
    {isVisible && (
        <motion.div
        className="slideAdSett pageBg"
        variants={slideVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.4 }}
        >
            <button
                onClick={() => {
                    setIsVisible(false)
                    setTimeout(() => {
                        onClose()
                      }, 400)
                }}
                className="closeArrow modeDark"
            >
                &larr;
            </button>
            <h1 className='pmtTitle'>Adresses</h1>
        <div className="contAddressSett">
            <input
                ref={inputRef} 
                className="inputAddress" 
                placeholder={`${listAddress.length === 0 ? 'Enter an address' : 'Add an Address'} `}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            {showAddress && (
                <div className="adAd">
                    {listAddress.map((address, index) => (
                        <div key={index} className="adBar">
                            <div className="adSt">
                                <h6>{address.name}</h6>
                                <p className="street">{address.street} {""} {address.apt}</p>
                                <p className="state">
                                    {address.city}, {""}
                                    {address.state} {""}
                                    {address.zip} 
                                </p>
                            </div>

                            <div className="itemAd">
                                {address.default === true ? 
                                    (
                                        <p className="defaultAdSett defaultAdSettDM">
                                            {address.default && ("Default")}
                                        </p>
                                    ):(
                                        <p className="nonDefault"></p>
                                    )
                                }
                                <button 
                                    className="btnDelAdSett"
                                    onClick={() => handleDel(index)}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showSlide && (
                <FormAddress
                    formData={selectedFormData}
                    onClose={() => setShowSlide(false)}
                    onAddressSelected={(data) => {
                        console.log(data);
                        setListAddress(prev => [...prev, data])
                        setShowAddress(true)
                        setShowSlide(false)
                    }}
                />
            )}
        </div>                          
        </motion.div>
        )}
    </AnimatePresence>
  )
}

export default AddressSett