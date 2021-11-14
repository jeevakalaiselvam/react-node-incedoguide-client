export const findProjectByName = (projects, projectName) => {
  const currentProject = projects.find((project) => {
    return (
      project.projectName.toUpperCase().trim() ===
      projectName.toUpperCase().trim()
    );
  });
  return currentProject;
};
