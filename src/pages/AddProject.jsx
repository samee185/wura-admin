import React from 'react';
import ProjectForm from '../components/ProjectForm';
import { useProject } from '../contexts/ProjectContext';

const AddProject = () => {

  return (
    <div className="pt-20">
      <ProjectForm />
    </div>
  );
};

export default AddProject;