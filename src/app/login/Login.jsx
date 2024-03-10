"use client"
import React, {useContext, useState} from 'react';
import LoginSvg from '@/assets/login.svg'
import eyewhite from '@/assets/eye-white.png';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { NextResponse } from 'next/server';
import { login } from '@/services/userServices';
import { useRouter } from 'next/navigation';
import { getResponseMessage } from '@/helper/getResponseMessage';
import UserContext from '../context/userContext';

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [view, setView] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const resetLoginForm = ()=>{
    setLoginData({
      email: "",
      password: ""
    });
  }
 
  const viewMyPassword = ()=>{
    setView(!view);
  }

  const headToHome =()=>{
    router.push('/');
  }


  const handleLoginSubmitted = async (e)=>{
    e.preventDefault();
    // console.log(loginData);
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data !!", {
        position: "top-center",
      });
      return;
    }
    

    try {
      const result = await login(loginData);
      // console.log(result);
      toast.success("Logged In successfully 😀!!!",{
        position: 'top-center'
      });
      context.setUser(result.user);
      router.push("/");
    }catch(error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  

  return (
    <div className='grid grid-cols-12 justify-center mt-6 md:mt-0 relative'>
      <button className='absolute font-medium text-md text-slate-50 hover:text-slate-400 -top-1 md:top-8 left-5' onClick={headToHome}><span className='mr-0.5'>⬅️</span>Go to home</button>
            <div className='lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-3 p-5 shadow-sm col-span-12 col-start-0'>
                <Image src={LoginSvg} className='lg:w-1/4 w-2/4 py-8 md:py-12 m-auto' alt='login-img' priority={true}/>
                <h1 className='text-3xl text-center'>Login</h1>

                <form action='#!' onSubmit={handleLoginSubmitted}>
                    <div className='mt-4'>
                        <label htmlFor="login_email" className='block text-sm font-medium mb-2'>Email</label>
                        <input type='email' id='login_email' placeholder='Enter your email' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='login_email' autoComplete='off' onChange={(event)=>{
                            setLoginData({
                                ...loginData,
                                email: event.target.value
                            });
                        }} value={loginData.email}/>
                    </div>
                    <div className='mt-4 relative'>
                        <label htmlFor="login_password" className='block text-sm font-medium mb-2'>Password</label>
                        <Image src={eyewhite} style={{width: "35px"}} alt='pass' className={`absolute top-7 right-4 bottom-0 m-auto cursor-pointer p-1 rounded-full  + ${(view) ? 'bg-green-400':'bg-slate-900'}`} onClick={viewMyPassword} />
                        <input type={`${(view) ? 'text' : 'password'}`} placeholder='Enter the password ' id='login_password' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='login_password'  autoComplete='off' onChange={(event)=>{
                            setLoginData({
                                ...loginData,
                                password: event.target.value
                            });
                        }} value={loginData.password}/>
                        <a href='/forgot-email' className=' text-sm absolute -bottom-6 right-6 font-medium text-blue-700 pl-2'>Forgot your password?</a>
                    </div>
                    <div className='mt-10 flex justify-center'>
                        <button type='submit' className='bg-blue-600 mx-2 px-4 py-2 rounded-lg hover:bg-blue-800' >Login</button>
                        <button type="reset" className='bg-red-600 mx-2 px-4 py-2 rounded-lg hover:bg-red-800' onClick={resetLoginForm}>Reset</button>
                    </div> 
                    <div><p className='text-center mt-16 font-medium text-md text-slate-50'>Don't have account? <a href='/sign-up' className='font-medium text-blue-700 pl-1'>Sign up</a></p></div>                 
                </form>
                
            </div>
        </div>
  )
}

export default Login
