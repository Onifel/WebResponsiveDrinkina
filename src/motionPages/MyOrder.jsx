import { useState, useEffect } from 'react'
import { AnimatePresence, motion, } from "framer-motion";
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../redux/orderSlice"
import { toast } from "react-toastify"
import { div } from 'framer-motion/client';

const MyOrder = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const dispatch = useDispatch()
    const { orders = [], loading = false, error = null } = useSelector(
      (state) => state.orders || {}
    );

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
        dispatch(getAllOrders())
        }
    }, [dispatch, user])

    useEffect(() => {
        if (error) {
        toast.error("Failed to load orders")
        }
    }, [error])

    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="slideMe pageBg"
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
                <h1 className='pmtTitle'>My Orders</h1>

                {loading && <p>Loading orders...</p>}

                {!loading && orders.length === 0 && (
                  <div className="divNoOrder">
                    <h2 className="noOrders">You don’t have any orders yet.</h2>
                  </div>
                )}

                <div>
                  {orders.map((order) => (
                    <div key={order.id} className="item">
                      <img
                        src={order.imageUrl || "/placeholder.png"} 
                        alt={order.drinkName}
                        className="kaly"
                      />
                      <h5 className="titleDel">{order.drinkName}</h5>
                      <p className="desc">
                        Ordered by {order.customerName}, quantity: {order.quantity}
                      </p>
                      <p className="price">
                        Price: ${order.price}, date placed: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default MyOrder