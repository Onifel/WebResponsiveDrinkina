import { useState } from 'react'
import { AnimatePresence, motion, } from "framer-motion";
import medal from '../assets/icons/medal.png'

const Rewards = ({onClose}) => {
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
            className="slideRew pageBg"
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
                          }, 200)
                    }}
                    className="closeArrow modeDark"
                >
                    &larr;
                </button>
                    <button className='rewBtn'>
                        <img src={medal} className='medal' />
                    </button>
                    <div className='contRew'>
                        <h1 className='titleRew'>My Rewards</h1>
                        <p className='paraRew'>You've redeemed a total of $0</p>
                        <button className='btnDeals'>See more deals</button>
                    </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Rewards