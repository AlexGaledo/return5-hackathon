import { useContext, useState } from "react"
import  BASE_URL from '../api/axios'
import { loginStatusContext, userContext } from "../App";
import { loadingContext } from "../App";
import { useNavigate } from "react-router-dom";
import loginPhoto from '../assets/login-photo.png'




export default function LoginPage() {
    const navigate = useNavigate();
    const { setLoginStatus, loginStatus } = useContext(loginStatusContext)
    const [formRegistate, setFormRegistate] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, setIsLoading } = useContext(loadingContext);
    const { setUser } = useContext(userContext);


    const loginForm = async (e) =>{
        
        e.preventDefault();
        if (isLoading) {
            alert('processing...')
            return;
        }
        setIsLoading(true);    

        try {
            const res = await BASE_URL.post('/login/',{
                'username':username,
                'password':password
            });

            localStorage.setItem('current_id', res.data.id);
            localStorage.setItem('token',res.data.access_token);
            setUser(res.data);
            setLoginStatus(!loginStatus);
            alert('loggedin');// change later to better ui
            navigate('/home');

        } catch(err) {
            const error = err.response?.data?.response;
            alert(`${error}`);   

        } finally {
            setIsLoading(false);
            setUsername('')
            setPassword('')
        }
        
    
    }

    const registerForm = async (e) =>{
        
        e.preventDefault();
        if (isLoading) {
            alert('processing...')
            return;
        }
        setIsLoading(true);

        

        try {
            const res  = await BASE_URL.post('/register/',{
                'username':username,
                'password':password
            });
            alert(`${res.data?.response}`)
        } catch (err) {
            const error = err.response?.data?.response;
            alert(`${error}`);
        } finally {
            setIsLoading(false);
            setUsername('')
            setPassword('')
        }
        
    }

    const togglePage = () =>{
        setUsername('')
        setPassword('')
        setFormRegistate(!formRegistate);
    }

    if (!formRegistate){
        return(
            <>
            <div className="form-container">
            <div className="left">
                <div className="login-form">
                    <h1 className="left-text">Login to your Account</h1>
                   <form onSubmit={loginForm} className="login-box">
                        <input type="text" className="login-username" placeholder="🤵Username"
                        value={username} onChange={(e) => {setUsername(e.target.value)}} required />
                        <input type="password" className="login-password" placeholder="🛡️Password"
                        value={password} onChange={(e) => {setPassword(e.target.value)}} required />
                        <button className="submitLogin"disabled={isLoading}>{isLoading? 'please wait' : 'Login'}</button>
                        <div className="form-footer">
                            <label className="remember-container">
                                <input
                                type="checkbox"
                                className="remember-me"
                                disabled={isLoading}
                                />
                                Remember me
                            </label>
                            <span className="forgot-password">Forgot Password?</span>
                        </div>
                    </form> 
                    <h3 className="toggleText" onClick={togglePage}>
                    <span style={{ color: 'grey' }}>don’t have account yet?,</span> <span style={{color:'9db5ff'}}>click here</span>
                    </h3>
                </div>
                <div className="right">
                    <div className="login-image-container">
                    <img src={loginPhoto} alt="login-photo"/>
                </div></div>
            </div>
            </div>
            </>
        );}
    else{
        return(
            <>
            <div className="form-container">
            <div className="left">
                <div className="login-form">
                    <h1 className="left-text">Create your Account</h1>
                    <form onSubmit={registerForm} className="register-box">
                    <input type="text" className="register-username" placeholder="🤵Username"
                    value={username} onChange={(e) => {setUsername(e.target.value)}} required disabled={isLoading}/>
                    <input type="password" className="register-password" placeholder="🛡️Password"
                    value={password} onChange={(e) => {setPassword(e.target.value)}} required disabled={isLoading}/>
                    <button className="submitRegister"disabled={isLoading}>{isLoading? 'please wait' : 'Register'}</button>
                    <div className="form-footer">
                            <label className="remember-container">
                                <input
                                type="checkbox"
                                className="remember-me"
                                disabled={isLoading}
                                />
                                Accept Terms and Conditions
                            </label>
                        </div>
                </form>
                 <h3 className="toggleText" onClick={togglePage}>
                    <span style={{ color: 'grey' }}>don’t have account yet?,</span> <span style={{color:'9db5ff'}}>click here</span>
                    </h3>
                </div>
                 <div className="right">
                    <div className="login-image-container">
                    <img src={loginPhoto} alt="login-photo"/>
                </div>
                </div>
                </div>
            </div>
            </>
        );}
}