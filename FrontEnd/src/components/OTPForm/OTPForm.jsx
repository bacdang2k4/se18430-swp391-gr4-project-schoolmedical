import React, { useState, useEffect } from 'react';
import './OTPForm.css';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = (e) => {
    e.preventDefault();
    setTimeLeft(5 * 60); // Reset timer to 5 minutes
    setIsResendDisabled(true);
    // Add logic to resend OTP here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP submitted:', otp);
    // Xử lý logic xác thực OTP ở đây
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <h2 className="otp-title">Login</h2>
        <div className="otp-description">
          A one-time passcode (OTP) has just been sent to you. It will be an email or text message - or both - depending on what communication preferences you have set.
          <br />
          The OTP is valid for 5 minutes. Enter it here to continue logging in
          <div className="timer">Time remaining: {formatTime(timeLeft)}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="otp-input-group">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength="6"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <div className="resend-otp">
          I didn't get my OTP - <a 
            href="#" 
            className={`resend-link ${isResendDisabled ? 'disabled' : ''}`}
            onClick={handleResendOTP}
            style={{ pointerEvents: isResendDisabled ? 'none' : 'auto' }}
          >
            Please send me another {isResendDisabled ? `(${formatTime(timeLeft)})` : ''}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OTPForm; 