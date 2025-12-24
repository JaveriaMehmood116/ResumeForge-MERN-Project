import React from 'react';
import './FormSection.css';

const Skills = ({ skills, updateResume }) => {
  const handleAddCategory = () => {
    updateResume('skills', [
      ...skills,
      {
        category: '',
        items: ['']
      }
    ]);
  };

  const handleRemoveCategory = (index) => {
    updateResume('skills', skills.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (index, value) => {
    const updated = [...skills];
    updated[index].category = value;
    updateResume('skills', updated);
  };

  const handleSkillChange = (catIndex, skillIndex, value) => {
    const updated = [...skills];
    updated[catIndex].items[skillIndex] = value;
    updateResume('skills', updated);
  };

  const handleAddSkill = (catIndex) => {
    const updated = [...skills];
    updated[catIndex].items.push('');
    updateResume('skills', updated);
  };

  const handleRemoveSkill = (catIndex, skillIndex) => {
    const updated = [...skills];
    updated[catIndex].items = updated[catIndex].items.filter((_, i) => i !== skillIndex);
    updateResume('skills', updated);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Skills</h2>
        <button onClick={handleAddCategory} className="btn-add">+ Add Category</button>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">
          <p>No skill categories added yet. Click "Add Category" to get started.</p>
        </div>
      ) : (
        skills.map((skillCategory, catIndex) => (
          <div key={catIndex} className="item-card">
            <div className="item-header">
              <h3>Category #{catIndex + 1}</h3>
              <button onClick={() => handleRemoveCategory(catIndex)} className="btn-remove">Remove</button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={skillCategory.category}
                  onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                  placeholder="e.g., Programming Languages, Tools, etc."
                />
              </div>
              <div className="form-group full-width">
                <label>Skills</label>
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="achievement-item">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(catIndex, skillIndex, e.target.value)}
                      placeholder="Enter a skill"
                    />
                    <button onClick={() => handleRemoveSkill(catIndex, skillIndex)} className="btn-small-remove">
                      ×
                    </button>
                  </div>
                ))}
                <button onClick={() => handleAddSkill(catIndex)} className="btn-add-small">
                  + Add Skill
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Skills;


