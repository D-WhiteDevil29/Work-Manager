"use client";
import { User } from '@/models/user';
import { getUserByEmail } from '@/services/userServices';
import React, {useState} from 'react'
import { toast } from 'react-toastify';

const ForgotEmail = () => {

    const [resetEmail, setResetEmail] = useState('');

    const handleResetEmailChange =(e)=>{
        setResetEmail(e.target.value);
    };

    const handleEmailSubmit = async ()=>{
        if(resetEmail.trim() === "") {
            toast.info("Invalid data !!!");
            return;
        }
        // try {
        //     const isExist = await getUserByEmail(resetEmail);
        //     console.log(isExist);
        //     // if(isExist){

        //     // }
        // } catch (error) {
        //     console.log(error);
            
        // }
    }

  return (
    <div className='mt-20 md:mt-16 py-2 flex justify-center items-center flex-col'>
        <h1 className='text-2xl font-medium m-auto'>Reset your password</h1>
        <div className='grid grid-cols-12 w-full'>
            <div className='mt-6 col-span-10 md:col-span-6 col-start-2 md:col-start-4'>
                <label htmlFor="reset_email" className='block text-sm font-medium mb-2'>Email</label>
                <input type='email' id='reset_email' placeholder='Enter your email' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='reset_email' value={(resetEmail !== '') ? resetEmail : ''} onChange={handleResetEmailChange}/>
            </div>
        </div>
        <button className='mt-6 bg-blue-800 text-slate-50 px-3 py-2 rounded-xl hover:bg-blue-900' type='submit'>Submit</button>
        <div className='mt-12 flex flex-col gap-6 text-center'>
            <h1 className='text-2xl font-medium'>Authentication...</h1>
            <input className='border-none w-full py-3 px-5 rounded-xl text-center bg-gray-900' type='number' placeholder='Enter otp here' maxLength={6}/>
            <button className='mt-2 bg-green-600 text-slate-50 px-3 py-2 rounded-xl hover:bg-green-800'>Submit</button>
        </div>
    </div>
  )
}

export default ForgotEmail;
