import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get(`/api/resumes/user/${user.id}`);
      setResumes(response.data);
      if (response.data?.length && !selectedResumeId) {
        setSelectedResumeId(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/builder');
  };

  const handleEdit = (id) => {
    navigate(`/builder/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/api/resumes/${id}`);
        fetchResumes();
      } catch (error) {
        console.error('Error deleting resume:', error);
        alert('Failed to delete resume');
      }
    }
  };

  const selectedResume = resumes.find((r) => r._id === selectedResumeId) || resumes[0];

  const getCompletion = (resume) => {
    if (!resume) return 0;
    const checks = [
      resume.personalInfo?.firstName && resume.personalInfo?.lastName && resume.personalInfo?.email,
      resume.experience && resume.experience.length > 0,
      resume.education && resume.education.length > 0,
      resume.skills && resume.skills.length > 0,
      resume.projects && resume.projects.length > 0,
      resume.certifications && resume.certifications.length > 0,
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  };

  const completion = getCompletion(selectedResume);

  const resumeLabel = (resume) => {
    if (!resume) return 'Untitled';
    const name = `${resume.personalInfo?.firstName || ''} ${resume.personalInfo?.lastName || ''}`.trim();
    return name || 'Untitled Resume';
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon"><span className="brand-doc" /></div>
            <div className="brand-text">Resume<span>Forge</span></div>
          </div>

          <nav className="nav-links">
            <button className="nav-link active" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/builder')}>Resume Builder</button>
          </nav>

          <div className="header-actions">
            <div className="user-chip">
              <div className="avatar">{user.username?.[0]?.toUpperCase() || 'U'}</div>
              <span className="username">{user.username}</span>
            </div>
            <button onClick={onLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {loading ? (
          <div className="loading">Loading resumes...</div>
        ) : resumes.length === 0 ? (
          <div className="empty-state">
            <p>You don't have any resumes yet.</p>
            <button onClick={handleCreateNew} className="btn-create">
              Create Your First Resume
            </button>
          </div>
        ) : (
          <>
            <section className="hero-row">
              <div>
                <p className="eyebrow">Welcome back, {user.username}</p>
                <h2>Your resume workspace</h2>
                <p className="muted">Continue editing, check progress, or start a new resume.</p>
              </div>
              <div className="hero-actions">
                <button className="btn-create" onClick={handleCreateNew}>+ Create New Resume</button>
              </div>
            </section>

            <section className="top-panels">
              <div className="resume-panel">
                <div className="panel-head">
                  <div>
                    <p className="eyebrow">My Resume</p>
                    <h2>{selectedResume.personalInfo.firstName} {selectedResume.personalInfo.lastName}</h2>
                    <p className="muted">{selectedResume.personalInfo.email || 'No email provided'}</p>
                  </div>
                  <button className="icon-btn" title="Edit" onClick={() => handleEdit(selectedResume._id)}>
                    <span role="img" aria-label="doc">📄</span>
                  </button>
                </div>

                <div className="panel-body">
                  <div className="actions-row">
                    <button
                      className="btn-ghost"
                      onClick={() => selectedResume && handleEdit(selectedResume._id)}
                    >
                      Edit Resume
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={() => selectedResume && navigate(`/builder/${selectedResume._id}#preview`)}
                    >
                      Download PDF
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => selectedResume && handleDelete(selectedResume._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="progress-panel">
                <div className="select-row">
                  <p className="eyebrow">Resume Completion</p>
                  <select
                    className="resume-select"
                    value={selectedResumeId || selectedResume?._id}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                  >
                    {resumes.map((r) => (
                      <option key={r._id} value={r._id}>{resumeLabel(r)}</option>
                    ))}
                  </select>
                </div>
                <div className="progress-row">
                  <span className="muted">Progress</span>
                  <span className="muted strong">{completion}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${completion}%` }} />
                </div>

                <ul className="checklist">
                  <li className={selectedResume.personalInfo?.firstName && selectedResume.personalInfo?.lastName && selectedResume.personalInfo?.email ? 'done' : ''}>Personal Info</li>
                  <li className={(selectedResume.experience || []).length ? 'done' : ''}>Experience</li>
                  <li className={(selectedResume.education || []).length ? 'done' : ''}>Education</li>
                  <li className={(selectedResume.skills || []).length ? 'done' : ''}>Skills</li>
                  <li className={(selectedResume.projects || []).length ? 'done' : ''}>Projects</li>
                  <li className={(selectedResume.certifications || []).length ? 'done' : ''}>Certifications</li>
                </ul>

                <button className="btn-primary w-full" onClick={() => handleEdit(selectedResume._id)}>
                  Complete Your Resume
                </button>
              </div>
            </section>

            {resumes.length > 1 && (
              <section className="resume-list">
                <div className="section-head">
                  <h3>All Resumes</h3>
                  <button className="btn-ghost" onClick={handleCreateNew}>+ New</button>
                </div>
                <div className="resumes-grid">
                  {resumes.map((resume) => (
                    <div key={resume._id} className="resume-card">
                      <div className="resume-card-header">
                        <h3>
                          {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                          {resume._id === selectedResume?._id && <span className="pill">Viewing</span>}
                        </h3>
                        <span className="resume-date">
                          {new Date(resume.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="resume-card-content">
                        <p className="resume-email">{resume.personalInfo.email || 'No email provided'}</p>
                        <p className="resume-summary">
                          {resume.personalInfo.summary || 'No summary provided'}
                        </p>
                      </div>
                      <div className="resume-card-actions">
                        <button onClick={() => handleEdit(resume._id)} className="btn-edit">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(resume._id)} className="btn-delete">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="tips-section">
              <div className="section-head tips-head">
                <h3>Resume Tips</h3>
                <p className="muted">Quick tips to improve your resume</p>
              </div>

              <div className="tips-grid">
                <div className="tip-card">
                  <h4>Use Action Words</h4>
                  <p>Start bullet points with strong action verbs like “Led”, “Developed”, or “Increased”.</p>
                </div>
                <div className="tip-card">
                  <h4>Quantify Achievements</h4>
                  <p>Include numbers and percentages to demonstrate your impact.</p>
                </div>
                <div className="tip-card">
                  <h4>Keep It Concise</h4>
                  <p>Aim for a one-page resume unless you have 10+ years of experience.</p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


