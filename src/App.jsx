import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('skills');
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  // Dummy function for AI Resume analysis simulation
  const analyzeResume = () => {
    if (!resumeText) return alert("Pehle apna resume paste karein!");
    setAnalysisResult({
      matchPercentage: 85,
      missingSkills: ["LangChain", "Vector Databases", "Docker"],
      strengths: ["Good JavaScript/React basics", "Clear project layout"],
      actionableTips: ["Add an AI-integrated project to your GitHub", "Learn basic prompt engineering frameworks"]
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#4f46e5', margin: '0 0 10px 0' }}>AI Career Stack 🚀</h1>
        <p style={{ margin: 0, color: '#666' }}>Students ke liye Smart AI Career & Skills Hub</p>
      </header>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('skills')} style={tabStyle(activeTab === 'skills')}>🎯 Skills & Roadmap</button>
        <button onClick={() => setActiveTab('portfolio')} style={tabStyle(activeTab === 'portfolio')}>💻 Projects</button>
        <button onClick={() => setActiveTab('resume')} style={tabStyle(activeTab === 'resume')}>📄 AI Resume Matcher</button>
        <button onClick={() => setActiveTab('interview')} style={tabStyle(activeTab === 'interview')}>🤖 Interview Coach</button>
      </div>

      {/* Tab Content */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' }}>
        
        {activeTab === 'skills' && (
          <div>
            <h2>AI Engineer Learning Path</h2>
            <ul>
              <li><b>Month 1:</b> Python & JavaScript Fundamentals</li>
              <li><b>Month 2:</b> APIs, Node.js & Git/GitHub</li>
              <li><b>Month 3:</b> LLMs, Prompt Engineering & OpenAI/Gemini APIs</li>
              <li><b>Month 4:</b> RAG & Agentic Workflows</li>
            </ul>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <h2>Guided Portfolio Project Ideas</h2>
            <p><b>1. AI Summarizer Web App:</b> Build a tool that summarizes long PDF articles using Gemini API.</p>
            <p><b>2. Student Chatbot:</b> Train a custom support bot for college queries.</p>
          </div>
        )}

        {activeTab === 'resume' && (
          <div>
            <h2>AI Resume & ATS Matcher</h2>
            <p>Apna resume text yahan paste karein:</p>
            <textarea 
              rows="5" 
              value={resumeText} 
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume summary here..." 
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button onClick={analyzeResume} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
              Analyze Resume
            </button>

            {analysisResult && (
              <div style={{ marginTop: '15px', background: '#f0fdf4', padding: '10px', borderRadius: '5px', border: '1px solid #bbf7d0' }}>
                <p><b>Match Score:</b> {analysisResult.matchPercentage}%</p>
                <p><b>Missing Skills:</b> {analysisResult.missingSkills.join(', ')}</p>
                <p><b>Actionable Tips:</b></p>
                <ul>
                  {analysisResult.actionableTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'interview' && (
          <div>
            <h2>AI Interview Coach</h2>
            <p>Role-specific technical questions ki practice karein:</p>
            <p style={{ background: '#f3f4f6', padding: '10px', borderRadius: '5px' }}>
              <b>Q:</b> What is the difference between standard prompting and RAG (Retrieval-Augmented Generation)?
            </p>
            <button onClick={() => alert("Mock interview feature coming soon!")} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>
              Answer & Get AI Feedback
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const tabStyle = (isActive) => ({
  padding: '8px 14px',
  background: isActive ? '#4f46e5' : '#e5e7eb',
  color: isActive ? '#fff' : '#374151',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
});

export default App;

