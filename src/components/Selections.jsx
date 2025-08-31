import { serviceList, drinkList, menuList, peckishList } from "../jsFile/List"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCart, updateCartQuantity } from "../redux/cartSlice"

const Selections = () => {
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)

    const handleAddCart = (item) => {
        const existing  = cartItems.find(cartItem => cartItem.name === item.name)
        if (existing) {
            dispatch(updateCartQuantity({ name: item.name, quantity: 1}))
        }else{
            dispatch(addCart({...item, quantity: 1}))
        }
    }

  return (
    <div className="contSel pageBg">
        <ul className="custom-tabs" role="tablist">
            {
                serviceList.map((service, index) => (
                    <li 
                        key={index} 
                        onClick={()=>setActiveTab(index)}
                        className={`custom-tab ${activeTab === index ? 'active': ''}`}
                    >
                        {service.nameTab}
                    </li>
                ))
            }
        </ul>

        <div className="tab-content">
            {
                activeTab === 0 && (
                    <div className="tab-pane active container mb-3">
                        <h3 className="selectFood">Drinks</h3>
                        {
                            drinkList.map((drink, index) => (
                                <div key={index} className="d-flex">
                                    <div className="item">
                                        <img src={drink.img} className="kaly" />
                                        <h5 className="titleDel">{drink.name}</h5>
                                        <p className="desc">{drink.desc}</p>
                                        <p className="price"><span>{drink.dollar}</span>{drink.price}</p>
                                    </div>

                                    {cartItems.find((cartItem) => cartItem.name === drink.name) ? (
                                        <div className="quantitySelector">
                                            <button 
                                                className="minusBtn"
                                                onClick={() => dispatch(updateCartQuantity({ name: drink.name, quantity: -1 }))}
                                            >-</button>

                                            <span className="qty">
                                                {cartItems.find(cartItem => cartItem.name === drink.name).quantity}
                                            </span>

                                            <button 
                                                className="plusBtn"
                                                onClick={() => dispatch(updateCartQuantity({ name: drink.name, quantity: 1 }))}
                                            >+</button>
                                        </div>
                                    ) : (
                                        <button 
                                        className="btnArrow"
                                        onClick={() => handleAddCart(drink)}
                                        >+</button>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                activeTab === 1 && (
                    <div className="tab-pane active">
                        {
                            menuList.map((menu, index) => {
                                const items = Object.values(menu).find(value => Array.isArray(value))
                                return (
                                    <div key={index} className="container mb-3">
                                        <h3 className="selectFood">{menu.title}</h3>
                                        <div>
                                            {
                                                items.map((item, index) => (
                                                    <div key={index} className="container d-flex">
                                                        <div className="item">
                                                            <img src={item.img} className="kaly" />
                                                            <h5 className="titleDel">{item.name}</h5>
                                                            <p className="desc">{item.desc}</p>
                                                            <p className="price"><span>{item.dollar}</span>{item.price}</p>
                                                        </div>
                                                        {cartItems.find((cartItem) => cartItem.name === item.name) ? (
                                                            <div className="quantitySelector">
                                                                <button 
                                                                    className="minusBtn"
                                                                    onClick={() => dispatch(updateCartQuantity({ name: item.name, quantity: -1 }))}
                                                                >-</button>

                                                                <span className="qty">
                                                                    {cartItems.find(cartItem => cartItem.name === item.name).quantity}
                                                                </span>

                                                                <button 
                                                                    className="plusBtn"
                                                                    onClick={() => dispatch(updateCartQuantity({ name: item.name, quantity: 1 }))}
                                                                >+</button>
                                                            </div>
                                                        ) : (
                                                            <button 
                                                            className="btnArrow"
                                                            onClick={() => handleAddCart(item)}
                                                            >+</button>
                                                        )}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                </div>
                                )
                            })
                        }
                    </div>
                )
            }

            {
                activeTab === 2 && (
                    <div className="tab-pane active container">
                        {
                            peckishList.map((peck, id) => {
                                const items = Object.values(peck).find(value => Array.isArray(value))
                                return (
                                    <div key={id} className="container">
                                        <h3 className="selectFood">{peck.title}</h3>
                                        <div>
                                            {
                                                items.map((item, id) => (
                                                    <div key={id} className="d-flex">
                                                        <div className="item">
                                                            <img src={item.img} className="kaly" />
                                                            <h5 className="titleDel">{item.name}</h5>
                                                            <p className="desc">{item.desc}</p>
                                                            <p className="price"><span>{item.dollar}</span>{item.price}</p>
                                                        </div>
                                                        {cartItems.find((cartItem) => cartItem.name === item.name) ? (
                                                            <div className="quantitySelector">
                                                                <button 
                                                                    className="minusBtn"
                                                                    onClick={() => dispatch(updateCartQuantity({ name: item.name, quantity: -1 }))}
                                                                >-</button>

                                                                <span className="qty">
                                                                    {cartItems.find(cartItem => cartItem.name === item.name).quantity}
                                                                </span>

                                                                <button 
                                                                    className="plusBtn"
                                                                    onClick={() => dispatch(updateCartQuantity({ name: item.name, quantity: 1 }))}
                                                                >+</button>
                                                            </div>
                                                        ) : (
                                                            <button 
                                                            className="btnArrow"
                                                            onClick={() => handleAddCart(item)}
                                                            >+</button>
                                                        )}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Selections