import React from 'react';
import './FormSection.css';

const Certifications = ({ certifications, updateResume }) => {
  const handleAdd = () => {
    updateResume('certifications', [
      ...certifications,
      {
        name: '',
        issuer: '',
        date: '',
        link: ''
      }
    ]);
  };

  const handleRemove = (index) => {
    updateResume('certifications', certifications.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateResume('certifications', updated);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2>Certifications</h2>
        <button onClick={handleAdd} className="btn-add">+ Add Certification</button>
      </div>

      {certifications.length === 0 ? (
        <div className="empty-state">
          <p>No certifications added yet. Click "Add Certification" to get started.</p>
        </div>
      ) : (
        certifications.map((cert, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <h3>Certification #{index + 1}</h3>
              <button onClick={() => handleRemove(index)} className="btn-remove">Remove</button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Certification Name *</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder="Certification Name"
                />
              </div>
              <div className="form-group">
                <label>Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                  placeholder="Issuing Organization"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => handleChange(index, 'date', e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="form-group">
                <label>Verification Link</label>
                <input
                  type="url"
                  value={cert.link}
                  onChange={(e) => handleChange(index, 'link', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Certifications;


