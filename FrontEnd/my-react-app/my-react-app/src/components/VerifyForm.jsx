import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../api/axios";

function VerifyForm() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 phút = 60 giây
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const sentRef = useRef(false);

  // Gửi OTP khi vào form
  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }
    if (!sentRef.current) {
      sentRef.current = true;
      sendOtp(email);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      await verifyOtp(email, otp);
      navigate("/login", { state: { verified: true } });
    } catch {
      setErrorMsg("OTP không đúng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    setResendLoading(true);
    try {
      await sendOtp(email);
      setTimeLeft(60); // Reset lại thời gian
    } catch {
      alert("Gửi lại OTP thất bại. Vui lòng thử lại.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-700">Verifying...</p>
          </div>
        </div>
      )}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-4">Please enter the OTP sent to your email. <br/> OTP is valid for 1 minutes.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="text-red-600 text-center font-semibold mb-2">{errorMsg}</div>
          )}
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={isLoading || timeLeft === 0}
          >
            Submit
          </button>
        </form>
        <div className="text-center mt-4 text-gray-500">
          Time left: <span className="font-mono text-blue-600">{formatTime(timeLeft)}</span>
        </div>
        <div className="text-center mt-2">
          <button
            onClick={handleResendOtp}
            className="text-blue-600 hover:underline disabled:text-gray-400"
            disabled={timeLeft > 0 || resendLoading}
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyForm;