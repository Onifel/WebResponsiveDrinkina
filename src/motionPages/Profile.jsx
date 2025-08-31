import { useEffect, useState } from 'react'
import { AnimatePresence, motion, } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../restApi/authApi';
import { updateUserSuccess } from '../redux/authSlice';

const Profile = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const { user } = useSelector((state) => state.auth)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            const fullName = user?.name ? user.name.trim().split(" ") : ["", ""]
            setFirstName(fullName[0] || '')
            setLastName(fullName[fullName.length - 1] || '')
        }
    }, [user])

    const slideVariants = {
        hidden: { x: "100vh", opacity: 0 },
        visible: { x: "0", opacity: 1 },
        exit: { x: "100vh", opacity: 0 },
    }

    const handleSave = async (e) => {
            e.preventDefault()
            try {
                const updatedUser = {
                name: `${firstName} ${lastName}`
                };
    
                const res = await updateUser(user.id, updatedUser)
                console.log('✅ User updated:', res.data);
                dispatch(updateUserSuccess(res.data.user))
            } catch (err) {
                console.error('❌ Update failed:', err);
                alert("Something went wrong while saving changes.");
            }
        }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="slideProf pageBg"
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
                <form className='formAcc'>
                    <div className='d-flex gap-2'>
                        <div className='nameInfo'>
                            <h6>First Name</h6>
                            <input 
                                type="text" 
                                name="firstname" 
                                id="firstname"  
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className='nameInfo'>
                            <h6 htmlFor="firstname">Last Name</h6>
                            <input 
                                type="text" 
                                name="lastname" 
                                id="lastname"  
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className='saveBtn' onClick={handleSave}>Save</button>
                </form>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Profile