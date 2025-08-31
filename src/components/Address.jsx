import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import FormAddress from "../motionPages/FormAddress"
import map from '../assets/icons/map.png'

const Address = () => {
    const [value, setValue] = useState("")
    const inputRef = useRef()
    const [showAddress, setShowAddress] = useState(false)
    const [showSlide, setShowSlide] = useState(false)
    const [selectedFormData, setSelectedFormData] = useState(null)
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

  return (
    <>
        <div className="contAddress pageBg">
            <h2 className="textPay">Delivery Address</h2>
            <input
                ref={inputRef} 
                className="inputAddress" 
                placeholder={`${listAddress.length > 0 ? 'Add an address' : 'Enter an Address'} `}
                value={showAddress ? "" : value}
                onChange={(e) => setValue(e.target.value)}
            />

            {showAddress && (
                <div className="adAd">
                    {listAddress.map((address, index) => (
                        <div key={index} className="adBar">
                            <img src={map} className="mapIcon" />
                            <div className="adSt">
                                <h6 className="nameAd">
                                    {address.name}
                                </h6>
                                <p className="street">{address.street} {""} {address.apt}</p>
                                <p className="state">
                                    {address.city}, {""}
                                    {address.state} 
                                </p>
                                <p className="state">{address.zip}</p>
                                <p className="instructions">{address.instructions}</p>
                            </div>
                            
                            <div className="itemAd">
                                {address.default === true ? 
                                    (
                                        <button className="defaultAd">
                                            {address.default && ("Default")}
                                        </button>
                                    ):(
                                        <p></p>
                                    )
                                }
                                <button 
                                    className="btnDel"
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
    </>
  )
}

export default Address