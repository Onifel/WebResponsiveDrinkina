import { useEffect, useState } from 'react'
import { AnimatePresence, motion, } from "framer-motion";
import arrowR from '../assets/icons/top.png'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../restApi/authApi';
import { resetAuth, updateUserSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const ManageAcc = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true)
    const { user } = useSelector((state) => state.auth)
    const [firstNameInp, setFirstNameInp] = useState('')
    const [lastNameInp, setLastNameInp] = useState('')
    const [country, setCountry] = useState('')
    const [phoneInp, setPhoneInp] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            const names = user.name ? user.name.trim().split(" ") : ["", ""]
            setFirstNameInp(names[0] || "")
            setLastNameInp(names[names.length - 1] || "")
            setCountry(user.phone?.slice(0,2) || "+1")
            setPhoneInp(user.phone?.slice(2) || "")
            setEmail(user.email || "")
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
            name: `${firstNameInp} ${lastNameInp}`,
            phone: country + phoneInp,
            email: email
            };

            const res = await updateUser(user.id, updatedUser)
            console.log('✅ User updated:', res.data);
            dispatch(updateUserSuccess(res.data.user))
        } catch (err) {
            console.error('❌ Update failed:', err);
            alert("Something went wrong while saving changes.");
        }
    }

    const handleSignout = () => {
        dispatch(resetAuth())
        navigate('/')
    }

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="slideAcc pageBg"
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
                <form className='formAcc'>
                    <div className='d-flex gap-2'>
                        <div className='nameInfo'>
                            <h6>First Name</h6>
                            <input 
                                type="text" 
                                name="firstname" 
                                id="firstname"  
                                value={firstNameInp}
                                onChange={(e) => setFirstNameInp(e.target.value)}
                            />
                        </div>
                        <div className='nameInfo'>
                            <h6 htmlFor="firstname">Last Name</h6>
                            <input 
                                type="text" 
                                name="lastname" 
                                id="lastname"  
                                value={lastNameInp}
                                onChange={(e) => setLastNameInp(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className=' phoneNumb'>
                        <div className='countryAcc'>
                            <h6 htmlFor="country">Country</h6>
                            <select 
                                name="country" 
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="+1">+1</option>
                                <option value="+33">+33</option>
                            </select>
                        </div>
                        <div className='phoneAcc'>
                            <h6 htmlFor="phone">Phone Number</h6>
                            <input 
                                type="text" 
                                name="phone" 
                                id="phone"  
                                value={phoneInp}
                                onChange={(e) => setPhoneInp(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='emailAcc'>
                        <h6 htmlFor="email">Email</h6>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"  
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='saveBtn' onClick={handleSave}>Save</button>
                    </div>
                </form>
                <div className='manageAcc'>
                    <h6>Manage Account</h6>
                    <p className='descAcc descAccDM'>Request an archive of your personal data or delete your account</p>
                    <button className='btnChangePwd'>Manage Account <img src={arrowR} className='imgArrow'/></button>
                </div>
                <div className='Acc'>
                    <button className='switchAcc'>Switch Account</button>
                    <button className='btnLogout' onClick={handleSignout}>Sign Out</button>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default ManageAcc