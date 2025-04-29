import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, this page does not exist.</p>
      <Link to="/">Go back to form</Link>
    </div>
  );
};

export default NotFound;
