import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([])
  
  useEffect(() => { 
    setLocalStorage()
    const { employees } = getLocalStorage()
    setUserData(employees)
  }, [])

  const updateTaskStatus = (employeeId, taskIndex, updates) => {
    setUserData(prevData => {
      const newData = prevData.map(emp => {
        if (emp.id === employeeId) {
          const newTasks = [...emp.tasks]
          newTasks[taskIndex] = { ...newTasks[taskIndex], ...updates }

          // Recalculate counts
          const taskCounts = {
            newTask: newTasks.filter(t => t.newTask).length,
            active: newTasks.filter(t => t.active).length,
            completed: newTasks.filter(t => t.completed).length,
            failed: newTasks.filter(t => t.failed).length,
          }

          return { ...emp, tasks: newTasks, taskCounts }
        }
        return emp
      })

      // Update localStorage with updated employees array
      localStorage.setItem('employees', JSON.stringify(newData))

      return newData
    })
  }

  return (
    <AuthContext.Provider value={[ userData, setUserData, updateTaskStatus]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
