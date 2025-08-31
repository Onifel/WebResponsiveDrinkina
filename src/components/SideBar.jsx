import { useLocation, useNavigate } from 'react-router-dom'
import { sideBarList } from '../jsFile/List';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth } from '../redux/authSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const SideBar = ({onClose}) => {
  const [isVisible, setIsVisible] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const fullName = user?.name ? user.name.trim().split(" ") : []
  

  const handleClick = (id) => {
    if (id === 2) {
      if (user?.name) {
        navigate('/me')
      }else{
        navigate('/signin')
      }
    }else{
      navigate(`/page/${id}`);
    }
  }

  const handleSignout = () => {
    dispatch(resetAuth())
    navigate('/')
  }
  const slideVariants = {
  hidden: {x: "-100vh", opacity: 0},
  visible: {x: 0, opacity: 1},
  exit: {x: "-100vh", opacity: 0}
  }

  return (
    <AnimatePresence>
      {
        isVisible && (
          <motion.div 
            className='sideBar sideBarDM'
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3}}
          >
            <div className="headSide headSideDM">
              {user?.name ? <h3 className='titleSide'>Hi, {fullName[0]}</h3> : <h3 className='titleSideEmpty'></h3>}
              <button 
                className='close'
                onClick={() => {
                  onClose()
                  setIsVisible(false)
                }}
              >
                <p>&times;</p>
              </button>
            </div>
            
            {
              sideBarList.map((menu, index) => {
                const isActive =
                  location.pathname === `/page/${index}` ||
                  (index === 0 && location.pathname === '/') ||
                  (index === 1 && location.pathname === '/order') ||
                  (index === 2 && location.pathname === '/me')

                return ( 
                  <div 
                    key={index} 
                    onClick={() => handleClick(index)}
                    className={`link linkDM ${isActive ? 'linkPink' : ''}`}
                  >
                    <p className='showMenu'>{menu.name}</p>
                  </div>
                );
              })
            }
            {user?.name ? (
              <p
                className="paraSignout"
                onClick={handleSignout}
              >
                Sign out
              </p>
              ) : (
                <p></p>
              )
            }
          </motion.div>
        )}
    </AnimatePresence>
  )
}

export default SideBar