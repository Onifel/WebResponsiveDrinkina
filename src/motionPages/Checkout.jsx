import leftArrow from '../assets/icons/left-arrow.png'
import { useDispatch, useSelector } from "react-redux"
import { selectSubtotal } from "../redux/cartSlice"
import rightArrow from '../assets/icons/right-arrow.png'
import { selectTip } from "../redux/checkoutSlice"
import Address from "../components/Address"
import { setTip } from "../redux/checkoutSlice"
import { useState } from "react"
import CardPay from "./CardPay"
import { AnimatePresence, motion } from "framer-motion"
import TipAmount from "./TipAmount"
import AnimatedText from '../components/AnimatedText'
import { toast } from 'react-toastify'
import { createOrder } from "../redux/orderSlice"
import { clearCart } from "../redux/cartSlice"
import { useNavigate } from 'react-router-dom'

const Checkout = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const subtotal = useSelector(selectSubtotal)
    const tax = subtotal * 0.06
    const deliveryFee = 5
    const tip = useSelector(selectTip)
    const total = subtotal + tax + deliveryFee + tip
    const dispatch = useDispatch()
    const [showSlide, setShowSlide] = useState(false)
    const [showCardPay, setShowCardPay] = useState(false)
    const [selectedTip, setSelectedTip] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const cartItems = useSelector((state) => state.cart)
    const navigate = useNavigate()

    const handleTip = () => {
        setShowSlide(true)
        setSelectedTip(4)    
    }

    const handleBack = () => {
        setIsVisible(false)
        setTimeout(() => {
            onClose()
        }, 200)
    }

    const handlePay = async () => {
        if (!user) {
            toast.error("Please log in before placing an order")
            setIsVisible(false)
            setTimeout(() => {
                onClose()
                navigate('/signin')
            }, 200)
            return
        }

        if (!cartItems || cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            for (const item of cartItems) {
                const orderData = {
                    customerName: user?.name || "Guest", 
                    drinkName: item.name,
                    quantity: item.quantity || 1,
                    price: item.price,
                    imageUrl: item.img,
                    createdAt: new Date().toISOString(),
                };

                console.log("Cart Items:", cartItems);
                console.log("User:", user);
                console.log("Sending orderData:", orderData);

                await dispatch(createOrder(orderData)).unwrap()
            }

            toast.success("Order placed successfully!");
            dispatch(clearCart());
            onClose();
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || JSON.stringify(err);
            toast.error(`Order failed: ${message}`);
        }
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{ duration: 0.2 }}
                className="slideCheck pageBg"
            >
                <div className={`checkTitles checkoutContent ${showCardPay ? 'blurred' : ''}`}>
                    <h1 
                        className="titles gap-3"
                        onClick={handleBack}
                    >
                    <div>
                        <img src={leftArrow} className="arrowPick" />
                    </div>
                    <span className="headDelP">Checkout</span>     
                    </h1>
                </div>

                <div className='leftSideCheckout darkLSC'>
                    <AnimatedText />
                </div>

                <div className='contCheckout'>
                    <div className="checkContainer">
                        <h2 className="titleCheck">Order Details</h2>
                        <div className="d-flex mt-4">
                            <h5 className="subtotal">Subtotal</h5>
                            <p className="paraDollar">${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="d-flex">
                            <h5 className="subtotal">Sales Tax (6.00%)</h5>
                            <p className="paraDollar">${tax.toFixed(2)}</p>
                        </div>
                        <div className="d-flex">
                            <h5 className="subtotal">Delivery Fee</h5>
                            <p className="paraDollar">${deliveryFee.toFixed(2)}</p>
                        </div>
                        <div className="d-flex">
                            <h5 className="subtotal">Tip</h5>
                            <p className="paraDollar">${tip.toFixed(2)}</p>
                        </div>
                        <div className="btnTip">
                            {[2, 3, 5].map(amount => (
                                <button 
                                key={amount}
                                    className="btnNumbTip btnNumbTipDM"
                                    onClick={() => {
                                        setSelectedTip(amount)
                                        dispatch(setTip(amount))
                                    }}
                                    style={{
                                        backgroundColor: selectedTip === amount ? '#f0c0bc': 'transparent'
                                    }}
                                >
                                    ${amount}
                                </button>
                            ))}
                            <button 
                                className="btnNumbTip btnNumbTipDM"
                                onClick={handleTip}
                                style={{
                                    backgroundColor: selectedTip === 4 ? '#f0c0bc': 'transparent'
                                }}
                            >
                                Other
                            </button>
                        </div>
                        <div>
                            <p className="paraTip">100% of tips go to the drivers</p>
                        </div>

                        {showSlide && (
                            <TipAmount onClose={() => setShowSlide(false)}/>
                        )}

                        <div className="d-flex mb-2">
                            <h4 className="total">Total</h4>
                            <h5>${total.toFixed(2)}</h5>
                        </div>
                    </div>
                    <div className="adDel">
                        <Address />
                    </div>
                    <div className="contPay">
                        <h2 className="textPay">Payment</h2>
                        <button 
                            className="btnPay"
                            onClick={() => setShowCardPay(true)}
                        >
                            <img 
                                src={rightArrow} 
                                className="arrow" 
                            />
                        </button>
                    </div>
                    <div className="btnDiv">
                        <button className='btnHero' onClick={handlePay}>Place Order</button>
                    </div>
                </div>

                {showCardPay && (
                    <>
                        <div
                            className="overlay"
                            onClick={() => setShowCardPay(false)}
                        ></div>
                        <CardPay onClose={() => setShowCardPay(false)} />
                    </>
                )}
                
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Checkout