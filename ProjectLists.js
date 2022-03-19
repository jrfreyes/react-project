+ import React, { useState } from 'react';
import { Project } from './Projects';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

function ProjectList({ projects }) {
+ const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project) => {
-    console.log(project);
+    setProjectBeingEdited(project);
  };

  return (
    ...
  );
}

...
export default ProjectList;