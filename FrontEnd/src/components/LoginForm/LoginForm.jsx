import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    navigate('/verify-otp');
  };

  return (
    <div className="login-page">
      <h1 className="main-title">
        Healthcare Management System
        <span>Manage Your Health, Manage Your Life</span>
      </h1>
      {/* Trái */}
      <div className="login-left">         
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" placeholder="Email or Phone Number"
                value={formData.username} // value là giá trị của input khi người dùng nhập vào
                onChange={handleChange} // onChange là hàm xử lý sự kiện khi người dùng nhập vào
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password"
                value={formData.password} // value là giá trị của input khi người dùng nhập vào
                onChange={handleChange} // onChange là hàm xử lý sự kiện khi người dùng nhập vào
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" name="rememberMe"
                  checked={formData.rememberMe} // checked là giá trị của input khi người dùng chọn vào
                  onChange={handleChange}
                />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>


            <button type="submit" className="login-btn">Login</button>
          </form>
          <div className="login-footer">
          </div>
        </div>
      </div>

      {/* Phải */}
      <div className="login-right">
        <img src="https://img.freepik.com/free-photo/medium-shot-doctor-with-stethoscope_23-2148868176.jpg" alt="Healthcare Professional" />
      </div>
    </div>  
  );
};

export default LoginForm;