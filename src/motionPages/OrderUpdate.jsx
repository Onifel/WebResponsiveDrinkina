import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const OrderUpdate = ({onClose, onChange, values}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [pushOn, setPushOn] = useState(false)
    const [smsOn, setSmsOn] = useState(false)
    
    const slideVariants = {
        hidden: { y: "100vh", opacity: 0 },
        visible: { y: "0", opacity: 1 },
        exit: { y: "100vh", opacity: 0 },
    }

    useEffect(() => {
        setPushOn(values?.push === "On");
        setSmsOn(values?.sms === "On");
    }, [values]);

    const togglePush = () => {
        const newPush = !pushOn
        setPushOn(newPush)
        onChange && onChange({
            push: newPush ? "On" : "Off",
            sms: smsOn ? "On" : "Off"
        }, 0)
    }

    const toggleSms = () => {
        const newSms = !smsOn;
        setSmsOn(newSms);
        onChange && onChange({
          push: pushOn ? "On" : "Off",
          sms: newSms ? "On" : "Off"
        }, 0);
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
                <h1 className="titleOU">Order Updates</h1>
                <p>Receive timely updates to track your order every step of the way.</p>
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
                <div className="form-check form-switch mt-3 pt-4">
                    <label className="form-check-label namePush" htmlFor="notifSwitch">
                        {smsOn ? "SMS On" : "SMS Off"}
                    </label>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`${smsOn ? "smsSwitchOn" : "smsSwitchOff"}`}
                        checked={smsOn}
                        onChange={toggleSms}
                    />
                </div>
                <p className="paraSms">Toggle on to get Order Updates by text message. Message & data rates may apply.</p>
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

export default OrderUpdate