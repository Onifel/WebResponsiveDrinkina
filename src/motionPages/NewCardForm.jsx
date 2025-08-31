import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const NewCardForm = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)

    const handleContinue = () => {

    }

    const slideVariants = {
        hidden: {y: "100vh", opacity: 0},
        visible: {y: 0, opacity: 1},
        exit: {y: "100vh", opacity: 0}
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div 
                className='newCardForm pageBg'
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{duration: 0.4}}
            >
                <button 
                    className='closeBtn modeDark'
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(() => {
                            onClose()
                        }, 400)
                    }}
                >
                    <p>&times;</p>
                </button>
                <h1 className='titleNewC'>New card</h1>
                <div className='formNewC'>
                    <div className='d-flex'>
                        <h6 className='cardInfo'>Card information</h6>
                        <p className='cardScan'>Scan card</p>
                    </div>
                    <input 
                        className='inputC'
                        placeholder='Card number' 
                    />
                    <div className='d-flex'>
                        <input 
                            className='inpG' 
                            placeholder='MM/YY'
                        />
                        <input 
                            className='inpC' 
                            placeholder='CVC'
                        />
                    </div>
                    <h6 className='cardInfo'>Billing address</h6>
                    <select className='inputC'>
                        <option value="US">United States</option>
                        <option value="US">Canada</option>
                    </select>
                    <input 
                        className='inputPay' 
                        placeholder='ZIP'
                    />
                    <p className='paraPay'>By providing your card information, you allow Drink'ina to charge your card for future payments in accordance with their terms.</p>
                </div>
                <div className="btnDiv">
                    <button className='btnHero' onClick={handleContinue}>Continue</button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default NewCardForm