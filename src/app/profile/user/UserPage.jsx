"use client";
import UserContext from '@/app/context/userContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import pencil from '@/assets/pencil.png';
import verifiedCheck from '@/assets/verifiedCheck.png';
import check from '@/assets/check.png';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { currentUser, deleteUserById, logout, sendUserEmail, updateUserById, updateUserPassById } from '@/services/userServices';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';


const UserPage = () => {
  const [readOnlyValueName, setReadOnlyValueName] = useState(true);
  const [readOnlyValueAbout, setReadOnlyValueAbout] = useState(true);
  const [readOnlyValueURL, setReadOnlyValueURL] = useState(true);
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();
  const [openPassBar, SetOpenPassBar] = useState(false);

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    password: user?.password,
    about: user?.about,
    profileURL: user?.profileURL
});

  const [newName, setNewName] = useState(`${userData?.name}`);
  const [newAbout, setNewAbout] = useState(`${userData?.about}`);
  const [newPassword, setNewPassword] = useState(``);
  const [newProfileURL, setNewProfileURL] = useState(`${userData?.profileURL}`);
  const [done, setDone] = useState(false);

  async function loadUserContext (){
    try {
      const person = await currentUser();
      setUser(person);
      // setUserData(user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    loadUserContext();
  },[done]);

  useEffect(()=>{
    // console.log("userData:", userData);
    // console.log("context user: ",user);
    setNewName(userData?.name);
    setNewAbout(userData?.about);
    setNewProfileURL(userData?.profileURL);
    setUserData(user);
  },[userData,user]);
  
  const UseFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    
    return [ htmlElRef,  setFocus ] 
  }

  // Handlechange function  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleAboutChange = (event) => {
    setNewAbout(event.target.value);
  };
  const handleURLChange = (event) => {
    setNewProfileURL(event.target.value);
  };
  const handlePassChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit =async ()=>{
    setReadOnlyValueName(!readOnlyValueName);
    const data = {
      ...userData,
      name: newName,
      about: newAbout,
      profileURL: newProfileURL
    };
    try {
      const res = await updateUserById(user._id, data);
      // loadUserContext();
      // console.log(res);
      setUser(user);
      setDone(!done);
      toast.success("Profile updated successfully !!!");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred in updating username !!!");
    }
  }

  const deleteAccount = async () =>{
    const confirmation = confirm('Are you sure you want to delete your account ?');
    if(confirmation){
      try {
        logout();
        const userdeleted = await deleteUserById(user?._id);
        setUser(undefined);
        setUserData({});
        router.push('/');
        toast.success('Your account has been deleted successfully!!!');
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong while deleting your account !!!');
      }
    }
  }

  const changePassword = ()=>{
    SetOpenPassBar(!openPassBar);
  }

  const handleMainPassChange = async ()=>{
    if(newPassword.trim() === '' || newPassword.length < 5){
      toast.info("Enter valid password !!!");
      setNewPassword('');
      return;
    }
    try {
      const newPasswordCreated = bcrypt.hashSync(newPassword, parseInt(process.env.BCRYPT_SALT));
      const latestData = {
        ...user,
        password : newPasswordCreated
      }
      setNewPassword('');
      const res = await updateUserPassById(user?._id, latestData);
      if(res) toast('Password updated successfully !!!');
    } catch (error) {
      console.log("Error generated !!!");
      toast.error("Error in password updation !!!");
    }
  }
  
  const sendUserEmailFunction = async ()=>{
    try {
      const res = await sendUserEmail();
      if(res) {
        toast.success("Email sent successfully !!!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [nameinputRef, setNameInputFocus] = UseFocus();
  const [aboutinputRef, setAboutInputFocus] = UseFocus();
  const [urlinputRef, setURLInputFocus] = UseFocus();

  // console.log(context);
  // setNewName(context?.user?.name);

  return (
    <div className='flex flex-col gap-16 justify-center'>
    <div className='grid grid-cols-12 mt-16'>
        <div className='md:col-span-6 md:col-start-4 col-span-10 col-start-2'>
          <h1 className='text-2xl md:text-3xl font-medium text-center'>Welcome to profile page</h1>
          <div className='flex justify-center my-8'>
            <img src={user?.profileURL} className='rounded-full p-3 border border-gray-600 object-contain' alt='Profile-img' width={200} height={250} />
          </div>
          <div className='flex flex-col gap-6'>   
            <div className='relative w-11/12 md:w-3/4 m-auto'>
              <label htmlFor="username" className='block text-sm font-medium mb-1'>Username</label>
              <input value={newName} name='user_name' type="text" onChange={handleNameChange} ref={nameinputRef} className='p-3 bg-gray-900 w-full  text-white rounded-lg' readOnly={readOnlyValueName}/>
              <button className='flex mt-5 justify-center items-center absolute top-0 bottom-0 right-2' onClick={()=>{
                setReadOnlyValueName(!readOnlyValueName);
                if(readOnlyValueName) setNameInputFocus();}}>
                  <Image src={pencil} alt='edit-icon' width={25} height={25} />
              </button>
            </div>

            <div className='relative w-11/12 md:w-3/4 m-auto'>
              <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
              <input value={userData?.email} name='user_email' type="email" className='p-3 bg-gray-900 w-full  text-white rounded-lg' readOnly={true}/>
            </div>

            <div className='relative w-11/12 md:w-3/4 m-auto'>
              <label htmlFor="user_about" className='block text-sm font-medium mb-1'>About</label>
              <textarea value={newAbout} name='user_about' rows={5} onChange={handleAboutChange} ref={aboutinputRef} className='p-3 bg-gray-900 w-full  text-white rounded-lg' readOnly={readOnlyValueAbout}/>
              <button className='flex mt-5 justify-center items-center absolute bottom-4 right-2' onClick={()=>{
                setReadOnlyValueAbout(!readOnlyValueAbout);
                if(readOnlyValueAbout) setAboutInputFocus();}}>
                  <Image src={pencil} alt='edit-icon' width={25} height={25} />
              </button>
            </div>

            <div className='relative w-11/12 md:w-3/4 m-auto'>
              <label htmlFor="user_profileURL" className='block text-sm font-medium mb-1'>ProfileURL</label>
              <input value={newProfileURL} name='user_profileURL' type='text' onChange={handleURLChange} ref={urlinputRef} className='p-3 bg-gray-900 w-full  text-white rounded-lg' readOnly={readOnlyValueURL}/>
              <button className='flex mt-5 justify-center items-center absolute bottom-1 right-0 bg-slate-900 px-2 py-2' onClick={()=>{
                setReadOnlyValueURL(!readOnlyValueURL);
                if(readOnlyValueURL) setURLInputFocus();}}>
                  <Image src={pencil} alt='edit-icon' width={25} height={25} />
              </button>
              {/* https://i.pinimg.com/originals/c2/3c/2b/c23c2b8966cfaa4a0832c3833fe74cb7.jpg */}

              {/* https://i.pinimg.com/564x/15/a2/c1/15a2c1eeb335985509fb44d7e39e073a.jpg */}

              {/* https://c4.wallpaperflare.com/wallpaper/32/751/642/elizabeth-olsen-actress-wanda-maximoff-hd-wallpaper-preview.jpg */}
            </div>

          </div>
          <div className='flex w-full mt-6'>
            <button className='px-4 py-2 bg-green-600 hover:bg-green-900 m-auto rounded-lg' onClick={handleSubmit}>Update</button>
          </div>
        </div>
    </div>

    {/* Terms and Conditions */}
    <div className='m-auto'>
          <h1 className='text-2xl m-auto text-center'>Terms and Conditions<span className='text-red-600'>*</span></h1>
          <div className='grid grid-cols-8 w-full my-8 p-4'>
            <div className='col-span-8 col-start-1 md:col-span-6 md:col-start-2 text-sm md:text-sm text-slate-200'>
             <ul className='list-disc pl-3 pr-1'>
              <li className='mt-2'>
                <h4 className='font-semibold underline'>Data Security and Privacy: </h4>
                <p>- Your data is securely stored and encrypted.</p>
                <p>- We respect your privacy and do not share your information with third parties.</p>
              </li>
              <li className='mt-3'>
                <h4 className='font-semibold underline'>Confidentiality of Credentials: </h4>
                <p>- Your login credentials are known only to you.</p>
                <p>- Keep your password and security information confidential.</p>
              </li>
              <li className='mt-3'>
                <h4 className='font-semibold underline'>Account Management:</h4>
                <p>- You can delete your account anytime.</p>
                <p>- Confirm account deletion through the "Delete Account" button.</p>
              </li>
              <li className='mt-3'>
                <h4 className='font-semibold underline'>Transparency and Control:</h4>
                <p>- Access, review, and update your data.</p>
                <p>- Manage privacy preferences and settings.</p>
              </li>
              <li className='mt-3'>
                <h4 className='font-semibold underline'>Regulatory Compliance:</h4>
                <p>- We comply with data protection regulations.</p>
                <p>- Your rights and freedoms are protected.</p>
              </li>
              <li className='mt-3'>
                <h4 className='font-semibold underline'>Continuous Improvement:</h4>
                <p>- We continuously improve security and privacy practices.</p>
                <p>- Welcome user feedback for enhancements.</p>
              </li>
             </ul>
            </div>
          </div>
          <div className='flex justify-center' ><button className='bg-red-700 px-3 py-2 rounded-lg hover:bg-red-800 text-slate-50' onClick={deleteAccount}>Delete Account</button></div>
    </div>

    {/* Change password section */}
    <div className='flex flex-col p-2 md:w-1/2 bg-slate-800 w-3/4 m-auto rounded-lg' >
      <div className='flex flex-wrap my-2 justify-evenly items-center gap-3'>
        <span className='font-medium text-sm'>Want to change the password ? </span>
        <button className='px-3 py-2 bg-blue-700 hover:bg-blue-900 text-slate-50 text-sm rounded-lg' onClick={changePassword}>Change password</button>
      </div>
      {
        openPassBar && (
          <div className='my-4 justify-center items-center text-center'>
        <label htmlFor="user_password" className='block text-sm font-medium mb-3'>New Password</label>
        <input type='text' value={newPassword} className='p-3 bg-gray-900 w-full  text-white rounded-lg' onChange={handlePassChange}/>
        <button className='px-3 py-2 bg-green-700 hover:bg-green-800 my-3 text-slate-50 text-sm rounded-lg' onClick={handleMainPassChange}>Submit</button>

      </div>
        )
      }
      
    </div>

    </div>
    
  )
}

export default UserPage;
