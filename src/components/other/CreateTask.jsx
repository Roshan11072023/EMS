import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { toast } from 'react-toastify'

const CreateTask = () => {

    const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const [newTask, setNewTask] = useState({})

    const submitHandler = (e) => {
  e.preventDefault()

  // Create new task object directly here
  const newTask = {
    taskTitle,
    taskDescription,
    taskDate,
    category,
    active: false,
    newTask: true,
    failed: false,
    completed: false,
  }

  // Create a new copy of userData (immutable update)
  const updatedUserData = userData.map(emp => {
    if (asignTo === emp.firstName) {
      const updatedTasks = [...emp.tasks, newTask]
      const taskCounts = {
        newTask: updatedTasks.filter(t => t.newTask).length,
        active: updatedTasks.filter(t => t.active).length,
        completed: updatedTasks.filter(t => t.completed).length,
        failed: updatedTasks.filter(t => t.failed).length,
      }
      return { ...emp, tasks: updatedTasks, taskCounts }
    }
    return emp
  })

  setUserData(updatedUserData)
  localStorage.setItem('employees', JSON.stringify(updatedUserData))

  setTaskTitle('')
  setCategory('')
  setAsignTo('')
  setTaskDate('')
  setTaskDescription('')

}
    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form onSubmit={(e) => {
                submitHandler(e)
                toast.success("task created successfully")
            }}
                className='flex flex-wrap w-full items-start justify-between'
            >
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Make a UI design' required
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" required />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Asign to</h3>
                        <input
                            value={asignTo}
                            onChange={(e) => {
                                setAsignTo(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Arjun, Sneha, Ravi, Priya, Karan' required />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc' required />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value)
                        }} className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' name="" id="" required></textarea>
                    <button className='bg-emerald-600 py-3 hover:bg-emerald-800 px-5 rounded text-base mt-4 w-full cursor-pointer font-medium shadow-md hover:shadow-lg transition-all duration-200'>Create Task</button>

                </div>

            </form>
        </div>
    )
}

export default CreateTask