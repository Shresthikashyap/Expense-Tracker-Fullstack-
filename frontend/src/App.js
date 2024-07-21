import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './components/AuthForm/SignUp';
import Login from './components/AuthForm/Login';
import ForgetPassword from './components/AuthForm/ForgetPassword';
import Expenses from './components/Expenses/Expense';
import Home from './components/Home/Home';
import Leaderboard from './components/Leaderboard/Leaderboard';
import { logout } from './store/AuthSlice';
import './App.css';
import { toggleTheme } from './store/ThemeSlice';
import Premium from './components/Premium/Premium';
import CompleteAuthForm from './components/CompleteProfile/CompleteAuthForm';
import Downloads from './components/Downloads/Downloads';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    if (isDarkTheme) {
      dispatch(toggleTheme());
    }
  };

  const navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Expenses', path: '/expenses' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Downloads', path: '/downloads' },
    { label: 'Complete Profile', path: '/completeprofile' },
    { label: 'LogOut', path: '/', onClick: handleLogout },
  ];

  useEffect(() => {
    const body = document.querySelector('body');
    if (isDarkTheme) {
      body.style.backgroundColor = '#333';
      body.style.color = '#fff';
    } else {
      body.style.backgroundColor = 'rgb(218, 178, 132)';
      body.style.color = '#333';
    }
  }, [isDarkTheme]);

  return (
    <Router>
      <div>
        <div className="container">
          {!isAuth && <header>Expensify</header>}
          {isAuth && (
            <nav className="sidebar">
              <header>Expensify</header>
              <ul>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} onClick={link.onClick}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="main-content">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/completeprofile" element={<CompleteAuthForm />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
