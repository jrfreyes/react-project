import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectsList from "./ProjectList";
import ProjectListSkeleton from "./ProjectListSkeleton";
import { loadProjects } from "./state/projectActions";

export default function ProjectsPage() {
    const loading = useSelector(
        (appState) => appState.projectState.loading
    );
    const projects = useSelector(
        (appState) => appState.projectState.projects
    );
    const error = useSelector(
        (appState) => appState.projectState.error
    );
    const currentPage = useSelector(
        (appState) => appState.projectState.page
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProjects(1))
    }, [dispatch])

    const handleMoreClick = () => {
        dispatch(loadProjects(currentPage + 1));
    }

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
        {loading && <ProjectListSkeleton />}
        <ProjectsList 
            projects={projects}
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
    </>
    )
}