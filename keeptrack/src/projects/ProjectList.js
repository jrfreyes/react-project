import PropTypes from 'prop-types'
import { useState } from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

export default function ProjectList({ projects }) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({})
    const handleEdit = (project) => {
        setProjectBeingEdited(project)
    }

    const cancelEditing = () => {
        setProjectBeingEdited({})
    } 

    const items = projects.map(project => (   
        <div key={project.id} className="cols-sm">
            {projectBeingEdited === project ? (
                <ProjectForm 
                    project={project}
                    onCancel={cancelEditing} 
                />
            ) : (
                <ProjectCard 
                project={project}
                onEdit={handleEdit} 
                />
            )}
        </div>
    ))
    
    return <div className='row'>{items}</div>;
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
    onSave: PropTypes.func.isRequired
}

