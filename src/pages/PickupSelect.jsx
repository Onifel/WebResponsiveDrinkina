import { useNavigate, useParams } from 'react-router-dom'
import CartIcon from '../components/CartIcon'
import leftArrow from '../assets/icons/left-arrow.png'
import { pickPref, stores } from '../jsFile/List';
import Cart from '../motionPages/Cart';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const PickupSelect = () => {
    const {id} = useParams()
    const store = stores[parseInt(id)]
    const nameStore = store?.name
    const navigate = useNavigate()
    const [showCart, setShowCart] = useState(false)
    const cartNumb = useSelector(state => state.cart)

    const handleSelPick = (prefId) => {
        navigate(`/pick/${prefId}/${id}`)
    }

    const handleBack = () => navigate(-1)
    

  return (
    <div className='pageBg'>
            <div className="d-flex checkTitles">
                <h1 
                    className="titles gap-3"
                    onClick={handleBack}
                >
                <div>
                    <img src={leftArrow} className="arrowPick" />
                </div>
                    {
                        store && <span className='headDelP'>{nameStore}</span>
                    }      
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
            {showCart && <Cart onClose={() => setShowCart(false)} />}
            </div>
            <div className="pickSel">
                <h4 className='titlePick'>Pickup Preference</h4>
                <div className='container'>
                    {
                        pickPref.map((pick, index) => {
                            return(
                                <div 
                                    key={index}
                                    className="asideOrder"
                                    onClick={() => handleSelPick(index)}
                                >
                                    <img src={pick.icon} className='cater'/>
                                    <p className="catering">  {pick.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="empty"></div>
    </div>
  )
}

export default PickupSelect