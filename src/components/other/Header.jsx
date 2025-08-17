import React, { useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'
import { toast } from 'react-toastify';
import ReactTypingEffect from 'react-typing-effect';
import { Typewriter } from 'react-simple-typewriter'
const Header = (props) => {
  const logOutUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let userName = 'User'; // fallback name
    if (loggedInUser?.role === 'employee' && loggedInUser.data?.firstName) {
      userName = loggedInUser.data.firstName;
    } else if (loggedInUser?.role === 'admin') {
      userName = 'Admin';
    }

    localStorage.removeItem('loggedInUser');  // clear storage
    props.changeUser(null);                    // clear user state

    toast.info(`${userName} logged out successfully`);

  }
  let displayName = 'User'
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser?.role === 'employee' && loggedInUser.data?.firstName) {
    displayName = loggedInUser.data.firstName;
  } else if (loggedInUser?.role === 'admin') {
    displayName = 'Admin';
  }


  return (
    <div className='flex items-end justify-between'>
      <h1 className="text-2xl font-medium flex items-center gap-3">
        Hello
        <span className="text-3xl font-semibold flex items-center gap-1">
          <Typewriter
            words={[displayName]}
            loop={Infinity} cursor rsor
            cursorStyle="|" typeSpeed={120} deleteSpeed={80} delaySpeed={1500} eting
          />
          <span className="animate-wave inline-block">👋</span>
        </span>
      </h1>
      <button onClick={logOutUser} className='bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm cursor-pointer hover:bg-red-700'>Log Out</button>
    </div>
  )
}

export default Header