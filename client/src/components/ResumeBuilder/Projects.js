import React from 'react';
import './FormSection.css';

const Projects = ({ projects, updateResume }) => {
  const handleAdd = () => {
    updateResume('projects', [
      ...projects,
      {
        name: '',
        description: '',
        technologies: [],
        link: '',
        github: ''
      }
    ]);
  };

  const handleRemove = (index) => {
    updateResume('projects', projects.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    updateResume('projects', updated);
  };

  const handleTechChange = (projIndex, techIndex, value) => {
    const updated = [...projects];
    updated[projIndex].technologies[techIndex] = value;
    updateResume('projects', updated);
  };

  const handleAddTech = (projIndex) => {
    const updated = [...projects];
    updated[projIndex].technologies.push('');
    updateResume('projects', updated);
  };

  const handleRemoveTech = (projIndex, techIndex) => {
    const updated = [...projects];
    updated[projIndex].technologies = updated[projIndex].technologies.filter((_, i) => i !== techIndex);
    updateResume('projects', updated);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Projects</h2>
        <button onClick={handleAdd} className="btn-add">+ Add Project</button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects added yet. Click "Add Project" to get started.</p>
        </div>
      ) : (
        projects.map((project, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h3>Project #{index + 1}</h3>
              <button onClick={() => handleRemove(index)} className="btn-remove">Remove</button>
            </div>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Project Name *</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="Project Name"
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Describe your project..."
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Live Link</label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => handleChange(index, 'link', e.target.value)}
                  placeholder="https://project.com"
                />
              </div>
              <div className="form-group">
                <label>GitHub Link</label>
                <input
                  type="url"
                  value={project.github}
                  onChange={(e) => handleChange(index, 'github', e.target.value)}
                  placeholder="https://github.com/user/project"
                />
              </div>
              <div className="form-group full-width">
                <label>Technologies Used</label>
                {project.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="achievement-item">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechChange(index, techIndex, e.target.value)}
                      placeholder="Enter technology"
                    />
                    <button onClick={() => handleRemoveTech(index, techIndex)} className="btn-small-remove">
                      ×
                    </button>
                  </div>
                ))}
                <button onClick={() => handleAddTech(index)} className="btn-add-small">
                  + Add Technology
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;


