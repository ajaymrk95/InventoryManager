import React from 'react'

import { useState,useEffect,useRef,useId} from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';
import axios from "axios";


const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\S]{8,20}$/;


const Register = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [user,setUser] = useState("");
  const [validName,setValidName] = useState(false);
  const [userFocus,setUserFocus] = useState(false);

  const [pwd,setPwd] = useState("");
  const [validPwd,setValidPwd] = useState(false);
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

useEffect(() => {
  const result = passwordRegex.test(pwd);
  console.log("Password valid?", result);
  setValidPwd(result);
}, [pwd]);

useEffect(()=>
{
    setErrMsg('');
},[user,pwd,])



const handleSubmit = async (e)=>
{
     e.preventDefault();

     const v1 = usernameRegex.test(user);
     const v2 = passwordRegex.test(pwd);

     if(!v1||!v2)
     {
         setErrMsg("Invalid Username or Password");

         return;
     }
     
     try {

        const response = await axios.post("http://localhost:5000/register",{
            username:user,
            password:pwd
        })

        if(response.data?.success)
        {
             console.log("Signup Successful");
             setSuccess(true);
             setUser("");
             setPwd("");
        }
        
     } 
     
     catch (error) 
     {
        if(!error?.response)
        { 
            setErrMsg('No Server Response')

        }

        else if( error.response?.status ===409)
        {
            setErrMsg("Username Taken!")
        }
        else 
        {
            setErrMsg("Registration Failed")
        }

        errRef.current.focus();
     }
}


return (
    <>

    <section className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-4 py-8">
        
        <p ref={errRef} className = {errMsg ? "text-red-500 mb-4 text-xl":"sr-only"} aria-live="assertive">{errMsg}</p>
        
        <h1 className='text-center text-2xl font-sans font-bold mb-4'>Welcome to InventoryManager</h1>
        <form className="bg-blue-50 text-black p-6 rounded-md shadow-md w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            
                 
            <h1 className='font-sans text-2xl font-bold mb-4'>Register a New User</h1>
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
            value={user}
            autoComplete='off'
            onChange={(e)=> setUser(e.target.value)}
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

                <span className={validPwd ? "text-green-500 inline ml-2" : "hidden"}>
                 <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validPwd || !pwd ?  "hidden" : "text-red-600 inline ml-2"}>
                 <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            
            <input  
            type="password"
            id="password"
            onChange={(e)=> setPwd(e.target.value)}
            required
            value={pwd}
            aria-invalid={validPwd ? "false":"true"}
            aria-describedby="uidnote2"
            onFocus={()=>setPwdFocus(true)}
            onBlur={()=>setPwdFocus(false)}
            className='font-sans border-gray-300 border-2 rounded shadow-lg mb-4'/>

            <p id="uidnote2" className={pwdFocus && pwd && !validPwd ? "text-sm mt-2 font-sans text-white bg-black p-2 shadow-lg rounded": "sr-only"}> 

                <FontAwesomeIcon icon={faInfoCircle}/>
                Note: Password must contain atleast 8 characters (Max:20 characters)<br/>
                Must Include atleast 1 lowercase,uppercase,number and special character.

            </p>

            <button className = "bg-green-600 font-sans rounded p-2 shadow-lg mb-4 text-white"type='submit' disabled={!validName || !validPwd ? true:false}>Sign up</button> 

            </div>

            {success ? (
                <div>
                <h1 className='font-medium mb-1'>Sign Up Successful</h1>
                <Link to="/login">Go to Login Page</Link>
                </div>) : (<div></div>)
        
            }
        </form>
    </section>
    </>
  )
}

export default Register