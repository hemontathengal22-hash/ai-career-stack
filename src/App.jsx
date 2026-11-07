import React, { useState, useMemo } from 'react';
import './index.css';

const ROADMAP_DATA = {
  ai_engineer: {
    title: "AI Engineer Path",
    description: "Master modern Large Language Models, RAG architectures, and agentic workflows.",
    modules: [
      { id: "m1", title: "Month 1: Fundamentals", tasks: ["Python Advanced & JS ES6+", "Data Structures & API Integration", "Git Workflow & Environment Management"] },
      { id: "m2", title: "Month 2: Backend & AI APIs", tasks: ["Node.js / Express & FastAPI", "OpenAI & Google Gemini SDKs", "Structured Output Parsing & JSON Schema"] },
      { id: "m3", title: "Month 3: Vector DBs & RAG", tasks: ["Vector Embeddings & Similarity Search", "Pinecone / Qdrant Integration", "LangChain & LlamaIndex Basics"] },
      { id: "m4", title: "Month 4: Autonomous Agents & Deployment", tasks: ["Tool Calling & Multi-Agent Systems", "Docker Containerization", "Vercel / Cloud Provider Deployment"] }
    ]
  },
  data_scientist: {
    title: "Data Scientist Path",
    description: "Focus on statistical modeling, machine learning algorithms, and data insights.",
    modules: [
      { id: "ds1", title: "Month 1: Data Foundations", tasks: ["Python for Data Analysis (Pandas/NumPy)", "Exploratory Data Analysis (EDA)", "SQL Queries & Schema Design"] },
      { id: "ds2", title: "Month 2: Machine Learning Core", tasks: ["Supervised & Unsupervised Learning", "Scikit-Learn Model Pipelines", "Model Evaluation & Hyperparameter Tuning"] },
      { id: "ds3", title: "Month 3: Deep Learning & NLP", tasks: ["PyTorch Fundamentals", "Neural Network Architectures", "Text Classification & Transformers"] },
      { id: "ds4", title: "Month 4: Production ML", tasks: ["MLflow Experiment Tracking", "Model API Deployment", "Feature Stores & Monitoring"] }
    ]
  },
  prompt_engineer: {
    title: "AI Prompt Engineer Path",
    description: "Optimize context windows, system prompts, and AI evaluation frameworks.",
    modules: [
      { id: "pe1", title: "Month 1: Prompt Fundamentals", tasks: ["Zero-shot, Few-shot Prompting", "Chain-of-Thought (CoT) Prompting", "System Persona Architecture"] },
      { id: "pe2", title: "Month 2: Advanced Techniques", tasks: ["Directional Stimulus Prompting", "Tree of Thoughts (ToT) Frameworks", "Prompt Guardrails & Red Teaming"] },
      { id: "pe3", title: "Month 3: Evaluation & Automation", tasks: ["Automated Benchmark Construction", "LLM-as-a-Judge Evaluation Frameworks", "Synthesizing Dataset Generators"] },
      { id: "pe4", title: "Month 4: Production Integration", tasks: ["LangSmith / Tracing Tools", "Cost Optimization & Token Budgeting", "Enterprise Workflow Automation"] }
    ]
  }
};

const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "AI Document Summarizer & Q&A Hub",
    category: "RAG & LLM",
    difficulty: "Intermediate",
    tags: ["Gemini API", "React", "Node.js", "Vector DB"],
    description: "Build an application that ingests long PDF documents, creates embeddings, and provides an interactive chat interface for contextual inquiry.",
    architecture: [
      "Convert uploaded PDF pages into text chunks.",
      "Generate embeddings using Gemini Text Embedding models.",
      "Store vectors in a local or cloud vector database.",
      "Perform similarity retrieval on user query to generate dynamic answers."
    ],
    repoTemplate: "https://github.com/topics/rag-demo"
  },
  {
    id: 2,
    title: "Autonomous Code Review Assistant",
    category: "Developer Tools",
    difficulty: "Advanced",
    tags: ["GitHub Actions", "OpenAI API", "Python", "CLI"],
    description: "An automated GitHub Action that triggers on Pull Requests to perform static code analysis, security auditing, and automated refactoring suggestions.",
    architecture: [
      "Listen for GitHub webhook pull_request events.",
      "Diff updated file code against the target branch.",
      "Submit code context to LLM with structured safety prompts.",
      "Post line-by-line review comments directly to GitHub API."
    ],
    repoTemplate: "https://github.com/topics/code-reviewer"
  },
  {
    id: 3,
    title: "Student Smart Schedule & Skill Assistant",
    category: "Full Stack AI",
    difficulty: "Beginner",
    tags: ["React", "LocalStorage", "Gemini API"],
    description: "A lightweight web app helping students structure daily study hours and automatically generate quiz cards from lecture notes.",
    architecture: [
      "Input text notes into local storage database.",
      "Invoke AI completion endpoint to split text into Q&A flashcard pairs.",
      "Track flashcard review accuracy using spaced repetition formulas."
    ],
    repoTemplate: "https://github.com/topics/flashcard-app"
  }
];

