"use client";
import React, { useContext, useEffect, useState } from 'react'
import TaskComp from '@/app/show-tasks/TaskComp'
import { deleteTaskById, getUserTasks } from '@/services/taskServices';
import { toast } from 'react-toastify';
import UserContext from '../context/userContext';
import { updateTaskById } from '@/services/taskServices';
import empty from '@/assets/empty.svg';
import Image from 'next/image';
import xCross from '@/assets/x-white.png';

const ShowTasks = () => {
    const context = useContext(UserContext);
    // console.log(context);
    const [status, setStatus] = useState();
    const [tasks,setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    let newfilteredTasks,searchFilteredTasks;
    const [filteredTasks, setFilteredTasks] = useState([...tasks]); 
    
    
    
    const deletetaskParent = async (taskId)=>{
        try {
            const res  = await deleteTaskById(taskId);
            const newTasks = tasks.filter((item)=> item._id != taskId);
            setTasks(newTasks);
            toast.success("Task Deleted Successfully !!!");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting the task !!!");            
        }
    }

    const changeStatusParent = async (task)=>{
        console.log("task: " ,task);
        try {
            if(task.status === "pending"){
              const updateData = {...task, status:"completed"};
              const res = await updateTaskById(task._id,updateData);
              console.log(res);
              if(res){
                setStatus("completed");
                task.status = status;
                toast.info("Task status updated !!!");
              }
              return;
            }
            toast.info("Task is already completed !!!");
           } catch (error) {
            console.log(error);
            toast.error("Error occured while updating the task!!!");
           }
    }

    const handleSearch = (e)=>{
        setSearchQuery(e.target.value.toLowerCase());  
    }

    const handleSearchSubmit = ()=>{
        try {
            searchFilteredTasks = filteredTasks.filter((task)=> task.title.toLowerCase().includes(searchQuery));
            setTasks(searchFilteredTasks);
            // if(searchFilteredTasks.length == 0){
            //     toast.info('No such task found !!!');
            // }
        } catch (error) {
            console.log(error);
            toast.error("Error occurred while searching tasks...");
        }
    }

    const clearSearch = () =>{
        setSearchQuery('');
    }

    const handleFilter = async (status)=>{
        try {
            
            if (status === 'none') {
               newfilteredTasks = filteredTasks.filter((item) => item.status === "completed" || item.status === "pending");
               newfilteredTasks.reverse();
            } 
            else {
               newfilteredTasks = filteredTasks.filter((item) => item.status === status);
            }
            setTasks(newfilteredTasks);
        } catch (error) {
            console.log(error);
        }
    }

    async function getTasks(userId){
        try {
            const tasks = await getUserTasks(userId);
            setTasks([...tasks].reverse());
            setFilteredTasks([...tasks]);
            // console.log(tasks);
            // toast.success("Tasks fetched sucessfully !");
        } catch (error) {
            console.log(error);
            toast.error("Error while fetching tasks!");
        }
    }
    
    useEffect(()=>{
        if(searchQuery === ''){
            if(context?.user) getTasks(context?.user?._id);
        }
        else{
            if(context?.user) {
                setSearchQuery(searchQuery);
                handleSearchSubmit();
            }
        }
    },[searchQuery])

    useEffect(()=>{
        if(context.user){
            getTasks(context?.user?._id);
        }
    },[context?.user]);

    useEffect(()=>{
        // setFilteredTasks([...filteredTasks]);
        if(context.user) {getTasks(context?.user?._id)};
    },[status]);

  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-10 col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4'>
        <div className='flex justify-between mt-16 mb-2 md:mb-6 py-0 md:py-2 items-center'>
            <h1 className='text-2xl md:text-4xl font-bold'>Your tasks...</h1>
            <span className='text-md font-medium'>Tasks Count ({tasks.length})</span>
        </div>
        <div className='flex flex-row gap-1.5 relative'>
            {/* <label htmlFor="task_status" className='block text-sm font-medium mb-2'></label> */}
            <input type='text' name='search_task' value={searchQuery} placeholder='Search tasks by title...' onChange={handleSearch} className='border-none w-full py-3 px-5 rounded-3xl bg-gray-900 my-6'/>
            {
                (searchQuery.length !== 0) && (
                    <button className='absolute top-0 bottom-0 right-4' onClick={clearSearch}><Image src={xCross} width={25} height={25} alt=''/></button>
                )
            }
        </div>
        <div>
            <label htmlFor="task_status" className='block text-sm font-medium mb-2'>Filter</label>
            <select id='task_status' className=' border-none w-full py-3 px-5 rounded-3xl bg-gray-900 'name='taskStatus' defaultValue={'none'} onChange={(e)=>handleFilter(e.target.value)}>
              <option value="none">-- All tasks --</option>
              <option value="pending">Pending tasks</option>
              <option value="completed">Completed tasks</option>
            </select>
        </div>
        <div>
            {
                (tasks.length === 0) ? <div className='flex flex-col mt-16 justify-center items-center m-auto'>
                    <Image src={empty} alt='empty-list' width={250} height={250} />
                    <h1 className=' mt-6 md:text-3xl text-2xl font-medium'>No tasks available...</h1>
                </div>: tasks.map((task)=>{
                    return (
                        <TaskComp task={task} key={task._id} changeStatusParent={changeStatusParent} deletetaskParent={deletetaskParent} updatedStatus={status} />
                    )
                }
                )
            }
        </div>
        </div>
    </div>
  )
}

export default ShowTasks
