import { useSelector } from 'react-redux'
import cart from '../assets/icons/shopping-cart.png'
import { useLocation, matchPath } from 'react-router-dom'

const CartIcon = () => {
    const cartNumber = useSelector(state => state.cart)
    const location = useLocation()

    const cssChange = [
        '/delivery',
        '/pickup',
        '/location/:id',
        'pick/0/:id',
        'pick/1/:id'
    ].some(path => matchPath(path, location.pathname))

  return (
    <div className='divCartIcon'>
        <button 
            className='btnCart modeDarkCart'
        >
            <img src={cart} className='cartImg' />
            {cartNumber.length > 0 && 
                <span 
                    className= 'numb'
                >
                        {cartNumber.length}
                </span>
            }
        </button>
    </div>
  )
}

export default CartIcon