import { useEffect, useState } from 'react'
import logo from '../assets/logo/logoDrinkinaPink.png'
import SideBar from "./SideBar";
import menu from '../assets/icons/menuWhite.png'

const Head = () => {
  const [isScrolling, setIsScrolling] = useState(window.scrollY > 0 )
  const [showSideBar, setShowSideBar] = useState(false)

  useEffect(() => {
    const handleScrollY = () => {
      setIsScrolling(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScrollY)
  }, [])

  const handleClickMenu = () => {
    if (!showSideBar) {
      setShowSideBar(true)
    }
  }

  return (
    <>
      <div 
        className='head'
        style={{
          backgroundColor: isScrolling ? ' #edc1b8' : 'transparent',
          transition: 'all 1s ease'
        }}
      >
        <img src={menu} alt="#" className='menuTop' onClick={handleClickMenu} />
        {
          showSideBar && (
            <SideBar 
              onClose={() => setShowSideBar(false)}
            />
          )
        }
        <div className='logoDrinkina'>
          <img src={logo} className='headImg' />
          <p className='textDrinkina'>drink'ina</p>
        </div>
      </div>
    </>
  )
}

export default Head