import React from 'react';
import './FormSection.css';

const Experience = ({ experience, updateResume }) => {
  const handleAdd = () => {
    updateResume('experience', [
      ...experience,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: []
      }
    ]);
  };

  const handleRemove = (index) => {
    updateResume('experience', experience.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    updateResume('experience', updated);
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const updated = [...experience];
    updated[expIndex].achievements[achIndex] = value;
    updateResume('experience', updated);
  };

  const handleAddAchievement = (expIndex) => {
    const updated = [...experience];
    updated[expIndex].achievements.push('');
    updateResume('experience', updated);
  };

  const handleRemoveAchievement = (expIndex, achIndex) => {
    const updated = [...experience];
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex);
    updateResume('experience', updated);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Work Experience</h2>
        <button onClick={handleAdd} className="btn-add">+ Add Experience</button>
      </div>

      {experience.length === 0 ? (
        <div className="empty-state">
          <p>No work experience added yet. Click "Add Experience" to get started.</p>
        </div>
      ) : (
        experience.map((exp, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h3>Experience #{index + 1}</h3>
              <button onClick={() => handleRemove(index)} className="btn-remove">Remove</button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleChange(index, 'position', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  placeholder="MM/YYYY or Present"
                  disabled={exp.current}
                />
              </div>
              <div className="form-group full-width">
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => handleChange(index, 'current', e.target.checked)}
                  />
                  <span>Currently working here</span>
                </label>
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Describe your role and responsibilities..."
                  rows="4"
                />
              </div>
              <div className="form-group full-width">
                <label>Achievements</label>
                {exp.achievements.map((ach, achIndex) => (
                  <div key={achIndex} className="achievement-item">
                    <input
                      type="text"
                      value={ach}
                      onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                      placeholder="Enter an achievement or responsibility"
                    />
                    <button onClick={() => handleRemoveAchievement(index, achIndex)} className="btn-small-remove">
                      ×
                    </button>
                  </div>
                ))}
                <button onClick={() => handleAddAchievement(index)} className="btn-add-small">
                  + Add Achievement
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Experience;


