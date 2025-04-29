import React from "react";
import SubmitButton from "./SubmitButton";

const Form = () => {
  return (
    <form>
      <label>
        Full name:
        <input type="text" name="fullName" required />
      </label>

      <label>
        Main goal in joining Collaborators:
        <select name="goal">
          <option value="networking">Networking</option>
          <option value="projects">Networking & Building Projects</option>
        </select>
      </label>

      <label>
        Weekly available hours:
        <input type="number" name="hours" min="1" max="40" />
      </label>

      <label>
        Best times to join:
        <input type="text" name="times" />
      </label>

      <label>
        Describe yourself with emojis:
        <input type="text" name="emojis" />
      </label>

      <SubmitButton />
    </form>
  );
};

export default Form;
