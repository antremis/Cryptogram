import {useRef} from 'react'
import './Login.css'
import LOGO from '../assets/logo_nobg.png'
import GOOGLE from '../assets/google.png'
import FACEBOOK from '../assets/facebook.png'
import {useAuthContext} from '../Context/AuthContext'

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
            <div className='auth-wrapper' data-flip = 'false' ref={main}>
                
                <div className = "login">
                    <img src={LOGO} alt="Logo"/>
                    <form onSubmit={handleLogin}>
                        <input type='text' placeholder='Username' name = 'username'></input>
                        <input type='text' placeholder='Password' name = 'password'></input>
                        <button title='login' type='submit'>Login</button>
                    </form>
                    <div>
                        <span>OR</span>
                        <div>
                            <img src={GOOGLE} alt="google" onClick = {() => {login('GOOGLE')}} />
                            <img src={FACEBOOK} alt="facebook" onClick = {() => {login('FACEBOOK')}} />
                        </div>
                        <p onClick={()=>{main.current.dataset.flip = true}}>Cryptogram Inc</p>
                    </div>
                </div>
            
                <div className = "signup">
                    <img src={LOGO} alt="Logo"/>
                    <form onSubmit={handleSignup}>
                        <input type='text' placeholder='Username' name = 'username'></input>
                        <input type='text' placeholder='Password' name = 'password'></input>
                        <button title='login' type='submit'>Signup</button>
                    </form>
                    <div>
                        <span>OR</span>
                        <div>
                            <img src={GOOGLE} alt="google" onClick = {() => {login('GOOGLE')}} />
                            <img src={FACEBOOK} alt="facebook" onClick = {() => {login('FACEBOOK')}} />
                        </div>
                        <p onClick={()=>{main.current.dataset.flip = false}}>Cryptogram Inc</p>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default Login