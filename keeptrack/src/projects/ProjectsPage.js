import { useEffect, useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { projectAPI } from "./projectAPI";
import { Project } from "./Project"
import ProjectsList from "./ProjectsList";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                setError(null);
                if (currentPage === 1) { 
                    setProjects(data);
                } else {
                    setProjects((p) => [...p, ...data]);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage])

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1)
    }
    const saveProject = (project) => {
        projectAPI
            .put(project)
            .then((updatedProject) => {
                let updatedProjects = projects.map((p) => {
                    return p.id === project.id ? new Project(updatedProject) : p;
                })
                setProjects(updatedProjects);
            })
            .catch((e) => {
                setError(e.message);
            });
    };
    return (
    <>
        <h1>Projects</h1>
        {error && (
            <div className="row">
                <div className="card large error">
                <section>
                    <p>
                        <span className="icon-alert inverse "></span>
                        {error}
                    </p>
                </section>
                </div>
            </div>
        )}
        <ProjectsList 
            projects={projects}
            onSave={saveProject} 
        />
        {!loading && !error && (
            <div className="row">
                <div className="col-sm-12">
                    <div className="button-group fluid">
                        <button className="button default" onClick={handleMoreClick}>
                            More...
                        </button>
                    </div>
                </div>
            </div>
        )}
        {loading && (
            <div className="center-page">
                <span className="spinner primary"></span>
                <p>Loading...</p>
            </div>
        )}
    </>
    )
}