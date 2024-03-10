"use client"
import React, { useEffect, useState } from 'react';
import SignUpImg from '@/assets/sign-up.svg';
import Image from 'next/image';
import eyewhite from '@/assets/eye-white.png';
import { signUp } from '@/services/userServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';



const SignUp = () => {
    
    const [viewpass, setViewPass] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: ""
    });
    
    // default profileURL :  "https://i.pinimg.com/originals/c2/3c/2b/c23c2b8966cfaa4a0832c3833fe74cb7.jpg"
    
    const handleViewPassword = ()=>{
        setViewPass(!viewpass);
    }

    const resetForm = ()=>{
        setUser({
            name:"",
            email: "",
            password: "",
            about: ""
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(user);
        try {
            const res = await signUp(user);
            toast.success("User registered successfully 😀",{
                position:'top-center'
            });
            setUser({
                name: "",
                email: "",
                password: "",
                about: "",
                profileURL: ""
            })
            setTimeout(()=>{
                router.push('/login');
            },2000);
            return res;
        } catch (error) {
            console.log("Error in user registration !", error);
            toast.error("User Registration Failed 🙁",{
                position: 'top-center'
            });
        }
    }
  return (
    <div className='grid grid-cols-12 justify-center mt-8 md:mt-0'>
            <div className='lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-3 p-5 shadow-sm col-span-12 col-start-0'>
                <Image src={SignUpImg} className='lg:w-1/4 w-2/4 py-8 md:py-4 m-auto' alt='login-img' priority={true}/>
                <h1 className='text-3xl text-center'>Sign Up</h1>

                <form action='#!' onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label htmlFor="user_name" className='block text-sm font-medium mb-2'>Username</label>
                        <input type='text' id='user_name' placeholder='Enter the username ' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='user_name' autoComplete='off' onChange={(event)=>{
                            setUser({
                                ...user,
                                name: event.target.value
                            });
                        }} value={user.name}/>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="user_email" className='block text-sm font-medium mb-2'>Email</label>
                        <input type='email' id='user_email' placeholder='Enter the email' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='user_email' autoComplete='off' onChange={(event)=>{
                            setUser({
                                ...user,
                                email: event.target.value
                            });
                        }} value={user.email}/>
                    </div>
                    <div className='mt-4 relative'>
                        <label htmlFor="user_password" className='block text-sm font-medium mb-2'>Password</label>
                        <Image src={eyewhite} style={{width: "35px"}} alt='pass' className={`absolute top-7 right-4 bottom-0 m-auto cursor-pointer p-1 rounded-full  + ${(viewpass) ? 'bg-green-400':'bg-slate-900'}`} onClick={handleViewPassword} />
                        <input type={`${(viewpass) ? 'text' : 'password'}`} placeholder='Enter the password' id='user_password' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='user_password' autoComplete='off' onChange={(event)=>{
                            setUser({
                                ...user,
                                password: event.target.value
                            });
                        }} value={user.password}/>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="user_about" className='block text-sm font-medium mb-2'>About</label>
                        <textarea id='user_about' placeholder='Write from here...' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' rows={5}  name='user_about' autoComplete='off' onChange={(event)=>{
                            setUser({
                                ...user,
                                about: event.target.value
                            });
                        }} value={user.about}/>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="user_profileURL" className='block text-sm font-medium mb-2'>Profile URL</label>
                        <input type='text' id='user_profileURL' placeholder='Enter your profile url...' className=' border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='user_profileURL' autoComplete='off' onChange={(event)=>{
                            setUser({
                                ...user,
                                profileURL: event.target.value
                            });
                        }} value={user.profileURL}/>
                    </div>      

                    <div className='mt-8 flex justify-center'>
                        <button type='submit' className='bg-blue-600 mx-2 px-4 py-2 rounded-lg hover:bg-blue-800' >Sign Up</button>
                        <button type="reset" className='bg-red-600 mx-2 px-4 py-2 rounded-lg hover:bg-red-800' onClick={resetForm}>Reset</button>
                    </div>           
                </form>
            </div>
        </div>
  )
}

export default SignUp
