import { useState } from 'react'
import { AnimatePresence, motion, } from "framer-motion";
import visa from '../assets/icons/visa.png'
import card from '../assets/icons/card.png'
import { payment } from '../jsFile/List'
import rightA from '../assets/icons/right-arrow.png'
import NewCardForm from './newCardForm'
import Paypal from './Paypal'

const Payment = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const [showSlide, setShowSlide] = useState(false)
    const [indexStore, setIndexStore] = useState(null)

    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }

    const getPayForId = (index) => {
        switch (index) {
            case 1: return "paypal.com"
            case 2: return "venmo.com"    
            case 3: return "cash.app"
            case 4: return "klarna.com"
            default: return ""
        } 
    }

    const handlePmt = (id) => {
        setShowSlide(true)
        switch (id) {
            case 0:
                setIndexStore(0)
            break;
            case 1:
                setIndexStore(1)
            break;
            case 2:
                setIndexStore(2)
            break;
            case 3:
                setIndexStore(3)
            break;
            case 4:
                setIndexStore(4)
            break;
            case 5:
                setIndexStore(5)
            break;
            default:
            break;
        }
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="slidePmt pageBg"
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
                <h1 className='pmtTitle'>Payment</h1>
                <div className='savedPmt'>
                    <h6 className='titlePmt'>Saved Payment Method</h6>
                    <div className="pmtSaved">
                        <div className="cardSaved">
                            <img src={visa} className="iconCard"/>
                            <p className="cardPara">Visa Card</p>
                        </div>
                    </div>
                    <div className="pmtSaved">
                        <div className="cardSaved">
                            <img src={card} className="iconCard"/>
                            <p className="cardPara">Mastercard</p>
                        </div>
                    </div> 
                </div>
                <div className='addPmt'>
                    <h6 className='titlePmt'>Add Payment Method</h6>
                    {
                        payment.map((pay, index) => (
                        <div 
                            key={index} 
                            className="pmtSaved"
                            onClick={() => handlePmt(index)}
                        >
                            <div className="cardSaved">
                                <img src={pay.icon} className="iconCard"/>
                                <p className="cardPara">{pay.name}</p>
                                <div className='modeD'>
                                    <img src={rightA} className="arrowLoc" />
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>
                {showSlide &&
                    ((indexStore === 0 || indexStore === 5) && (
                        <>
                            <div
                                className="overlay"
                                onClick={() => {
                                    setShowSlide(false)
                                    setIndexStore(null)
                                }}
                            ></div>
                            <NewCardForm onClose={() => setShowSlide(false)}/>
                        </>    
                    )) ||
                    (indexStore >= 1 && indexStore <= 4 && (
                        <>
                            <div 
                                className="overlay" 
                                onClick={() => {
                                    setShowSlide(false)
                                    setIndexStore(null)
                                }}
                            ></div>
                            <Paypal 
                                onClose={() => {
                                setShowSlide(false)
                                setIndexStore(null)
                                }}
                                payWeb={getPayForId(indexStore)}
                            />
                        </>    
                    )) 
                }
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Payment