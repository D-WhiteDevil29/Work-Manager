import React from 'react'

const Footer = () => {
    return (
        <div className='h-max w-full  bg-white flex flex-col  row-span-1 justify-around text-center items-center dark:bg-blue-900 text-gray-900 dark:text-white sticky'>
            <div className='flex justify-around w-11/12 m-2 p-2 md:p-8 rounded-xl gap-4 col-span-2 bg-slate-950 shadow-sm shadow-slate-700 flex-wrap flex-1'>
                <div className='flex w-2/4 gap-3 flex-col flex-wrap'>
                    <h1 className='text-2xl font-bold text-center text-slate-100'>Welcome to Work Manager</h1>
                    <p className='text-sm font-medium text-slate-400'>"Unlock productivity. Sign up now, start managing tasks effortlessly. Organize priorities, achieve goals with clarity. Join us today for success."</p>
                </div>

                <div className='flex w-11/12 md:w-auto md:text-sm justify-evenly text-center m-auto text-slate-100 bg-blue-900 p-4 rounded-lg align-middle md:gap-4 gap-2 text-xs'>
                    <a className=' hover:text-yellow-500 p-1 ' href='/'><p>Home</p></a>
                    <a className=' hover:text-yellow-500 p-1 ' href='/about'><p>About</p></a>
                    <a className=' hover:text-yellow-500 p-1 ' href='/add-task'><p>Add Task</p></a>
                    <a className=' hover:text-yellow-500 p-1 ' href='/show-tasks'><p>Show Tasks</p></a>
                </div>
            </div>
            <div className='mb-3 flex text-center shadow-sm shadow-slate-700 bg-slate-950 px-4 py-2 mx-2 rounded-lg text-sm'>
                <span>Copyright 2024 | All Rights Reserved by Digvijay Shingare</span>
            </div>

        </div>
    )
}

export default Footer;
