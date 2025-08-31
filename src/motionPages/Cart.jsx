import { useDispatch, useSelector } from 'react-redux'
import { removeCart, selectSubtotal, updateCartQuantity } from '../redux/cartSlice'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Checkout from './Checkout'

const Cart = ({onClose}) => {
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(true)
    const [showSlide, setShowSlide] = useState(false)
    const subtotal = useSelector(selectSubtotal)
    const cartItems = useSelector((state) => state.cart)
    
    const slideVariants = {
        hidden: { y: "100vh", opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: "100vh", opacity: 0 },
    }

    const handleDelete = (name) => {
        dispatch(updateCartQuantity({name, quantity: -1}))
    }

    const handleCheck = () => {
        setShowSlide(true)
    }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="divCart pageBg"
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
                className='closeBtnCart modeDark'
            >
                <p>&times;</p>
            </button>

            <h1 className='cartTitle'>My Cart</h1>

            <div className='contCart'>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item, index) => (
                            <div key={index} className="contItem d-flex">
                                <div className="item">
                                    <img src={item.img} className="kaly" />
                                    <h5>{item.name}</h5>
                                    <p className='desc'>{item.desc}</p>
                                    <p className='price'><span>{item.dollar}</span>{item.price}</p>
                                </div>

                                <div className="quantitySelectorCart">
                                    <button 
                                        className="minusBtn"
                                        onClick={() => handleDelete(item.name)}
                                    >-</button>

                                    <span className="qty">{item.quantity}</span>

                                    <button 
                                        className="plusBtn"
                                        onClick={() => dispatch(updateCartQuantity({ name: item.name, quantity: 1 }))}
                                    >+</button>
                                </div>
                            </div>
                        ))}

                        <div className="divBtnCart mt-4">
                            <button className='btnHero' onClick={handleCheck}>Checkout</button>
                        </div>

                        <div className='d-flex mb-5'>
                            <p className='subtotal'>Subtotal</p>
                            <p>${(subtotal || 0).toFixed(2)}</p>
                        </div>
                    </>
                ) : (
                    <h4>Your Cart is Empty!</h4>
                )}
            </div>
            
            {showSlide && <Checkout onClose={() => setShowSlide(false)} />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cart