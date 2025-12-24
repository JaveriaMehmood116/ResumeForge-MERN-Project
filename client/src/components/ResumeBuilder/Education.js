import React from 'react';
import './FormSection.css';

const Education = ({ education, updateResume }) => {
  const handleAdd = () => {
    updateResume('education', [
      ...education,
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        honors: []
      }
    ]);
  };

  const handleRemove = (index) => {
    updateResume('education', education.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    updateResume('education', updated);
  };

  const handleHonorChange = (eduIndex, honorIndex, value) => {
    const updated = [...education];
    updated[eduIndex].honors[honorIndex] = value;
    updateResume('education', updated);
  };

  const handleAddHonor = (eduIndex) => {
    const updated = [...education];
    updated[eduIndex].honors.push('');
    updateResume('education', updated);
  };

  const handleRemoveHonor = (eduIndex, honorIndex) => {
    const updated = [...education];
    updated[eduIndex].honors = updated[eduIndex].honors.filter((_, i) => i !== honorIndex);
    updateResume('education', updated);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Education</h2>
        <button onClick={handleAdd} className="btn-add">+ Add Education</button>
      </div>

      {education.length === 0 ? (
        <div className="empty-state">
          <p>No education entries added yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        education.map((edu, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h3>Education #{index + 1}</h3>
              <button onClick={() => handleRemove(index)} className="btn-remove">Remove</button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleChange(index, 'institution', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div className="form-group">
                <label>Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>
              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => handleChange(index, 'field', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="form-group">
                <label>GPA</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="form-group full-width">
                <label>Honors & Awards</label>
                {edu.honors.map((honor, honorIndex) => (
                  <div key={honorIndex} className="achievement-item">
                    <input
                      type="text"
                      value={honor}
                      onChange={(e) => handleHonorChange(index, honorIndex, e.target.value)}
                      placeholder="Enter honor or award"
                    />
                    <button onClick={() => handleRemoveHonor(index, honorIndex)} className="btn-small-remove">
                      ×
                    </button>
                  </div>
                ))}
                <button onClick={() => handleAddHonor(index)} className="btn-add-small">
                  + Add Honor
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Education;


