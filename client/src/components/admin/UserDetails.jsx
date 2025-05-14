import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const admin = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p>No user data found.</p>;

  return (
    <div>
      <h3>{admin?.name}</h3>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Consent:</strong> {user.consent_given ? "Yes" : "No"}</p>
      <h3>Answers:</h3>
      <ul>
        {user.answers.map((a, i) => (
          <li key={i}>
            <strong>{a.question}:</strong> {a.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
