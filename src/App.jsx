import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';
import { ToastContainer, toast } from 'react-toastify'
const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useContext(AuthContext);

  return (
    <Router>
      <AppRoutes
        user={user}
        setUser={setUser}
        userData={userData}
        setLoggedInUserData={setLoggedInUserData}
        loggedInUserData={loggedInUserData}
      />
    </Router>
  );
};

const AppRoutes = ({ user, setUser, userData, setLoggedInUserData, loggedInUserData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    const adminData = JSON.parse(localStorage.getItem('admin')) || [];

  const user = adminData.find(
    (adminUser) => adminUser.email === email && adminUser.password === password
  );

  if (user) {
    setUser('admin');
    localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', email: user.email, id: user.id }));
    navigate('/admin')
      toast.success('Admin logged in successfully')
    } else if (userData) {
      const employee = userData.find((e) => email === e.email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
        navigate('/employee');
        toast.success(`Welcome, ${employee.firstName}! You are logged in.`)
      } else {
        toast.error('Invalid Credentials')
      }
    } else {
      toast.error('Invalid Credentials')
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
    <Routes>
      <Route path="/" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/admin"
        element={user === 'admin' ? <AdminDashboard changeUser={setUser} /> : <Navigate to="/" />}
      />
      <Route
        path="/employee"
        element={user === 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : <Navigate to="/" />}
      />
    </Routes>
    </>
  );
};

export default App;
