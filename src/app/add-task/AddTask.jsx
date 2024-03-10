"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import AddTaskImg from '@/assets/add-task.svg';
import { addTask } from '@/services/taskServices';
import { toast } from 'react-toastify';


const AddTask = () => {


    const [task, setTask] = useState({
        title: "",
        content: "",
        status: "none",
        userId: ""
    });

    const clearForm = ()=>{
        setTask({
            title: "",
            content: "",
            status: "none",
            userId: ""
        });
    }

    const handleAddTask = async (e)=>{
        e.preventDefault();
        console.log(task);
        try {
            const result = await addTask(task);
            console.log(result);
            toast.success("Task added Successfully 🔥!!!",{
                position: "top-center"
            });
            setTask({
                title: "",
                content: "",
                status: "none"
            })
        } catch (error) {
            console.log("Error: ",error);
            toast.error("Task creation Failed 😭!!!",{
                position: "top-center"
            })
        }
    }

    return (
        <div className='grid grid-cols-12 justify-center mt-8 md:mt-0'>
            <div className='lg:col-span-6 lg:col-start-4 md:col-span-8 md:col-start-3 p-5 shadow-sm col-span-12 col-start-0'>
                <Image src={AddTaskImg} className='lg:w-1/4 w-2/4 py-8 md:py-4 m-auto' alt='login-img' priority={true}/>
                <h1 className='text-3xl text-center'>Add your task here...</h1>

                <form action='#!' onSubmit={handleAddTask}>
                    <div className='mt-4'>
                        <label htmlFor="task_title" className='block text-sm font-medium mb-2'>Title</label>
                        <input type='text' id='text_title' placeholder='Enter title here...' className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' name='task_title' autoComplete='off' onChange={(event)=>{
                            setTask({
                                ...task,
                                title: event.target.value
                            });
                        }} value={task.title}/>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="task_content" className='block text-sm font-medium mb-2'>Content</label>
                        <textarea type='text' id='text_content' placeholder='Add content here...' className=' border-none w-full py-3 px-5 rounded-3xl bg-gray-900 ' rows={5} name='task_content' autoComplete='off' onChange={(event)=>{
                            setTask({
                                ...task,
                                content: event.target.value
                            });
                        }} value={task.content}/>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="task_status" className='block text-sm font-medium mb-2'>Status</label>
                        <select id='task_status' className=' border-none w-full py-3 px-5 rounded-3xl bg-gray-900 'name='task_status' onChange={(event)=>{
                            setTask({
                                ...task,
                                status: event.target.value
                            });
                        }} value={task.status}>
                            <option value="none" disabled>-- select status --</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>       

                    <div className='mt-8 flex justify-center'>
                        <button type='submit' className='bg-blue-600 mx-2 px-4 py-2 rounded-lg hover:bg-blue-800' >Add Task</button>
                        <button type='reset' className='bg-red-600 mx-2 px-4 py-2 rounded-lg hover:bg-red-800' onClick={clearForm}>Clear</button>
                    </div>           
                </form>
            </div>
        </div>
    )
}

export default AddTask;
