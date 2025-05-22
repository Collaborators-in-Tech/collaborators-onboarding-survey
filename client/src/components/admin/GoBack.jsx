import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const GoBack = ({ url }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(url);
  };

  return (
    <div className="go-back" onClick={handleNavigation} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
      <FaArrowLeft />
      <span>Go back</span>
    </div>
  );
};

export default GoBack;
