import { useState } from 'react'
import { AnimatePresence, motion, } from "framer-motion"
import { settings } from '../jsFile/List'
import rightA from '../assets/icons/right-arrow.png'
import ManageAcc from './ManageAcc'
import Payment from './Payment'
import BusiProf from './BusiProf'
import AddressSett from './AddressSett'
import Privacy from './Privacy'
import Notifications from './Notifications'
import DarkMode from './DarkMode'

const Settings = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const [showSlide, setShowSlide] = useState(false)
    const [indexStore, setIndexStore] = useState(null)
    
    const handleClick = (id) => {
        setShowSlide(true)
        setIndexStore(id)
    }

    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="slideMeS pageBg"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
            >
                <button
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(() => {
                            onClose()
                          }, 200)
                    }}
                    className="closeArrow modeDark"
                >
                    &larr;
                </button>
                <h1 className='pmtTitle'>Settings</h1>
                <div className="container">
                    {
                        settings.map((sett, index) => (
                            <div 
                            key={index}
                            className="asideSett"
                            onClick={() => handleClick(index)}
                            >
                                <div className='nameDetails'>
                                    <p className="settName">{sett.name}</p>
                                    <p className='paraSett paraDarkMode'>{sett.para}</p>
                                </div>
                                <div className='modeD'>
                                    <img src={rightA} className="arrowLoc" />
                                </div>
                            </div>
                        ))
                    }   
                </div>

                {showSlide &&
                    (indexStore === 0 && (
                        <>
                            <ManageAcc onClose={() => setShowSlide(false)}/>
                        </>    
                    )) ||
                    (indexStore === 1 && (
                        <>
                            <Payment onClose={() => setShowSlide(false)}/>
                        </>    
                    )) ||
                    (indexStore === 2 && (
                        <>
                            <BusiProf onClose={() => setShowSlide(false)}/>
                        </>    
                    )) ||
                    (indexStore === 3 && (
                        <>
                            <AddressSett onClose={() => setShowSlide(false)}/>
                        </>    
                    )) ||
                    (indexStore === 4 && (
                        <>
                            <Privacy onClose={() => setShowSlide(false)}/>
                        </>    
                    )) ||
                    (indexStore === 5 && (
                        <>
                            <Notifications onClose={() => setShowSlide(false)}/>
                        </>    
                    )) ||
                    (indexStore === 6 && (
                        <>
                            <DarkMode onClose={() => setShowSlide(false)}/>
                        </>    
                    ))
                }
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Settings