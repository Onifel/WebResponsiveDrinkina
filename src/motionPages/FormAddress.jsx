import { useState, useEffect } from "react"
import leftArrow from '../assets/icons/left-arrow.png'
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const FormAddress = ({formData = {}, onClose, onAddressSelected}) => {
    const [isVisible, setIsVisible] = useState(true)
    const [formDataState, setFormDataState] = useState(() => ({
        name: formData.name || '',
        street: formData.street || '',
        apt: formData.apt || '',
        zip: formData.zip || '',
        city: formData.city || '',
        state: formData.state || '',
        country: formData.country || '',
        instructions: formData.instructions || '',
        default: formData.default || false
    }))
    const { user } = useSelector((state) => state.auth)
    
    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);  

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.4 }}
          className="slideAdForm pageBg"
        >
            <div className="headFormAd">
                <button
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(() => {
                            onClose()
                        }, 400)
                    }}
                    className="closeArrow"
                >
                    <img src={leftArrow} className="arrowL" />
                </button>
                <h1 className='pmtTitle'>Address</h1>
            </div>
            <div className="formAd">    
                <input
                    className="inputAd"
                    placeholder="Full Name"
                    value={formDataState.name}
                    onChange={(e) => setFormDataState((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                    className="inputAd"
                    placeholder="Street Address"
                    value={formDataState.street}
                    readOnly
                />
                <div className="d-flex">
                    <input
                        className="inputAdApt"
                        placeholder="Apt/Suite (Optional)"
                        value={formDataState.apt}
                        onChange={(e) => setFormDataState((prev) => ({ ...prev, apt: e.target.value }))}
                    />
                    <input
                        className="inputAdZip"
                        placeholder="Zip / Postal Code"
                        value={formDataState.zip}
                        readOnly
                    />
                </div>
                <input
                    className="inputAd"
                    placeholder="City"
                    value={formDataState.city}
                    readOnly
                />
                <select
                    className="inputAd"
                    value={formData.state}
                    onChange={(e) => setFormDataState((prev) => ({ ...prev, state: e.target.value }))}
                >
                    <option value="MD">Maryland</option>
                    <option value="VA">Virginia</option>
                    <option value="DC">Washington DC</option>
                </select>
                <select
                    className="inputAd"
                    value={formDataState.country}
                    onChange={(e) => setFormDataState((prev) => ({ ...prev, country: e.target.value }))}
                >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                </select>
                <textarea
                    className="inputAdText"
                    placeholder="Delivery Instructions (Optional)"
                    value={formDataState.instructions}
                    onChange={(e) => setFormDataState((prev) => ({ ...prev, instructions: e.target.value }))}
                />
                <label className="labelText">
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={formDataState.default}
                        onChange={(e) => setFormDataState((prev) => ({ ...prev, default: !prev.default }))}
                    /> 
                        Make this my default delivery address
                </label>
            </div>
            <div className="btnDiv">
                <button 
                    className='btnHero' 
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(() => {
                            onAddressSelected(formDataState);
                            onClose()
                        }, 400)
                    }}
                >Save Address</button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FormAddress