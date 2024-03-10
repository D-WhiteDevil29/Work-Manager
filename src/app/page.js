"use client";
import Image from 'next/image';
import React, { useContext } from 'react';
import WorkManager from '@/assets/work-manager.svg';
import OfficeImg from '../assets/officeImg.jpg';
import Buildings from '../assets/buildings.jpg';
import BuildingsMobile from '../assets/building-mobile.jpg';
import { useRouter } from 'next/navigation';
import UserContext from './context/userContext';
import Prioritize from '@/assets/prioritize.png';

// export const metadata = {
//   title: "Home: Work Manager"
// }


export default function Home() {
  const router = useRouter();
  const context = useContext(UserContext);

  const handleJoin = () => {
    if (context?.user) {
      router.push('/add-task');
      return;
    }
    router.push("/login");
  }

  return (
    <main className="flex flex-col items-center m-auto">
      <div className="w-full items-center text-sm lg:flex">
        <div className='flex gap-6 m-auto md:flex-row flex-col relative h-auto w-screen justify-center'>
          {
            <Image src={BuildingsMobile} style={
              {
                width: "100%", backgroundSize: 'cover', objectFit: 'cover'
              }
            } alt='' />
          }
          <div className='text-center absolute top-32'>
            <h1 className='text-5xl font-semibold text-slate-50'>Welcome to Work Manager</h1>
            <div className='mt-8 flex w-3/4 m-auto flex-col'>
              {/* <p className='font-medium text-lg text-slate-200'>Work Manager which helps to manage all your tasks in one place.</p> */}
              <p className='mt-5 font-medium text-lg text-slate-100'>"Unlock productivity. Sign up now, start managing tasks effortlessly. Organize priorities, achieve goals with clarity. Join us today for success."</p>
            </div>

            <button className='mt-8 border-2 text-xl border-slate-50 text-white hover:border hover:border-slate-900 hover:text-slate-950 px-4 py-2 rounded-lg bg-transparent backdrop-blur-sm' onClick={handleJoin}>Join us</button>
            {/* <div className='flex flex-col gap-6 top-96 justify-center items-center w-full mt-2'>
              <div className='text-center'><h1 className='text-2xl font-medium p-2 rounded-lg  backdrop-blur-sm'>Features of Task Manager</h1></div>
              <div className='flex flex-wrap  p-3 bg-slate-800'>
                <div className=''>
                  <div className='text-center block'><img src={Prioritize} width={40} height={40} /></div>
                  <div className='text-center'><h2 className='text-xl font-medium'>Easy Task Management</h2></div>
                  <div><p>Organise your tasks effortlessly using our intuitive task management system</p></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

    </main>
  )
}
