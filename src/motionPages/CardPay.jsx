import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import rightArrow from '../assets/icons/right-arrow.png'
import NewCardForm from "./newCardForm";

const CardPay = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [showPay, setShowPay] = useState(false)
    
    const slideVariants = {
        hidden: { y: "100vh", opacity: 0 },
        visible: { y: "0", opacity: 1 },
        exit: { y: "100vh", opacity: 0 },
    }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cardPay pageBg"
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
            <button
                onClick={() => {
                  setIsVisible(false)
                  onClose()
                }}
                className="closeBtn modeDark"
            >
                <p>&times;</p>
            </button>
            <h2>Payment Method</h2>
            <button 
              className="btnCard"
              onClick={() => setShowPay(true)} 
            >
                <p className="newCard">New Card</p>
                <img 
                    src={rightArrow} 
                    className="arrow"
                />
            </button>
            {showPay && (
                <>
                    <NewCardForm onClose={() => setShowPay(false)}/>
                </>
            )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CardPay