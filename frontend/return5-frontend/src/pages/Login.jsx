import { useContext, useState } from "react"
import  BASE_URL from '../api/axios'
import { loginStatusContext, userContext } from "../App";
import { loadingContext } from "../App";
import { useNavigate } from "react-router-dom";




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
            <div className="login-page">
                <h1 >return5;</h1>
                <form onSubmit={loginForm} className="login-box">
                    <input type="text" className="login-username" placeholder="input username here"
                    value={username} onChange={(e) => {setUsername(e.target.value)}} required />
                    <input type="password" className="login-password" placeholder="input password here"
                    value={password} onChange={(e) => {setPassword(e.target.value)}} required />
                    <button className="submitLogin"disabled={isLoading}>{isLoading? 'please wait' : 'Login'}</button>
                </form>
                <h3 className="toggleText" onClick={togglePage}>don’t have account yet?, click here</h3>
            </div>
            </>
        );}
    else{
        return(
            <>
            <div className="register-page">
                <h1 >return5;</h1>
                <form onSubmit={registerForm} className="register-box">
                    <input type="text" className="register-username" placeholder="input username here"
                    value={username} onChange={(e) => {setUsername(e.target.value)}} required disabled={isLoading}/>
                    <input type="password" className="register-password" placeholder="input password here"
                    value={password} onChange={(e) => {setPassword(e.target.value)}} required disabled={isLoading}/>
                    <button className="submitRegister"disabled={isLoading}>{isLoading? 'please wait' : 'Register'}</button>
                </form>
                <h3 className="toggleText" onClick={togglePage}>already have an account?, click here</h3>
            </div>
            </>
        );}
}