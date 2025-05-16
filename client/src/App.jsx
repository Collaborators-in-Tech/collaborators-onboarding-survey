import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "./pages/NotFound";
import FormPage from "./pages/FormPage";
import Admin from "./pages/AdminPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./components/admin/UserDetails";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import EditFormQuestions from "./pages/EditFormQuestions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/admin-dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />

      <Route path="/admin/user-details" element={<ProtectedRoute><UserDetails /> </ProtectedRoute>} />
      <Route path="/admin/edit-form" element={<ProtectedRoute><EditFormQuestions /> </ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
