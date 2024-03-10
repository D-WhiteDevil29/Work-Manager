"use client"
import React, { useContext, useEffect, useState } from 'react';
import Logo from '@/assets/work-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import Hamburger from 'hamburger-react';
import UserContext from '@/app/context/userContext';
import { currentUser, logout } from '@/services/userServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CustomNavbar = () => {
    const context = useContext(UserContext);

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [tabOpen, setTabOpen] = useState(false);
    const handleMenu = () => {
        setTabOpen(!tabOpen);
    }

    async function doLogout() {
        try {
            const loggedout = await logout();
            toast.success("User logged out successfully !");
            context.setUser(undefined);
            router.push("/");
        } catch (error) {
            console.log(error);
            toast.error("Logout error !!!");
        }
    }

    // console.log(context);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-sm shadow-slate-900 dark:shadow-slate-500  fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="flex flex-wrap gap-3 justify-between md:justify-evenly items-center mx-auto p-4">
                <div className='flex md:m-auto'>
                    <a href="/" className="flex items-center flex-row space-x-3 rtl:space-x-reverse">
                        <Image src={Logo} className='w-10 md:w-12' alt="logo" />
                        <span className="self-center text-black text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">Work Manager</span>
                    </a>
                </div>
                <div className='md:hidden flex' ><Hamburger toggled={isOpen} onToggle={() => {
                    setIsOpen(!isOpen);
                    if (tabOpen) { setTabOpen(!tabOpen) }
                }} /></div>


                <div className={`md:flex md:order-2 gap-2 mx-auto space-x-3 md:space-x-0 rtl:space-x-reverse 
                ${(isOpen) ? "flex" : "hidden"}`}>
                    <button type="button" className={`text-white bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center items-center dark:focus:ring-blue-800 flex md:hidden`} onClick={handleMenu}>🟰</button>

                    {context.user && (
                        <>
                            <Link href={'/profile/user'}>
                                <button type="button" className="text-slate-950 bg-white  hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800 flex flex-row items-center"><img src={context.user.profileURL} style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'contain', marginRight: '5px', background: '#050A30' }} alt='user' />{context.user.name}</button></Link>

                            <button type="button" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={doLogout}>Logout</button>
                        </>
                    )
                    }
                    {!(context.user) && (
                        <>
                            <Link href={'/login'}><button type="button" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button></Link>

                            <Link href={'/sign-up'}><button type="button" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button></Link>
                        </>
                    )
                    }
                </div>
                {
                    context.user && (
                        <div className={`items-center w-full md:flex md:w-auto md:order-1 ${(tabOpen) ? "flex" : "hidden"}`} id="navbar-sticky">
                            <ul className="flex w-full text-center flex-col text-blue-950 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:hover:text-blue-500 " aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="/add-task" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ">Add Task</a>
                                </li>
                                <li>
                                    <a href="/show-tasks" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 active:text-blue-700">Show tasks</a>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}

export default CustomNavbar;
