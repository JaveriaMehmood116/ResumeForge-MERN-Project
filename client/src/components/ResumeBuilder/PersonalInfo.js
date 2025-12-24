import React from 'react';
import './FormSection.css';

const PersonalInfo = ({ personalInfo, updateResume }) => {
  const handleChange = (e) => {
    updateResume('personalInfo', {
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-section">
      <h2>Personal Information</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            placeholder="John"
          />
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            placeholder="Doe"
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="john.doe@email.com"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="form-group full-width">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            placeholder="City, State, Country"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            name="github"
            value={personalInfo.github}
            onChange={handleChange}
            placeholder="https://github.com/johndoe"
          />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            placeholder="https://johndoe.com"
          />
        </div>
        <div className="form-group full-width">
          <label>Professional Summary</label>
          <textarea
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder="Write a brief summary of your professional background and key strengths..."
            rows="6"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;


