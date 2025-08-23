    import React from 'react'

    import { useState,useEffect,useRef,useId,useContext } from 'react'
    import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"; 
    import axios from 'axios';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { Link } from 'react-router-dom';
    import {AuthContext} from '../Context/AuthProvider';
    import { useNavigate } from 'react-router-dom';

    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;

    const Login = () => {

    const navigate = useNavigate();
 
    const {setAuth} = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState("");
    const [validName,setValidName] = useState(false);
    const [userFocus,setUserFocus] = useState(false);

    const [pwd,setPwd] = useState("");

    const [pwdFocus,setPwdFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false); 

    useEffect(()=>
    {
    userRef.current.focus();
    },[])

    useEffect(()=>{

        const result = usernameRegex.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user])

    useEffect(()=>
    {
        setErrMsg('');
    },[user,pwd])



    const handleSubmit = async (e)=>
    {
        e.preventDefault();

        if(!user||!pwd)
        {
            setErrMsg("Invalid Username or Password");

            return;
        }
        
        try {
            
            const response  = await axios.post("http://localhost:5000/login",{username:user,password:pwd},{headers: { 'Content-Type': 'application/json' }})
            
            if(response.data?.success)
            {
                
                setSuccess(true);
                const actoken = response.data.accessToken;
                const resrole = response.data.role;
                setAuth({token:actoken,role:resrole});
                localStorage.setItem("auth", JSON.stringify({token:actoken,role:resrole}));
                setUser("");
                setPwd("");

                if(resrole=="admin")
                {
                    navigate("/admin-dashboard")
                }

                else if(resrole=="user")
                {
                   navigate("/user-dashboard")
                }


            }
        } 
        
        catch (error) 
        {
            if(!error?.response )
            {
                setErrMsg("No Server Response")
            }

            if(error.response?.status == 401 )
            {
                setErrMsg("Unauthorized. Invalid Credentials")
            }
            else 
            {
                setErrMsg("Login Failed")
            }

            errRef.current.focus();
        }
        
    }


    return (
        
        <section className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-4 py-8">
            
            <p ref={errRef} className = {errMsg ? "text-red-500 mb-4 text-sm":"sr-only"} aria-live="assertive">{errMsg}</p>
            
            <h1 className='text-center text-2xl font-sans font-bold mb-4'>Welcome to InventoryManager</h1>
            <form className="bg-blue-50 text-black p-6 rounded-md shadow-md w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                
                    
                <h1 className='font-sans text-2xl font-bold mb-4'>Login</h1>
                <div className='flex flex-col '>
                <label htmlFor='username' className='mb-1 font-medium'>Username:

                    <span className={validName ? "text-green-500 inline ml-2" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck}/>
                    </span>

                    <span className={validName || !user ?  "hidden" : "text-red-600 inline ml-2"}>
                    <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                
                <input  
                type="text"
                id="username"
                ref={userRef}
                autoComplete='off'
                onChange={(e)=> setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false":"true"}
                aria-describedby="uidnote"
                onFocus={()=>setUserFocus(true)}
                onBlur={()=>setUserFocus(false)}
                className='font-sans border-gray-300 border-2 rounded shadow-lg mb-4'/>

                <p id="uidnote" className={userFocus && user && !validName ? "text-sm mt-2 text-white bg-black font-sans p-2 shadow-lg rounded": "sr-only"}> 

                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Note: Username must contain atleast 4 characters (Max:20 characters)<br/>
                    Letters,numbers,underscores allowed.

                </p>

                <label htmlFor='password' className='mb-1 font-medium'>Password:

                </label>
                
                <input  
                type="password"
                id="password"
                onChange={(e)=> setPwd(e.target.value)}
                value={pwd}
                required
                onFocus={()=>setPwdFocus(true)}

                onBlur={()=>setPwdFocus(false)}
                className='font-sans border-gray-300 border-2 rounded shadow-lg mb-4'/>

            

                <button className = "bg-green-600 font-sans rounded p-2 shadow-lg mb-4 text-white"type='submit' disabled={!validName || !pwd ? true:false}>Log In</button> 

                </div>

                  <div>
                <h1 className='mb-1 font-medium'>New User? </h1>
                <Link className="'mb-1 font-medium" to="/register">Click here to Register Now!</Link>
            </div>
            </form>  

         
        </section>
    )
    }

    export default Login