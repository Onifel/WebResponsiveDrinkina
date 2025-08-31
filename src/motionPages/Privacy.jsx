import { useState } from 'react'
import { AnimatePresence, motion, } from "framer-motion";
import arrowR from '../assets/icons/top.png'
import rightA from '../assets/icons/right-arrow.png'

const Privacy = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)

    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="slideAcc pageBg"
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
                <h1 className='pmtTitle'>Privacy</h1>
                <div className='formAcc'>
                    <p className='paraPri'>Drink'ina protects your privacy and personal information.</p>
                    <button className='btnChangePwd'>Learn More<img src={arrowR} className='imgArrow'/></button>
                </div>
                <div className='manageAcc'>
                    <h6>Location Access</h6>
                    <p className='descAcc descAccDM'>Allow location access to easily se nearby restaurents and help ensure accurate deliveries.</p>
                    <div className='locAccess'>
                        <p className='paraName'>Location Access</p>
                        <div className='rightSide'>
                            <p className='allowed'>Allowed</p>
                            <div className='modeD'>
                                <img src={rightA} className="arrowLoc" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='manageAcc'>
                    <h6>Microphone Access</h6>
                    <p className='descAcc descAccDM'>Allow microphone access for voice search</p>
                    <div className='locAccess'>
                        <p className='paraName'>Microphone Access</p>
                        <div className='modeD'>
                            <img src={rightA} className="arrowLoc" />
                        </div>
                    </div>
                </div>
                <div className='Acc'>
                    <h6>Marketing Choices</h6>
                    <p className='descAcc descAccDM'>Learn about and control personalized ads.</p>
                    <button className='btnChangePwd'>Learn More <img src={arrowR} className='imgArrow'/></button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Privacy