const INTERVIEW_QUESTIONS = [
  {
    id: "q1",
    role: "AI Engineer",
    topic: "RAG Architecture",
    question: "What is the key difference between Standard Prompting and Retrieval-Augmented Generation (RAG)? When would you choose one over the other?",
    sampleAnswer: "Standard prompting relies purely on knowledge parametric weights learned during initial training. RAG connects the language model to external non-parametric vector databases, retrieving relevant context documents at query time. Choose RAG when dealing with private datasets, real-time data, or when strict attribution is required."
  },
  {
    id: "q2",
    role: "AI Engineer",
    topic: "Vector Embeddings",
    question: "How does vector similarity search work, and why is Cosine Similarity preferred over Euclidean distance for high-dimensional embeddings?",
    sampleAnswer: "Vector similarity search measures closeness between high-dimensional text representations. Cosine similarity evaluates the angle between vectors regardless of magnitude, making it invariant to text length differences, whereas Euclidean distance is sensitive to spatial length expansion."
  },
  {
    id: "q3",
    role: "Prompt Engineer",
    topic: "Hallucination Mitigation",
    question: "What techniques can be embedded into system instructions to minimize model hallucinations?",
    sampleAnswer: "Effective techniques include enforcing strict grounding instructions (e.g., 'Answer ONLY using provided text'), requiring explicit source citations, employing step-by-step reasoning steps before final output, and introducing fallbacks like 'I don't have enough context'."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('skills');
  const [selectedRole, setSelectedRole] = useState('ai_engineer');
  const [completedTasks, setCompletedTasks] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [targetJobRole, setTargetJobRole] = useState('AI Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState(null);

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const currentPathData = ROADMAP_DATA[selectedRole];
  const pathStats = useMemo(() => {
    let total = 0;
    let done = 0;
    currentPathData.modules.forEach((mod) => {
      mod.tasks.forEach((t, idx) => {
        total += 1;
        if (completedTasks[`${mod.id}-${idx}`]) {
          done += 1;
        }
      });
    });
    const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percentage };
  }, [currentPathData, completedTasks]);

  const handleAnalyzeResume = () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume summary text before requesting analysis.");
      return;
    }
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      const textLower = resumeText.toLowerCase();
      const checkSkills = ["python", "react", "javascript", "node", "api", "git", "vector", "docker", "rag", "sql", "gemini", "langchain"];
      const foundSkills = checkSkills.filter((s) => textLower.includes(s));
      const missing = checkSkills.filter((s) => !textLower.includes(s)).slice(0, 4);

      let baseScore = Math.min(40 + foundSkills.length * 7, 94);
      if (resumeText.length < 150) baseScore = Math.max(baseScore - 20, 30);

      setAnalysisResult({
        matchPercentage: baseScore,
        detectedSkills: foundSkills.map((s) => s.toUpperCase()),
        missingSkills: missing.map((s) => s.toUpperCase()),
        strengths: [
          foundSkills.length > 3 ? "Demonstrates actionable core software skills." : "Clear foundational presentation.",
          "Clean readable structural format."
        ],
        actionableTips: [
          `Add explicit project mentions covering missing competencies: ${missing.slice(0, 3).join(', ')}.`,
          "Quantify achievements using concrete impact metrics (e.g., 'Improved API latency by 25%').",
          "Ensure your GitHub link contains documented production-ready repositories."
        ]
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) {
      alert("Please type your answer prior to requesting evaluation.");
      return;
    }
    setIsEvaluating(true);
    setFeedbackResult(null);

    setTimeout(() => {
      const length = userAnswer.trim().length;
      let score = Math.min(50 + Math.floor(length / 5), 92);
      
      setFeedbackResult({
        score: score,
        strengths: length > 100 ? "Solid detailed technical explanation with clear reasoning." : "Concise direct answer style.",
        improvements: length < 100 ? "Expand your explanation with real-world deployment examples and edge-case handling." : "Refine syntax terms for technical precision.",
        exemplar: INTERVIEW_QUESTIONS[currentQuestionIdx].sampleAnswer
      });
      setIsEvaluating(false);
    }, 1000);
  };

  const filteredProjects = useMemo(() => {
    if (selectedDifficulty === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="badge-pill">v2.4 Student Edition</div>
        <h1>AI Career Stack 🚀</h1>
        <p>Architecting Smart Learning Paths, Portfolio Projects & ATS Optimization for Engineers</p>
      </header>

      <nav className="tab-navigation" aria-label="Main Navigation">
        <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>🎯 Skills & Roadmap</button>
        <button className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('portfolio')}>💻 Portfolio Hub</button>
        <button className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => setActiveTab('resume')}>📄 ATS Resume Matcher</button>
        <button className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')}>🤖 AI Interview Coach</button>
      </nav>

      <main className="content-card">
        {activeTab === 'skills' && (
          <section className="tab-pane">
            <div className="section-header">
              <h2>Target Learning Curriculum</h2>
              <div className="role-selector">
                <label htmlFor="role-select">Select Career Vector: </label>
                <select id="role-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="custom-select">
                  <option value="ai_engineer">AI Engineer</option>
                  <option value="data_scientist">Data Scientist</option>
                  <option value="prompt_engineer">Prompt Engineer</option>
                </select>
              </div>
            </div>

            <p className="path-description">{currentPathData.description}</p>

            <div className="progress-card">
              <div className="progress-info">
                <span>Curriculum Mastery</span>
                <span><b>{pathStats.percentage}%</b> ({pathStats.done}/{pathStats.total} Tasks Completed)</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${pathStats.percentage}%` }}></div>
              </div>
            </div>

            <div className="modules-grid">
              {currentPathData.modules.map((module) => (
                <div key={module.id} className="module-card">
                  <h3>{module.title}</h3>
                  <ul className="task-list">
                    {module.tasks.map((task, idx) => {
                      const taskId = `${module.id}-${idx}`;
                      const isChecked = !!completedTasks[taskId];
                      return (
                        <li key={idx} className={`task-item ${isChecked ? 'completed' : ''}`}>
                          <label className="checkbox-label">
                            <input type="checkbox" checked={isChecked} onChange={() => toggleTask(taskId)} />
                            <span>{task}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'portfolio' && (
          <section className="tab-pane">
            <div className="section-header">
              <h2>Guided Portfolio Projects</h2>
              <div className="filter-group">
                <span>Filter Complexity: </span>
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                  <button key={diff} className={`filter-chip ${selectedDifficulty === diff ? 'active' : ''}`} onClick={() => setSelectedDifficulty(diff)}>
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-card-header">
                    <span className="project-category">{project.category}</span>
                    <span className={`difficulty-badge ${project.difficulty.toLowerCase()}`}>{project.difficulty}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="tag-cloud">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tech-tag">{tag}</span>
                    ))}
                  </div>

                  <button className="secondary-btn" onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
                    {expandedProject === project.id ? "Hide Blueprint ▲" : "View Architecture Blueprint ▼"}
                  </button>

                  {expandedProject === project.id && (
                    <div className="architecture-box">
                      <h4>System Execution Steps:</h4>
                      <ol>
                        {project.architecture.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                      <a href={project.repoTemplate} target="_blank" rel="noreferrer" className="external-link">Explore Starter Template on GitHub ↗</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'resume' && (
          <section className="tab-pane">
            <h2>AI Resume & ATS Score Analyzer</h2>
            <p className="sub-text">Evaluate your resume text against automated ATS filters to detect missing keywords and identify key strengths.</p>

            <div className="form-group">
              <label htmlFor="target-role-select">Target Industry Role:</label>
              <select id="target-role-select" value={targetJobRole} onChange={(e) => setTargetJobRole(e.target.value)} className="custom-select">
                <option value="AI Engineer">AI Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Prompt Engineer">Prompt Engineer</option>
                <option value="Full Stack Developer">Full Stack Software Developer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="resume-textarea">Paste Resume Text Summary:</label>
              <textarea id="resume-textarea" rows="6" value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste your professional summary, skills list, and project descriptions here..." className="custom-textarea" />
              <div className="character-count">Character Count: {resumeText.length}</div>
            </div>

            <button onClick={handleAnalyzeResume} disabled={isAnalyzing} className="primary-btn">
              {isAnalyzing ? "Analyzing Resume Context..." : "Run ATS Analysis"}
            </button>

            {analysisResult && (
              <div className="analysis-result-card">
                <div className="score-header">
                  <div className="score-badge-circle">
                    <span className="score-number">{analysisResult.matchPercentage}%</span>
                    <span className="score-label">Match Score</span>
                  </div>
                  <div>
                    <h3>ATS Target Alignment: {targetJobRole}</h3>
                    <p className="status-text">{analysisResult.matchPercentage >= 75 ? "High Compatibility: Your resume matches core industry criteria." : "Optimization Needed: Address the skill gaps below to pass ATS screeners."}</p>
                  </div>
                </div>

                <div className="result-section-grid">
                  <div className="result-block">
                    <h4>Identified Competencies</h4>
                    <div className="tag-cloud">
                      {analysisResult.detectedSkills.length > 0 ? (
                        analysisResult.detectedSkills.map((sk, i) => <span key={i} className="tech-tag success">{sk}</span>)
                      ) : (
                        <span className="muted-text">No explicit target keywords detected.</span>
                      )}
                    </div>
                  </div>

                  <div className="result-block">
                    <h4>Recommended Missing Skills</h4>
                    <div className="tag-cloud">
                      {analysisResult.missingSkills.map((sk, i) => <span key={i} className="tech-tag danger">{sk}</span>)}
                    </div>
                  </div>
                </div>

                <div className="tips-block">
                  <h4>Strategic Refinements:</h4>
                  <ul>
                    {analysisResult.actionableTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'interview' && (
          <section className="tab-pane">
            <h2>AI Technical Interview Coach</h2>
            <p className="sub-text">Simulate technical interviews with interactive scoring feedback and standard answer evaluations.</p>

            <div className="question-card">
              <div className="question-meta">
                <span className="question-role">Role: {INTERVIEW_QUESTIONS[currentQuestionIdx].role}</span>
                <span className="question-topic">Topic: {INTERVIEW_QUESTIONS[currentQuestionIdx].topic}</span>
              </div>
              <h3 className="question-text">Q: {INTERVIEW_QUESTIONS[currentQuestionIdx].question}</h3>
            </div>

            <div className="form-group">
              <label htmlFor="interview-answer">Your Answer Response:</label>
              <textarea id="interview-answer" rows="5" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Formulate your structured response here..." className="custom-textarea" />
            </div>

            <div className="button-row">
              <button onClick={handleEvaluateAnswer} disabled={isEvaluating} className="primary-btn">
                {isEvaluating ? "Evaluating Response..." : "Submit Answer for Feedback"}
              </button>

              <button onClick={() => {
                const nextIdx = (currentQuestionIdx + 1) % INTERVIEW_QUESTIONS.length;
                setCurrentQuestionIdx(nextIdx);
                setUserAnswer('');
                setFeedbackResult(null);
              }} className="secondary-btn">
                Next Question ➔
              </button>
            </div>

            {feedbackResult && (
              <div className="feedback-card">
                <div className="feedback-score-row">
                  <h3>Evaluation Score: <span className="highlight-text">{feedbackResult.score} / 100</span></h3>
                </div>
                <div className="feedback-detail">
                  <p><b>Strengths:</b> {feedbackResult.strengths}</p>
                  <p><b>Areas for Improvement:</b> {feedbackResult.improvements}</p>
                </div>
                <div className="exemplar-box">
                  <h4>Exemplar Answer Model:</h4>
                  <p>{feedbackResult.exemplar}</p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>AI Career Stack • Enterprise Portfolio Engine for Student Developers</p>
      </footer>
    </div>
  );
}
