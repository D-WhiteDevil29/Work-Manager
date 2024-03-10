"use client";
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext';
import deleteIcon from '@/assets/delete.png';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { updateTaskById } from '@/services/taskServices';
import { useRouter } from 'next/navigation';


const TaskComp = ({task, deletetaskParent, changeStatusParent,updatedStatus}) => {
  const context = useContext(UserContext);
  const router  = useRouter();
  const [status, setStatus] = useState(`${task.status}`);
  
  useEffect(()=>{
    if(updatedStatus === 'completed'){
      setStatus(updatedStatus);
    }},[updatedStatus]);
    

  const changeStatus =()=>{
    changeStatusParent(task);
  }

  const handleDelete =(taskId)=>{
    const confirmation = confirm("Are you sure you want to delete this task?");
    if(confirmation){
      deletetaskParent(taskId);
    }
    return;
  };
  
  return (
    <div className='container bg-slate-800 p-2 rounded-lg my-8'>
        <div className='flex p-2  bg-slate-950 rounded-md justify-between items-center'>
           <div><h3 className='text-md font-bold'>{task.title}</h3></div>
           <div className='flex items-center rounded-full bg-white hover:bg-yellow-300'><button onClick={()=>handleDelete(task._id)}><Image style={{width:"2rem"}} src={deleteIcon} alt='img'/></button></div>
        </div>
        <div className='flex my-2 p-2'>
          <p className='text-sm md:text-md'>{task.content}</p>
        </div>
        <div className='flex gap-5 justify-between mt-4 p-2 rounded-lg bg-slate-950'>
          <span className={`text-xs md:text-md flex gap-1 justify-center items-center`}>
            <b>Status: </b><span onClick={changeStatus} className={`cursor-pointer p-1 rounded-lg ${status === 'completed' ? 'bg-green-700':'bg-red-600'}`}>{status}</span>
          </span>
          <span className='text-xs md:text-md'>
            <b>Author: </b>{context?.user?.name}
          </span>

        </div>
    </div>
  )
}

export default TaskComp;
