import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './ResumePreview.css';

const ResumePreview = ({ resume }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume`,
  });

  return (
    <div className="preview-container">
      <div className="preview-actions">
        <button onClick={handlePrint} className="btn-print">Print / Save as PDF</button>
      </div>
      <div ref={componentRef} className="resume-preview">
        <div className="resume-header">
          <h1>
            {resume.personalInfo.firstName} {resume.personalInfo.lastName}
          </h1>
          <div className="contact-info">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.address && <span>{resume.personalInfo.address}</span>}
            {resume.personalInfo.linkedin && (
              <span>
                <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </span>
            )}
            {resume.personalInfo.github && (
              <span>
                <a href={resume.personalInfo.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </span>
            )}
            {resume.personalInfo.website && (
              <span>
                <a href={resume.personalInfo.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </span>
            )}
          </div>
        </div>

        {resume.personalInfo.summary && (
          <div className="resume-section">
            <h2>Professional Summary</h2>
            <p>{resume.personalInfo.summary}</p>
          </div>
        )}

        {resume.experience.length > 0 && (
          <div className="resume-section">
            <h2>Experience</h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="resume-item">
                <div className="item-header-preview">
                  <div>
                    <h3>{exp.position}</h3>
                    <span className="company">{exp.company}</span>
                  </div>
                  <span className="date">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </span>
                </div>
                {exp.description && <p className="item-description">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="item-list">
                    {exp.achievements.filter(a => a.trim()).map((ach, achIndex) => (
                      <li key={achIndex}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="resume-section">
            <h2>Education</h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="resume-item">
                <div className="item-header-preview">
                  <div>
                    <h3>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <span className="company">{edu.institution}</span>
                  </div>
                  <span className="date">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </span>
                </div>
                {edu.gpa && <p className="item-description">GPA: {edu.gpa}</p>}
                {edu.honors && edu.honors.length > 0 && (
                  <ul className="item-list">
                    {edu.honors.filter(h => h.trim()).map((honor, honorIndex) => (
                      <li key={honorIndex}>{honor}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.skills.length > 0 && (
          <div className="resume-section">
            <h2>Skills</h2>
            {resume.skills.map((skillCategory, index) => (
              <div key={index} className="skill-category">
                {skillCategory.category && <strong>{skillCategory.category}: </strong>}
                {skillCategory.items.filter(item => item.trim()).join(', ')}
              </div>
            ))}
          </div>
        )}

        {resume.projects.length > 0 && (
          <div className="resume-section">
            <h2>Projects</h2>
            {resume.projects.map((project, index) => (
              <div key={index} className="resume-item">
                <div className="item-header-preview">
                  <h3>{project.name}</h3>
                  <div className="project-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                {project.description && <p className="item-description">{project.description}</p>}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="technologies">
                    <strong>Technologies: </strong>
                    {project.technologies.filter(t => t.trim()).join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.certifications.length > 0 && (
          <div className="resume-section">
            <h2>Certifications</h2>
            {resume.certifications.map((cert, index) => (
              <div key={index} className="resume-item">
                <div className="item-header-preview">
                  <div>
                    <h3>{cert.name}</h3>
                    {cert.issuer && <span className="company">{cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="date">{cert.date}</span>}
                </div>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;


