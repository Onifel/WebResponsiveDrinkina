import { useNavigate } from "react-router-dom";
import { drinkList } from "../jsFile/List"
import { useEffect, useState } from 'react'
import LearnMore from "../motionPages/LearnMore";

const Drinks = () => {
  const allCoffees = [...drinkList]
  const [hoverL, setHoverL] = useState(false)
  const [hoverR, setHoverR] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1120)
  const [isLaptop, setIsLaptop] = useState(window.innerWidth > 800)
  const [isTablet, setIsTablet] = useState(window.innerWidth > 500)
  const [isScrolling, setIsScrolling] = useState(window.scrollY > 0)

  const navigate = useNavigate()
  const [isLearnMore, setIsLearnMore] = useState(false)

  useEffect(() => {
    const handleResizeD = () => {
      setIsDesktop(window.innerWidth > 1120)
    }
    const handleResizeL = () => {
      setIsLaptop(window.innerWidth > 800)
    }
    const handleResizeT = () => {
      setIsTablet(window.innerWidth > 600)
    }
    const handleScrollY = () => {
      setIsScrolling(window.scrollY > 0)
    }

    window.addEventListener("resize", handleResizeD)
    window.addEventListener("resize", handleResizeL)
    window.addEventListener("resize", handleResizeT)
    window.addEventListener("scroll", handleScrollY)

    return (
      () => window.removeEventListener('resize', handleResizeD),
      () => window.removeEventListener('resize', handleResizeL),
      () => window.removeEventListener('resize', handleResizeT)
    )
  }, [])

  const handleLearnMore = (id) => {
    setActiveId(id)
    setIsLearnMore(true)
  }

  const handleOrder = () => {
    navigate('/order');
  }

  return (
    <div className='drinks d-flex flex-column pageBg'>
      
      {isScrolling ? 
        <div className={isTablet ? "divBtn" : "btnBottom"}>
          <button 
            className={isTablet ? 'topBtn' : 'btnHero'} 
            onClick={handleOrder}
          >Order Now</button>
        </div> : 
        <div></div>
        }
      <div className="allCoffees">
        {
          allCoffees.map((cof, index) => (
            <div 
              key={index} 
              className='drinklist'>
                {
                  index % 2 === 0 ? (
                    <div 
                      className="drinkL"
                      onMouseEnter={() => isDesktop && setHoverL(true)}
                      onMouseLeave={() => isDesktop && setHoverL(false)}
                      style={{
                        backgroundColor: isDesktop && hoverL ? cof.color : 'transparent',
                        transition: "all 1s ease"
                      }}
                    >
                      <img src={cof.img} className="cof tiltedL"/>
                      <div>
                        <h4 className="paraL">{cof.name}</h4>
                        <p>{isLaptop ? cof.desc : ''}</p>
                        <div className="btnL">
                          <button 
                            onClick={() => handleLearnMore(index)} 
                            className={`btnOrder btnOrderL ${isDesktop && hoverL ? "hovered" : ""} ${isLaptop ? "laptop" : ""}`}
                            >{isLaptop ? cof.btn : 'Learn More >'}</button>
                          <button 
                            className={`btnOrder  btnOrderN ${isDesktop && hoverL ? "hovered" : ""} ${isLaptop ? "laptop" : ""}`} 
                            onClick={handleOrder}
                          >{isLaptop ? 'Order Now' : ''}</button>
                        </div>
                      </div>
                    </div>
                  ):(
                    <div 
                      className="drinkR" 
                      onMouseEnter={() => isDesktop && setHoverR(true)}
                      onMouseLeave={() => isDesktop && setHoverR(false)}
                      style={{
                        backgroundColor: isDesktop && hoverR ? cof.color : 'transparent',
                        transition: "all 1s ease"
                      }}
                    >
                      <div>
                        <h4 className="paraR">{cof.name}</h4>
                        <p className="descR">{isLaptop ? cof.desc : ''}</p>
                        <div className="btnR">
                          <button 
                            onClick={() => handleLearnMore(index)} 
                            className={`btnOrder btnOrderL ${isDesktop && hoverR ? "hovered" : ""} ${isLaptop ? "laptop" : ""}`}
                          >{isLaptop ? cof.btn : 'Learn More >'}</button>
                          <button
                            onClick={handleOrder}
                            className={`btnOrder  btnOrderN ${isDesktop && hoverR ? "hovered" : ""} ${isLaptop ? "laptop" : ""}`} 
                          >{isLaptop ? 'Order Now' : ''}</button>
                        </div>
                      </div>
                      <img src={cof.img} className="coff tiltedR"/>
                    </div>
                  )
                } 
            </div>
          ))
        }
      </div>
      {isLearnMore && activeId !== null && (
        <>
          <div 
            className="overlay"
            onClick={() => setIsLearnMore(false)}
          ></div>
          <LearnMore 
            id={activeId} 
            onClose={() => setIsLearnMore(false)} 
          />
        </>
      )}

    </div>
  )
}

export default Drinks