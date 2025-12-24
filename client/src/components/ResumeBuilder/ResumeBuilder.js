import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Certifications from './Certifications';
import ResumePreview from './ResumePreview';
import './ResumeBuilder.css';

const ResumeBuilder = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState({
    userId: user.id,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    template: 'modern'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const location = useLocation();

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  // If the URL contains a hash of #preview, switch to the preview tab
  useEffect(() => {
    if (location.hash === '#preview') {
      setActiveSection('preview');
    }
  }, [location.hash]);

  const fetchResume = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/resumes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResume(response.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
      alert('Failed to load resume');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (id) {
        await axios.put(`/api/resumes/${id}`, resume, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const response = await axios.post('/api/resumes', resume, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate(`/builder/${response.data._id}`);
      }
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const updateResume = (section, data) => {
    setResume(prev => ({
      ...prev,
      [section]: data
    }));
  };

  if (loading) {
    return <div className="loading">Loading resume...</div>;
  }

  return (
    <div className="resume-builder">
      <header className="builder-header">
        <div className="header-content">
          <h1>Resume Builder</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/dashboard')} className="btn-secondary">
              Back to Dashboard
            </button>
            <button onClick={handleSave} disabled={saving} className="btn-primary">
              {saving ? 'Saving...' : 'Save Resume'}
            </button>
          </div>
        </div>
      </header>

      <div className="builder-container">
        <div className="builder-sidebar">
          <nav className="section-nav">
            <button
              className={activeSection === 'personal' ? 'active' : ''}
              onClick={() => setActiveSection('personal')}
            >
              Personal Info
            </button>
            <button
              className={activeSection === 'experience' ? 'active' : ''}
              onClick={() => setActiveSection('experience')}
            >
              Experience
            </button>
            <button
              className={activeSection === 'education' ? 'active' : ''}
              onClick={() => setActiveSection('education')}
            >
              Education
            </button>
            <button
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={() => setActiveSection('skills')}
            >
              Skills
            </button>
            <button
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={() => setActiveSection('projects')}
            >
              Projects
            </button>
            <button
              className={activeSection === 'certifications' ? 'active' : ''}
              onClick={() => setActiveSection('certifications')}
            >
              Certifications
            </button>
            <button
              className={activeSection === 'preview' ? 'active' : ''}
              onClick={() => setActiveSection('preview')}
            >
              Preview
            </button>
          </nav>
        </div>

        <div className="builder-content">
          {activeSection === 'personal' && (
            <PersonalInfo
              personalInfo={resume.personalInfo}
              updateResume={updateResume}
            />
          )}
          {activeSection === 'experience' && (
            <Experience
              experience={resume.experience}
              updateResume={updateResume}
            />
          )}
          {activeSection === 'education' && (
            <Education
              education={resume.education}
              updateResume={updateResume}
            />
          )}
          {activeSection === 'skills' && (
            <Skills
              skills={resume.skills}
              updateResume={updateResume}
            />
          )}
          {activeSection === 'projects' && (
            <Projects
              projects={resume.projects}
              updateResume={updateResume}
            />
          )}
          {activeSection === 'certifications' && (
            <Certifications
              certifications={resume.certifications}
              updateResume={updateResume}
            />
          )}
          {activeSection === 'preview' && (
            <ResumePreview resume={resume} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;


