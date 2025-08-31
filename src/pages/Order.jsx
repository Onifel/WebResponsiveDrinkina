import CartIcon from '../components/CartIcon'
import { orderList } from '../jsFile/List';
import { useNavigate } from 'react-router-dom';
import Cart from '../motionPages/Cart';
import { useEffect, useState } from 'react';
import logo from '../assets/logo/logoDrinkinaPink.png'
import menu from '../assets/icons/menuWhite.png'
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';

const Order = () => {
  const navigate = useNavigate()
  const [showCart, setShowCart] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1120)
  const cartNumb = useSelector(state => state.cart)

  useEffect(() => {
    const handleResizeD = () => {
      setIsDesktop(window.innerWidth > 1120)
    }
    window.addEventListener("resize", handleResizeD)

    return () => window.removeEventListener("resize", handleResizeD)
  }, [])

  const handleOrder = (id) => {
    if (id === 0) {
      navigate('/delivery')
    }else if (id === 1) {
      navigate('/pickup')
    }
  }

  const handleClickMenu = () => {
    if (!showSideBar) {
      setShowSideBar(true)
    }
  }

  return (
    <div className='order pageBg'>
      <div className='head'>
        <img src={logo} className='headImg' />
        <p className='textDrinkina'>drink'ina</p>
      </div>
      <div className='contOrder'>
        <img src={menu} alt="#" className='menuTop' onClick={handleClickMenu} />
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
          <div className={isDesktop ? 'container' : 'container-fluid'}>
          <h1 className='titleOrder'>Start an Order</h1>
          <div className="orderSelect gap-2">
            {
              orderList.map((order, index) => (
                <div  key={index} className="sectionOrder" onClick={() => handleOrder(index)}>
                  <img src={order.img} className='delivery' />
                  <p className='deliv'>{order.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {showSideBar && ( 
        <SideBar onClose={() => setShowSideBar(false)}/> 
      )}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  )
}

export default Order