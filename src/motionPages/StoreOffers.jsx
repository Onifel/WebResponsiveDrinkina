import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const StoreOffers = ({onClose, onChange, title, para, values, id}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [pushOn, setPushOn] = useState(false)
    
    const slideVariants = {
        hidden: { y: "100vh", opacity: 0 },
        visible: { y: "0", opacity: 1 },
        exit: { y: "100vh", opacity: 0 },
    }

    useEffect(() => {
        setPushOn(values?.push === "On")
    }, [values])

    const togglePush = () => {
        const newPush = !pushOn
        setPushOn(newPush)
        onChange && onChange({
            push: newPush ? "On" : "Off",
            sms: ""
        }, id)
    }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="slideOU pageBg"
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
            <div className="contOU">
                <h1 className="titleOU">{title}</h1>
                <p>{para}</p>
                <div className="form-check form-switch mt-3 formSwitch">
                    <label className="form-check-label namePush" htmlFor="notifSwitch">
                        {pushOn ? "Push On" : "Push Off"}
                    </label>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`${pushOn ? "notifSwitchOn" : "notifSwitchOff"}`}
                        checked={pushOn}
                        onChange={togglePush}
                    />
                </div>
            </div>
            <div className="btnDiv">
                <button 
                    className='btnHero' 
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(() => {
                            onClose()
                        }, 400)
                    }}
                >Done</button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StoreOffers