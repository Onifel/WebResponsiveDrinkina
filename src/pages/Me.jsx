import { myAccount } from "../jsFile/List"
import rightA from '../assets/icons/right-arrow.png'
import { useState } from "react"
import menu from '../assets/icons/menuWhite.png'
import MyOrder from "../motionPages/MyOrder"
import Settings from "../motionPages/Settings"
import Profile from "../motionPages/Profile"
import Rewards from "../motionPages/Rewards"
import SideBar from '../components/SideBar';
import { useSelector } from "react-redux"

const Me = () => {
  const [showSlide, setShowSlide] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const [indexStore, setIndexStore] = useState(null)
  const {user} = useSelector((state) => state.auth)

  const handleClickMenu = () => {
    if (!showSideBar) {
      setShowSideBar(true)
    }
  }
  
  const handleClick = (id) => {
    setShowSlide(true)
    switch (id) {
      case 0:
        setIndexStore(0)
        break;
      case 1:
        setIndexStore(1)
        break;
      case 2:
        setIndexStore(2)
        break;
      case 3:
        setIndexStore(3)
        break;
      default:
        break;
    }
  }

  return (
    <div className="contMe pageBg">
      <div className="meHead">
        <img src={menu} alt="#" className='menuTop' onClick={handleClickMenu} />
        <h3 className="headMe">{user?.name}</h3>
      </div>
  
      <div className="containerMe container">
        {
          myAccount.map((acc, index) => (
            <div 
              key={index}
              className="asideMe"
              onClick={() => handleClick(index)}
            >
              <img src={acc.icon} className='cater'/>
              <p className="nameMe">{acc.title}</p>
              <div className="modeD">
                <img src={rightA} className="arrowLoc" />
              </div>
            </div>
          ))
        }   
      </div>
      {
        showSlide && (
          <>
            <div 
              className="overlay"
              onClick={() => setShowSlide(false)}
            ></div>

            {indexStore === 0 && <MyOrder onClose={() => setShowSlide(false)} />}
            {indexStore === 1 && <Settings onClose={() => setShowSlide(false)} />}
            {indexStore === 2 && <Profile onClose={() => setShowSlide(false)} />}
            {indexStore === 3 && <Rewards onClose={() => setShowSlide(false)} />}
          </>
        )
      }
      {showSideBar && ( 
        <SideBar onClose={() => setShowSideBar(false)}/> 
      )}
    </div>
  )
}

export default Me