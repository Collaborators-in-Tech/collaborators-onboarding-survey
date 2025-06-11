import { useState } from "react"
import GoBack from "../../components/admin/GoBack"
import "../../styles/admin/add-form.css";
import {API} from "../../config/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorModal from "../../components/modals/ErrorModal";

const AddNewForm = () => {
    const [formName, setFormName] = useState("");
    const [description, setDescription] = useState("");
    const {token} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Form submitted:", { formName, description });
        try{
            const response = await fetch(API.CREATE_FORM,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 

                  },
                  body: JSON.stringify({ name:formName, description }),
            });
            if (!response.ok) {
                const err = await response.json();
                setErrorMessage(err.error || "Unknown error");
                return;
            }

      const form = await response.json();
      console.log("Success:", form);
    //   navigate("");
  
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMessage("There was an error creating the form.");
    }

    };

    return (
        <>
            <GoBack url="/admin/admin-dashboard" />
            <h4>New Form</h4>
            <main className="form-container">
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="formName">Form Name</label>
                        <input
                            className="addform-input"
                            type="text"
                            id="formName"
                            name="formName"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Enter form name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                        className="form-textarea"
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </main>
            <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />
        </>
    );
};

export default AddNewForm;
