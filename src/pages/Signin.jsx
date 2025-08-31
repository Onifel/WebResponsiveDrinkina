import { useEffect, useState } from 'react'
import logo from '../assets/logo/logoDrinkina.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { checkVerifyCode, sendRequestCode, resetStep } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const [name, setName] = useState('')
    const [phoneInp, setPhoneInp] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const navigate = useNavigate()

    const {step, loading, error, phone, user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
    if (user) {
      navigate("/")
      dispatch(resetStep())
    }
  }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step === 1) {
            dispatch(sendRequestCode({name, phone: phoneInp, email}))
        } else if (step === 2) {
            dispatch(checkVerifyCode({phone, code, name, email}))
        }
    }

  return (
    <div className="signin signinDM">
        <div className="signinCont signinContDM">
            <div className="headSignin">
                <h1 className="titleSignin titleSigninDM">Sign In</h1>
                <p className="textConfCode">
                    {step === 1
                        ? "We'll text you a confirmation code to get started"
                        : `Enter the code sent to ${phone}`}
                </p>
            </div>
            <div className="fillSignin">
                <form onSubmit={handleSubmit} className='formSignin'>
                    {step === 1 && (
                        <>
                            <div className='divInpSignin'>
                                <input 
                                    type="text" 
                                    className="inpSignin" 
                                    placeholder='First & Last Name*'
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='divInpSignin'>
                                <input 
                                    type="text" 
                                    className="inpSignin" 
                                    placeholder='Email*'
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='divInpSignin'>
                                <input 
                                    type="text" 
                                    className="inpSignin" 
                                    placeholder='Mobile Phone Number*'
                                    onChange={(e) => setPhoneInp(e.target.value)} 
                                    required
                                />
                            </div>
                            <div className="divBtnSignin">
                                <button type='submit' className='btnHero'>
                                    {loading ? "Sending..." : "Send Confirmation Code"}
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="divInpSignin">
                            <input
                                type="text"
                                className="inpSignin"
                                placeholder="Confirmation Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                            </div>
                            <div className="divBtnSignin">
                            <button type="submit" className="btnHero" disabled={loading}>
                                {loading ? "Verifying..." : "Verify Code"}
                            </button>
                            </div>
                        </>
                    )} 

                    {error && 
                        <p style={{ color: "red" }}>
                            {typeof error === "string" ? error : error.error || "Something went wrong!"}
                        </p>}                  
                </form>
            </div>

            <div className='endSignin'>
                <p className='textEndSignin'>
                    <i>
                        By proceeding you agree to our <u>Terms and Conditions</u> and confirm you have read and understand our <u>Privacy policy</u>
                    </i>
                </p>
                <img src={logo} className='logoSignin' />
            </div>
        </div>
    </div>
  )
}

export default Signin