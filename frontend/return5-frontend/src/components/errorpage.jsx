import { useNavigate } from "react-router-dom"

export default function ErrorPage () {
    const navigate = useNavigate();
    return(
        <>
        <title>(404)Page not Found</title>
        <h1>Error Page</h1>
        <button onClick={()=>{navigate('/home')}}>Return</button>
        
        </>
    )
}   