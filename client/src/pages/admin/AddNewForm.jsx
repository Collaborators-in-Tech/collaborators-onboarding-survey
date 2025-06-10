import { useState } from "react"
import GoBack from "../../components/admin/GoBack"
import "../../styles/admin/add-form.css";

const AddNewForm = () => {
    const [formName, setFormName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", { formName, description });
    };

    return (
        <>
            <GoBack url="/admin/admin-dashboard" />
            <h4>New Form</h4>
            <main className="form-container">
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="formName">Name of Form</label>
                        <input
                            className="addform-input"
                            type="text"
                            id="formName"
                            name="formName"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Enter form name"
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
        </>
    );
};

export default AddNewForm;
