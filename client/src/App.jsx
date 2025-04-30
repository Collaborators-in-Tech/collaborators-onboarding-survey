import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "./pages/NotFound";
import FormPage from "./pages/FormPage";
import Admin from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
