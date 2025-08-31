import { useLocation, useNavigate, useParams } from "react-router-dom"
import leftArrow from '../assets/icons/left-arrow.png'
import CartIcon from "../components/CartIcon"
import Selections from "../components/Selections"
import { title } from "../jsFile/List"
import Cart from '../motionPages/Cart';
import { useState } from 'react';
import { useSelector } from "react-redux"


const Delivery = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { prefId, storeId } = useParams()
  const storeIndex = parseInt(storeId)
  const [showCart, setShowCart] = useState(false)
  const cartNumb = useSelector(state => state.cart)

  const getModeId = () => {
    if (location.pathname.includes("/pick/0/")) return 1;
    if (location.pathname.includes("/pick/1/")) return 2;
    return parseInt(prefId) || 0;
  };
  
  const modeId = getModeId();  

  const handleBack= () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/order');
    }
  }

  return (
    <div className="headDel">
          <div className="delTitles">
            <h1 
              className="titles gap-3"
              onClick={handleBack}
            >
              <div>
                <img src={leftArrow} className="arrow" />
              </div>
              <span className="headDelP">{title[modeId]?.name || 'Delivery'}</span>     
            </h1>
            {
              cartNumb.length > 0 ? (
                <div className='divBtn' onClick={() => setShowCart(true)}>
                  <button className='topBtn'>
                    <CartIcon />
                    <p className='cartText'>View Cart</p>
                  </button>
                </div>
              ) : (
                <div></div>
              )
            }
          </div>
          <Selections />
          {showCart && (
            <>
              <div
                  className="overlay"
                  onClick={() => setShowCart(false)}
              ></div>
              <Cart onClose={() => setShowCart(false)} />
            </>
          )}
    </div>
  )
}

export default Delivery