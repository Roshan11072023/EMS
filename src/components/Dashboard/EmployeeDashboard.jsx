import React, { useContext } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = (props) => {
  const [userData, , updateTaskStatus] = useContext(AuthContext)

  // Find current employee data from global userData
  const employeeData = Array.isArray(userData) ? userData.find(emp => emp.id === props.data.id) : null

  if (!employeeData) return <div>Loading...</div>

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
      <Header changeUser={props.changeUser} userData={employeeData} />
      <TaskListNumbers data={employeeData} />
      <TaskList data={employeeData} updateTaskStatus={(taskIndex, updates) => updateTaskStatus(employeeData.id, taskIndex, updates)} />
    </div>
  )
}

export default EmployeeDashboard
