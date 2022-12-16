import {useRef} from 'react'
import './Login.css'
import LOGO from '../assets/logo_nobg.png'
import GOOGLE from '../assets/google.png'
import FACEBOOK from '../assets/facebook.png'
import {useAuthContext} from '../Context/AuthContext'
import InputButton from '../Components/InputButton'

const Login = () => {
    const main = useRef(null)
    const {login, signup} = useAuthContext()

    const handleLogin = (e) => {
        e.preventDefault();
        login('NORMAL', e.target.username.value, e.target.password.value)
    }
    
    const handleSignup = (e) => {
        e.preventDefault();
        signup(e.target.username.value, e.target.password.value)
    }

    return(
        <main className="auth">
            <div className='auth-wrapper' data-flip = {false} ref={main}>
                
                <div className = "login">
                    <img src={LOGO} alt="Logo"/>
                    <form onSubmit={handleLogin}>
                        <InputButton placeholder='Username' name='username' />
                        <InputButton placeholder='Password' name='password' />
                        <div className='btn-wrapper'>
                            <button type='submit'>Login</button>
                            <p onClick={()=>{main.current.dataset.flip = true}}>Don't have an account? <span className='auth-toggler'>Signup now!</span></p>
                        </div>
                    </form>
                    <div>
                        <span>OR</span>
                        <div>
                            <img src={GOOGLE} alt="google" onClick = {() => {login('GOOGLE')}} />
                            <img src={FACEBOOK} alt="facebook" onClick = {() => {login('FACEBOOK')}} />
                        </div>
                        <p>Cryptogram Inc</p>
                    </div>
                </div>
            
                <div className = "signup">
                    <img src={LOGO} alt="Logo"/>
                    <form onSubmit={handleSignup}>
                        <InputButton placeholder='Full Name' name='fulname' />
                        <InputButton placeholder='Username' name='username' />
                        <InputButton placeholder='Password' name='password' />
                        <InputButton placeholder='Retype Password' name='' />
                        <div className='btn-wrapper'>
                            <button type='submit'>Signup</button>
                            <p onClick={()=>{main.current.dataset.flip = false}}>Already have an account? <span className='auth-toggler'>Login!</span></p>
                        </div>
                    </form>
                    <div>
                        <span>OR</span>
                        <div>
                            <img src={GOOGLE} alt="google" onClick = {() => {login('GOOGLE')}} />
                            <img src={FACEBOOK} alt="facebook" onClick = {() => {login('FACEBOOK')}} />
                        </div>
                        <p>Cryptogram Inc</p>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Login