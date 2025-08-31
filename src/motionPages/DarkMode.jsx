import { useState } from 'react'
import { AnimatePresence, motion, } from "framer-motion"
import { useTheme } from '../components/ThemeContext'

const DarkMode = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const [modeOn, setModeOn] = useState(false)
    const {setTheme} = useTheme()

    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }

    const handleClick = (option) => {
        if (option === 0) {
          setTheme("dark")
        } else if (option === 1) {
          setTheme("light")
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          setTheme(prefersDark ? "dark" : "light")
        }
    }
      

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="slideAdSett pageBg"
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
                          }, 400)
                    }}
                    className="closeArrow modeDark"
                >
                    &larr;
                </button>
                <h1 className='pmtTitle'>Dark Mode</h1>
                <div className="container">
                    <div
                        className="asideMode"
                    >
                        <div className="form-radio mt-3 pt-4">
                            <input
                                className="form-check-input"
                                type="radio"
                                name='mode'
                                id={`${modeOn ? 'modeLight' : 'modeDark'}`}
                                onClick={() => handleClick(0)}
                            />
                            <label className="form-check-label namePush" htmlFor="notifSwitch">
                                On
                            </label>
                        </div>
                    </div>
                    <div
                        className="asideMode"
                    >
                        <div className="form-radio mt-3 pt-4">
                            <input
                                className="form-check-input"
                                type="radio"
                                name='mode'
                                id={`${modeOn ? 'modeLight' : 'modeDark'}`}
                                onClick={() => handleClick(1)}
                            />
                            <label className="form-check-label namePush" htmlFor="notifSwitch">
                                Off
                            </label>
                        </div>
                    </div>
                    <div
                        className="asideMode"
                    >
                        <div className="form-radio mt-3 pt-4">
                            <input
                                className="form-check-input"
                                type="radio"
                                name='mode'
                                id={`${modeOn ? 'modeLight' : 'modeDark'}`}
                                onClick={() => handleClick(2)}
                            />
                            <label className="form-check-label namePush" htmlFor="notifSwitch">
                                System Settings
                            </label>
                        </div>
                    </div> 
                    <p className='paraMode descAccDM'>If system settings is selected, the appearance will automatically adjust based on your device's system settings.</p>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default DarkMode