import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [isScrolling, setIsScrolling] = useState(window.scrollY > 0 )
  const navigate = useNavigate()

  useEffect(() => {
    const handleScrollY = () => {
      setIsScrolling(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScrollY)
  }, [])

  const handleOrder = () => {
    navigate('/order');
  }

  return (
    <>
      <div className='hero'>
        <p className='paraHero'>Your daily boost</p>
        <p className='textTitle'>One Sip at a time!</p>
        {
          isScrolling ? 
            <div></div> : 
            <div className="divTopBtn" >
              <button 
                className= 'topBtn' 
                onClick={handleOrder}
              >Order Now</button>
          </div>
        }
      </div>
    </>
  )
}

export default Hero