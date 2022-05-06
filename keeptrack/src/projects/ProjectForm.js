import { Project } from "./Project";
import PropTypes, { number } from "prop-types";
import { useState } from "react";
import { getAllByAltText } from "@testing-library/react";

export default function ProjectForm({
        project: initialProject, 
        onSave, 
        onCancel
}) {
    const [project, setProject] = useState(initialProject)
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    })

    const handleChange = (event) => {
        const {type, name, value, checked} = event.target;
        
        let updatedValue = type === 'checkbox' ? checked : value;

        if (type === 'number') {
            updatedValue = Number(updatedValue);
            console.log(updatedValue)
        }

        const change = {
            [name]: updatedValue
        }

        let updatedProject;

        setProject((p) => {
            updatedProject = new Project({...p, ...change});
            
            return updatedProject;
        })
        setErrors(() => validate(updatedProject))
    }

    function validate(project) {
        let errors = {
            name: '',
            description: '',
            budget: '',
        }

        if (project.name.length === 0) {
            errors.name = 'Name is Required'
        }
        else if (project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters'
        }
        if (project.description.length === 0) {
            errors.description = 'Description is Required'
        }
        if (project.budget <= 0) {
            errors.budget = 'Budget must be more than $0.'
        }
        return errors
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0 
        )
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValid()) {
            onSave(project);
        }
    }

    return (
        <form 
            className="input-group vertical"
            onSubmit={handleSubmit}
        >
            <label htmlFor="name">Project Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="enter name" 
                defaultValue={project.name}
                onChange={handleChange}
            />
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}
            <label htmlFor="description">Project Description</label>

            <textarea 
                name="description" 
                placeholder="enter description" 
                defaultValue={project.description} 
                onChange={handleChange}
            />
            {errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}
            <label htmlFor="budget">Project Budget</label>

            <input 
                type="number" 
                name="budget" 
                placeholder="enter budget"
                defaultValue={project.budget} 
                onChange={handleChange}
            />
            {errors.budget.length > 0&& (
                <div className="card error">
                    <p>{errors.budget}</p>
                </div>
            )}
            <label htmlFor="isActive">Active?</label>
            <input 
                type="checkbox" 
                name="isActive" 
                defaultChecked={project.isActive}  
                onChange={handleChange}
            />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button 
                    type="button" 
                    className="bordered medium"
                    onClick={onCancel}
                >
                    cancel
                </button>
            </div>
        </form>
    );
}

ProjectForm.propTypes = {
    project: PropTypes.instanceOf(Project),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}
