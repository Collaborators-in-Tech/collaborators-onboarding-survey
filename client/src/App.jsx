import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "./pages/NotFound";
import FormPage from "./pages/FormPage";
import Admin from "./pages/AdminPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/user-details" element={<UserDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
