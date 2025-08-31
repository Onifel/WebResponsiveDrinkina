import {motion} from 'framer-motion'

const Paypal = ({onClose, payWeb}) => {
  return (
    <motion.div
        className="popup-content pageBg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <h6>"Drink'ina" Wants to Use "{payWeb}" to Sign In</h6>
        <p className='modalPara'>This allows the app and website to share information about you.</p>
        <div className='modalBtn'>
            <button 
                onClick={onClose}
                className='btnModalL'
            >Close</button>
            <button className='btnModalR'>Continue</button>
        </div>
    </motion.div>
  )
}

export default Paypal