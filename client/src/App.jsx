import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "./pages/NotFound";
import FormPage from "./pages/FormPage";
import Admin from "./pages/AdminPage";
import Header from "./components/Header";
import { ThankYouPage } from "./pages/ThankYouPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/thank" element={<ThankYouPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
