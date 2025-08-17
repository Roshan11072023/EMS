import React, { useContext } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import { AuthContext } from '../../context/AuthProvider'

const AdminDashboard = (props) => {
  const [ userData, updateTaskStatus ] = useContext(AuthContext)
  console.log('AdminDashboard userData:', userData)
  return (
    <div className='h-screen w-full p-7'>
      <Header changeUser={props.changeUser} userData={userData}/>
      <CreateTask />
      <AllTask userData={userData} updateTaskStatus={updateTaskStatus} />
    </div>
  )
}

export default AdminDashboard
