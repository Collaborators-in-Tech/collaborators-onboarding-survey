import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "./pages/NotFound";
import FormPage from "./pages/FormPage";
import Admin from "./pages/AdminPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./components/admin/UserDetails";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import EditFormQuestions from "./pages/EditFormQuestions";
import Register from "./pages/Register";
import EditQuestion from "./pages/EditQuestion";
import Header from "./components/Header";
function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route
        path="/admin/admin-dashboard"
        element={
          <ProtectedRoute>
            {" "}
            <AdminDashboard />{" "}
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/user-details"
        element={
          <ProtectedRoute>
            <UserDetails />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-form"
        element={
          <ProtectedRoute>
            <EditFormQuestions />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-question/:formId/:questionId"
        element={
          <ProtectedRoute>
            <EditQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/register"
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;



