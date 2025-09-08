import React from 'react';
import ProjectForm from '../components/ProjectForm';
import { useProject } from '../contexts/ProjectContext';

const AddProject = () => {
  const { createProjt, loading } = useProject();

  const handleSubmit = async (formData) => {
    await createProject(formData);
  };

  return (
    <div className="pt-20">
      <ProjectForm onSubmit={handleSubmit} loading={loading.create} />
    </div>
  );
};

export default AddProject;