import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout"; // Adjust the path as per your project structure
import SignupForm from "./components/Signup/signup";
import LoginForm from "./components/Signup/login";
import Dashboard from "./components/Dashboard/dashboard";
import Patients from "./components/Patients/Pateints";
import Appointments from "./components/appointments/appointments";
import Reports from "./components/Reports/reports";
import Payments from "./components/Payment/payment";
import Profile from "./components/profile/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
