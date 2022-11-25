import {useRef} from 'react'
import './Login.css'
import LOGO from '../assets/logo_nobg.png'
import GOOGLE from '../assets/google.png'
import FACEBOOK from '../assets/facebook.png'

const Login = () => {
    const main = useRef(null)

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.target.username.value, e.target.password.value)
        main.current.dataset.flip = true
    }
    
    const handleSignup = (e) => {
        e.preventDefault();
        console.log(e.target.username.value, e.target.password.value)
        main.current.dataset.flip = false
    }

    return(
        <main data-flip = 'false' ref={main}>
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
                        <img src={GOOGLE} alt="google" />
                        <img src={FACEBOOK} alt="google" />
                    </div>
                    <p>Cryptogram Inc</p>
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
                        <img src={GOOGLE} alt="google" />
                        <img src={FACEBOOK} alt="google" />
                    </div>
                    <p>Cryptogram Inc</p>
                </div>
            </div>
            
        </main>
    )
}

export default Login