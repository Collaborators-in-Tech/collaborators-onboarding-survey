import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/form/WelcomePage";
import NotFound from "./pages/NotFound";
import FormPage from "./pages/form/FormPage";
import Admin from "./pages/admin/AdminPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDetails from "./components/admin/UserDetails";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import EditForm from "./pages/admin/EditForm";
import Register from "./pages/admin/Register";
import EditQuestion from "./pages/admin/EditQuestion";
import Header from "./components/Header";
import UserList from "./pages/admin/UserList";
import AddNewForm from "./pages/admin/AddNewForm";
import AdminList from "./pages/admin/AdminList";
import { ThankYouPage } from "./pages/ThankYouPage";

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/form/:formId" element={<FormPage />} />
      
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/admin-dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
      <Route path="/admin/user-details" element={<ProtectedRoute><UserDetails /> </ProtectedRoute>} />
      <Route path="/admin/users-list" element={<ProtectedRoute><UserList /> </ProtectedRoute>} />
      <Route path="/admin/edit-form" element={<ProtectedRoute><EditForm /> </ProtectedRoute>} />
      <Route path="/admin/add-form" element={<ProtectedRoute><AddNewForm /> </ProtectedRoute>} />
      <Route path="/admin/admins-list" element={<ProtectedRoute><AdminList /> </ProtectedRoute>} />
      <Route  path="/admin/edit-question/:formId/:questionId" element={<ProtectedRoute><EditQuestion /></ProtectedRoute>}/>
      <Route path="/admin/register" element={<ProtectedRoute><Register/></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;



