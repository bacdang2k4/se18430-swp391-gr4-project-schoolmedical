import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import OTPForm from './components/OTPForm/OTPForm'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OTPForm />} />
      </Routes>
    </Router>
  )
}

export default App