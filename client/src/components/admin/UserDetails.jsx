import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "./GoBack";


const UserDetails = () => {
  const location = useLocation();
  const { user } = location.state || {};
  if (!user) return <p>No user data found.</p>;

  return (
    <>
    <GoBack url={"/admin/users-list"} />
    <main>
      <h2>User Details</h2>
      <h3><strong>Name:</strong> {user.name}</h3>
      <h3><strong>Email:</strong> {user.email}</h3>
      <div  className="admin-container">
      <h3>Answers:</h3>
      
        {user.answers.map((a, i) => (
          <div key={i} className="question-card">
            <p className="que"><strong>{a.question}:</strong></p>
            <p className="ans"> {a.answer}</p>
          </div>
        ))}
      
      </div>
    </main>
    </>
  );
};

export default UserDetails;
