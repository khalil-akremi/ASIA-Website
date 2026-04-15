import React from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  FolderGit2,
  Clock,
  Target,
  Database,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Zap,
  Users,
  ChevronDown,
  Home
} from 'lucide-react';

/**
 * ProjectApp - Standalone RAG API Guide Page
 * Neo-Brutalist design with ASIA identity
 */
const ProjectApp = () => {
  // Mission Stats
  const missionStats = [
    { label: 'DIFFICULTY', value: 'EASY', color: '#10b981', icon: Target },
    { label: 'TIME', value: '45 MIN', color: '#06b6d4', icon: Clock },
    { label: 'IDENTITY', value: 'CV & STATS', color: '#db2777', icon: Cpu },
  ];

  // Project Steps Data
  const projectSteps = [
    {
      id: 1,
      title: 'THE SETUP',
      subtitle: 'Environment Configuration',
      description: 'Install FastAPI and Ollama to begin building the ASIA Neural Network infrastructure.',
      mascot: 'Gemini_Generated_Image_czqkstczqkstczqk.png',
      mascotLabel: 'Researcher Fox',
      content: {
        commands: [
          '$ pip install fastapi uvicorn',
          '$ curl -fsSL https://ollama.com/install.sh | sh',
          '$ ollama pull llama3.2',
        ],
        explanation: 'The ASIA Neural Network requires a robust foundation. FastAPI handles API routing while Ollama provides local LLM inference.',
        demo: {
          title: 'THE ASIA OVERRIDE TEST',
          description: 'Manual RAG Demo - Inject context directly into prompts.',
          code: `# Manual context injection for ASIA Vault
context = "ASIA was founded in 2023..."

prompt = f"""
Use this context: {context}
Question: When was ASIA founded?
Answer: """`
        }
      }
    },
    {
      id: 2,
      title: 'THE KNOWLEDGE BASE',
      subtitle: 'Building the ASIA Vault',
      description: 'Create embeddings - mathematical fingerprints that allow the ASIA Vault to understand and retrieve information.',
      mascot: 'Gemini_Generated_Image_fukforfukforfukf.png',
      mascotLabel: 'Data Fox',
      content: {
        commands: [
          '$ python build_knowledge_base.py',
          '> Processing documents...',
          '> Generating embeddings...',
          '> Vector store created!',
        ],
        explanation: 'Embeddings are the MATHEMATICAL FINGERPRINTS of the ASIA Vault. They transform text into high-dimensional vectors for semantic search.',
        codeBlock: {
          title: 'build_knowledge_base.py',
          language: 'python',
          code: `import ollama
import numpy as np
from pathlib import Path

def build_asia_vault(docs_path: str):
    """
    Build the ASIA Neural Knowledge Base
    Transforms documents into vector embeddings
    """
    vault = []
    for doc in Path(docs_path).glob('*.txt'):
        text = doc.read_text()
        # Generate embedding via Ollama
        embedding = ollama.embeddings(
            model='nomic-embed-text',
            prompt=text
        )
        vault.append({
            'text': text,
            'vector': embedding['embedding'],
            'source': doc.name
        })
    return vault

# Initialize ASIA Vault
asia_vault = build_asia_vault('./asia_docs/')`
        }
      }
    },
    {
      id: 3,
      title: 'THE API',
      subtitle: '/ask Endpoint Logic',
      description: 'Build the intelligent /ask endpoint that powers the ASIA Pipeline: RETRIEVE -> AUGMENT -> GENERATE.',
      mascot: 'Gemini_Generated_Image_7wrcxb7wrcxb7wrc.png',
      mascotLabel: 'Builder Fox',
      content: {
        commands: [
          '$ uvicorn asia_api:app --reload',
          '> API running on http://localhost:8000',
          '> POST /ask endpoint ready',
        ],
        pipeline: ['RETRIEVE', 'AUGMENT', 'GENERATE'],
        explanation: 'The ASIA Pipeline processes queries through three stages: finding relevant context, augmenting prompts, and generating intelligent responses.',
        codeBlock: {
          title: 'asia_api.py',
          language: 'python',
          code: `from fastapi import FastAPI
from pydantic import BaseModel
import ollama

app = FastAPI(title="ASIA Neural API")

class Query(BaseModel):
    question: str

@app.post("/ask")
async def ask_asia(query: Query):
    """
    ASIA Pipeline: RETRIEVE -> AUGMENT -> GENERATE
    """
    # RETRIEVE: Find relevant context
    context = retrieve_from_vault(query.question)

    # AUGMENT: Build enhanced prompt
    prompt = f"""
    Context from ASIA Vault:
    {context}

    Question: {query.question}
    Answer concisely:
    """

    # GENERATE: LLM inference
    response = ollama.chat(
        model='llama3.2',
        messages=[{'role': 'user', 'content': prompt}]
    )

    return {"answer": response['message']['content']}`
        }
      }
    }
  ];

  // Quiz Questions
  const quizQuestions = [
    {
      id: 1,
      question: 'What does RAG stand for?',
      options: ['Random Access Generation', 'Retrieval Augmented Generation', 'Recursive AI Gateway', 'Real-time Analytics Graph'],
      correct: 1,
    },
    {
      id: 2,
      question: 'What are embeddings in the ASIA context?',
      options: ['Encrypted files', 'Mathematical fingerprints of text', 'Database tables', 'API endpoints'],
      correct: 1,
    },
    {
      id: 3,
      question: 'What is the correct ASIA Pipeline order?',
      options: ['GENERATE -> RETRIEVE -> AUGMENT', 'AUGMENT -> RETRIEVE -> GENERATE', 'RETRIEVE -> AUGMENT -> GENERATE', 'RETRIEVE -> GENERATE -> AUGMENT'],
      correct: 2,
    },
  ];

  const [quizAnswers, setQuizAnswers] = React.useState({});
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);
  const [visibleSteps, setVisibleSteps] = React.useState([]);

  // Handle scroll reveal for steps
  React.useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('[data-step]');
      const newVisibleSteps = [];

      stepElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const stepId = parseInt(el.getAttribute('data-step'));
        if (rect.top < window.innerHeight * 0.8) {
          newVisibleSteps.push(stepId);
        }
      });

      setVisibleSteps(newVisibleSteps);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle quiz answer selection
  const handleQuizAnswer = (questionId, optionIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Check if quiz is complete
  const isQuizComplete = quizQuestions.every(q => quizAnswers[q.id] !== undefined);

  // Get quiz results
  const getQuizResults = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen" style={{ background: '#f0f0f5' }}>
      {/* Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.08
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white"
        style={{
          borderWidth: '0 0 0.5px 0',
          borderColor: '#000',
          boxShadow: '0 4px 0 0 rgba(0,0,0,0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 md:gap-3">
            <img
              src="./logo/Gemini_Generated_Image_2mill52mill52mil.png"
              alt="ASIA Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
              style={{
                borderWidth: '0.5px',
                borderColor: '#000',
                boxShadow: '2px 2px 0 0 #000'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="flex items-center gap-1">
              <span className="terminal-font text-xs text-gray-500 hidden sm:block">SYS://</span>
              <span className="pixel-font text-lg md:text-xl text-black">ASIA</span>
            </div>
          </a>

          <a
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 brutal-btn bg-white text-black"
          >
            <Home size={16} />
            <span className="terminal-font text-xs md:text-sm">BACK_HOME</span>
          </a>
        </div>

        {/* Status Bar */}
        <div className="hidden md:block bg-gray-900 px-4 py-1">
          <div className="max-w-7xl mx-auto flex items-center justify-between terminal-font text-xs">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-green-500">● ONLINE</span>
            </div>
            <div className="flex items-center gap-4">
              <span style={{ color: '#7c3aed' }}>ACTION</span>
              <span style={{ color: '#06b6d4' }}>DATA</span>
              <span style={{ color: '#db2777' }}>ALERT</span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative pt-20 md:pt-24">
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            {/* ============ MISSION BRIEF ============ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16"
            >
              {/* Section Header */}
              <div className="text-center mb-8 md:mb-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="terminal-font text-xs text-gray-500">PROJECTS://</span>
                  <h2 className="pixel-font-lg text-3xl md:text-5xl text-black">CHECK_PROJECT</h2>
                </div>
                <div className="terminal-font text-sm text-gray-600">
                  <span style={{ color: '#7c3aed' }}>●</span> RAG_API_BUILD_GUIDE
                  <span className="mx-2" style={{ color: '#06b6d4' }}>|</span>
                  STATUS: <span style={{ color: '#10b981' }}>READY</span>
                </div>
              </div>

              {/* Mission Brief Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div
                  className="bg-white"
                  style={{
                    borderWidth: '3px',
                    borderColor: '#000',
                    boxShadow: '6px 6px 0px 0px #000',
                  }}
                >
                  {/* Header */}
                  <div
                    className="px-4 md:px-6 py-3 md:py-4 border-b-3 border-black"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                      borderBottom: '3px solid #000',
                    }}
                  >
                    <h3 className="pixel-font-lg text-xl md:text-2xl text-white">
                      MISSION: BUILD THE ASIA RAG BRAIN
                    </h3>
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Mascot Section */}
                      <div className="flex-shrink-0 flex flex-col items-center md:w-1/3">
                        <div
                          className="relative bg-gray-100 p-3"
                          style={{
                            borderWidth: '2px',
                            borderColor: '#000',
                            boxShadow: '4px 4px 0px 0px #000',
                          }}
                        >
                          <img
                            src={`./mascot/${projectSteps[0].mascot}`}
                            alt="Researcher Fox"
                            className="w-24 h-24 md:w-32 md:h-32 object-contain"
                            style={{ imageRendering: 'pixelated' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-purple-600 border-2 border-black"
                          >
                            <span className="terminal-font text-xs text-white whitespace-nowrap">
                              {projectSteps[0].mascotLabel}
                            </span>
                          </div>
                        </div>

                        {/* 30-second summary */}
                        <div className="mt-4 md:mt-6 text-center">
                          <span className="terminal-font text-xs text-gray-500">30-SEC SUMMARY:</span>
                          <p className="terminal-font text-sm text-black mt-1 max-w-xs">
                            Build a Retrieval Augmented Generation API that lets the ASIA Neural Network answer questions from your custom knowledge base.
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="flex-1">
                        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                          {missionStats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                              <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-100 p-3 md:p-4 text-center"
                                style={{
                                  borderWidth: '2px',
                                  borderColor: '#000',
                                  boxShadow: '4px 4px 0px 0px #000',
                                }}
                              >
                                <Icon size={18} className="mx-auto mb-1" style={{ color: stat.color }} />
                                <div className="terminal-font text-xs text-gray-500">{stat.label}</div>
                                <div className="pixel-font text-base md:text-lg" style={{ color: stat.color }}>
                                  {stat.value}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* ASCII Flowchart */}
                        <div className="bg-black p-3 md:p-4 overflow-x-auto" style={{ borderWidth: '2px', borderColor: '#7c3aed' }}>
                          <pre className="ascii-art text-xs md:text-sm whitespace-pre" style={{ color: '#7c3aed' }}>
{`    ┌─────────────┐
    │  QUESTION   │
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │ VECTOR      │  ← Semantic Search
    │ SEARCH      │     in ASIA Vault
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │    LLM      │  ← Context-Aware
    │ INFERENCE   │     Generation
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   ANSWER    │
    └─────────────┘`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ============ STEP-BY-STEP FLOW ============ */}
            <div className="space-y-8 md:space-y-12">
              {projectSteps.map((step, stepIndex) => (
                <motion.div
                  key={step.id}
                  data-step={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                      style={{
                        background: '#7c3aed',
                        borderWidth: '2px',
                        borderColor: '#000',
                        boxShadow: '3px 3px 0px 0px #000',
                      }}
                    >
                      <span className="pixel-font text-lg md:text-xl text-white">#{step.id}</span>
                    </div>
                    <div>
                      <h3 className="pixel-font text-xl md:text-2xl text-black">{step.title}</h3>
                      <span className="terminal-font text-xs" style={{ color: '#06b6d4' }}>
                        {step.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Step Content Card */}
                  <div
                    className="bg-white"
                    style={{
                      borderWidth: '3px',
                      borderColor: '#000',
                      boxShadow: '6px 6px 0px 0px #000',
                    }}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: Terminal/Code */}
                      <div className="flex-1 p-4 md:p-6">
                        {/* Description */}
                        <p className="terminal-font text-sm text-gray-600 mb-4">
                          {step.description}
                        </p>

                        {/* Terminal Window */}
                        <div className="terminal-window mb-4">
                          <div className="terminal-header px-3 md:px-4 py-2 flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-black" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
                            </div>
                            <span className="terminal-font text-xs text-purple-400 ml-2">
                              ~/asia/{step.id === 1 ? 'setup' : step.id === 2 ? 'knowledge' : 'api'}.exe
                            </span>
                          </div>

                          {/* Scanning Line Effect */}
                          <div className="relative overflow-hidden">
                            <motion.div
                              className="absolute left-0 right-0 h-0.5 z-10"
                              style={{
                                background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
                              }}
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            />

                            <div className="p-4 md:p-6 min-h-[120px] bg-black">
                              {step.content.commands.map((cmd, cmdIndex) => (
                                <motion.div
                                  key={cmdIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: cmdIndex * 0.1 }}
                                  className="terminal-font text-sm mb-2"
                                >
                                  <span style={{ color: cmd.startsWith('$') ? '#10b981' : '#06b6d4' }}>
                                    {cmd}
                                  </span>
                                </motion.div>
                              ))}

                              {/* Blinking Cursor */}
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="terminal-font text-lg"
                                style={{ color: '#7c3aed' }}
                              >
                                █
                              </motion.span>
                            </div>
                          </div>
                        </div>

                        {/* Code Block (Step 2 & 3) */}
                        {step.content.codeBlock && (
                          <div
                            className="bg-gray-900 overflow-x-auto"
                            style={{
                              borderWidth: '2px',
                              borderColor: '#06b6d4',
                            }}
                          >
                            <div
                              className="px-3 py-2 border-b flex items-center gap-2"
                              style={{
                                borderColor: '#06b6d4',
                                background: '#1a1a2e',
                              }}
                            >
                              <Code2 size={14} style={{ color: '#06b6d4' }} />
                              <span className="terminal-font text-xs" style={{ color: '#06b6d4' }}>
                                {step.content.codeBlock.title}
                              </span>
                            </div>
                            <pre className="p-4 text-xs md:text-sm overflow-x-auto" style={{ color: '#e5e7eb' }}>
                              <code>{step.content.codeBlock.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* Demo Section (Step 1) */}
                        {step.content.demo && (
                          <div className="mt-4">
                            <div
                              className="px-3 py-2 mb-2"
                              style={{
                                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
                                borderWidth: '2px',
                                borderColor: '#000',
                              }}
                            >
                              <span className="terminal-font text-sm text-white font-bold">
                                {step.content.demo.title}
                              </span>
                            </div>
                            <p className="terminal-font text-xs text-gray-600 mb-2">
                              {step.content.demo.description}
                            </p>
                            <div
                              className="bg-gray-900 p-4 overflow-x-auto"
                              style={{ borderWidth: '2px', borderColor: '#db2777' }}
                            >
                              <pre className="text-xs" style={{ color: '#e5e7eb' }}>
                                <code>{step.content.demo.code}</code>
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Pipeline (Step 3) */}
                        {step.content.pipeline && (
                          <div className="flex flex-wrap items-center gap-2 mt-4">
                            {step.content.pipeline.map((stage, pIndex) => (
                              <div key={stage} className="flex items-center gap-2">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="px-3 py-1.5"
                                  style={{
                                    background: pIndex === 0 ? '#06b6d4' : pIndex === 1 ? '#db2777' : '#10b981',
                                    borderWidth: '2px',
                                    borderColor: '#000',
                                    boxShadow: '3px 3px 0px 0px #000',
                                  }}
                                >
                                  <span className="terminal-font text-sm text-white font-bold">
                                    {stage}
                                  </span>
                                </motion.div>
                                {pIndex < 2 && (
                                  <ArrowRight size={16} style={{ color: '#7c3aed' }} />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Mascot */}
                      <div
                        className="lg:w-1/3 p-4 md:p-6 flex flex-col items-center justify-center"
                        style={{
                          background: 'linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 100%)',
                          borderLeft: '3px solid #000',
                        }}
                      >
                        <div className="relative">
                          <motion.img
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            src={`./mascot/${step.mascot}`}
                            alt={step.mascotLabel}
                            className="w-28 h-28 md:w-36 md:h-36 object-contain"
                            style={{ imageRendering: 'pixelated' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1"
                            style={{
                              background: '#7c3aed',
                              borderWidth: '2px',
                              borderColor: '#000',
                              boxShadow: '2px 2px 0px 0px #000',
                            }}
                          >
                            <span className="terminal-font text-xs text-white whitespace-nowrap">
                              {step.mascotLabel}
                            </span>
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="mt-8 text-center">
                          <span className="terminal-font text-xs text-gray-500">INSIGHT:</span>
                          <p className="terminal-font text-sm text-black mt-1 max-w-xs">
                            {step.content.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ============ QUIZ SECTION ============ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 md:mt-16"
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="terminal-font text-xs text-gray-500">QUIZ://</span>
                  <h3 className="pixel-font text-2xl md:text-3xl text-black">TEST_YOUR_KNOWLEDGE</h3>
                </div>
                <p className="terminal-font text-sm text-gray-600">
                  Prove you've mastered the ASIA RAG Brain build!
                </p>
              </div>

              {/* Quiz Toggle */}
              <motion.button
                onClick={() => setShowQuiz(!showQuiz)}
                whileHover={{ scale: 1.02, y: 2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto mx-auto block px-6 py-3 brutal-btn"
                style={{ background: '#7c3aed', color: 'white' }}
              >
                <span className="pixel-font text-base">
                  {showQuiz ? 'CLOSE QUIZ' : '> START_QUIZ'}
                </span>
              </motion.button>

              {/* Quiz Questions */}
              {showQuiz && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 overflow-hidden"
                >
                  <div
                    className="bg-white"
                    style={{
                      borderWidth: '3px',
                      borderColor: '#000',
                      boxShadow: '6px 6px 0px 0px #000',
                    }}
                  >
                    {/* Quiz Header */}
                    <div
                      className="px-4 py-3 border-b-3"
                      style={{
                        borderColor: '#000',
                        background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Layers size={18} className="text-white" />
                        <span className="pixel-font text-lg text-white">RAG FUNDAMENTALS</span>
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="p-4 md:p-6 space-y-6">
                      {quizQuestions.map((q, qIndex) => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: qIndex * 0.1 }}
                        >
                          <p className="terminal-font text-sm mb-3">
                            <span style={{ color: '#7c3aed' }}>{q.id}.</span> {q.question}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {q.options.map((option, oIndex) => (
                              <motion.button
                                key={oIndex}
                                onClick={() => handleQuizAnswer(q.id, oIndex)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={quizSubmitted}
                                className="px-4 py-2 text-left terminal-font text-sm transition-colors"
                                style={{
                                  borderWidth: '2px',
                                  borderColor: quizAnswers[q.id] === oIndex ? '#7c3aed' : '#000',
                                  background: quizSubmitted && oIndex === q.correct
                                    ? '#10b981'
                                    : quizAnswers[q.id] === oIndex
                                      ? '#7c3aed'
                                      : 'white',
                                  color: quizAnswers[q.id] === oIndex || (quizSubmitted && oIndex === q.correct)
                                    ? 'white'
                                    : 'black',
                                  boxShadow: quizAnswers[q.id] === oIndex ? '3px 3px 0px 0px #000' : '4px 4px 0px 0px #000',
                                }}
                              >
                                {quizSubmitted && oIndex === q.correct && '✓ '}
                                {quizSubmitted && quizAnswers[q.id] === oIndex && oIndex !== q.correct && '✗ '}
                                {option}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      ))}

                      {/* Submit Button */}
                      {!quizSubmitted && (
                        <motion.button
                          onClick={() => setQuizSubmitted(true)}
                          disabled={!isQuizComplete}
                          whileHover={{ scale: isQuizComplete ? 1.02 : 1 }}
                          whileTap={{ scale: isQuizComplete ? 0.98 : 1 }}
                          className="w-full mt-4 px-6 py-3 brutal-btn"
                          style={{
                            background: isQuizComplete ? '#10b981' : '#9ca3af',
                            color: 'white',
                            cursor: isQuizComplete ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <span className="pixel-font text-base">
                            {isQuizComplete ? '> SUBMIT_ANSWERS' : 'SELECT ALL OPTIONS'}
                          </span>
                        </motion.button>
                      )}

                      {/* Results */}
                      {quizSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-4 text-center"
                          style={{
                            background: getQuizResults() === quizQuestions.length ? '#10b981' : '#f3f4f6',
                            borderWidth: '2px',
                            borderColor: '#000',
                          }}
                        >
                          <div className="pixel-font text-2xl mb-2">
                            {getQuizResults() === quizQuestions.length ? (
                              <span style={{ color: 'white' }}>PERFECT SCORE!</span>
                            ) : (
                              <span style={{ color: '#7c3aed' }}>
                                {getQuizResults()}/{quizQuestions.length} CORRECT
                              </span>
                            )}
                          </div>
                          <p className="terminal-font text-sm" style={{ color: getQuizResults() === quizQuestions.length ? 'white' : '#6b7280' }}>
                            {getQuizResults() === quizQuestions.length
                              ? 'You\'ve mastered the ASIA RAG Brain fundamentals!'
                              : 'Keep learning! Review the steps above.'}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* ============ SECRET MISSION ============ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 md:mt-16"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  borderWidth: '3px',
                  borderColor: '#db2777',
                  boxShadow: '6px 6px 0px 0px #000',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                }}
              >
                {/* Secret Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1"
                  style={{
                    background: '#db2777',
                    borderWidth: '2px',
                    borderColor: '#000',
                    boxShadow: '2px 2px 0px 0px #000',
                  }}
                >
                  <span className="terminal-font text-xs text-white">SECRET MISSION</span>
                </div>

                {/* Scanning Line */}
                <motion.div
                  className="absolute left-0 right-0 h-1 z-10"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #db2777, transparent)',
                    boxShadow: '0 0 20px #db2777',
                  }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Mascot */}
                    <div className="flex-shrink-0 flex justify-center md:w-1/4">
                      <motion.div
                        animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <img
                          src="./mascot/Gemini_Generated_Image_u3whlxu3whlxu3wh.png"
                          alt="Communication Fox"
                          className="w-24 h-24 md:w-32 md:h-32 object-contain"
                          style={{ imageRendering: 'pixelated' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="text-center mt-2">
                          <span
                            className="terminal-font text-xs px-2 py-0.5"
                            style={{
                              background: '#db2777',
                              color: 'white',
                              borderWidth: '1px',
                              borderColor: '#000',
                            }}
                          >
                            Communication Fox
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="pixel-font text-xl md:text-2xl mb-3" style={{ color: '#db2777' }}>
                        MULTI-USER DIRECTORY
                      </h3>
                      <p className="terminal-font text-sm mb-4" style={{ color: '#9ca3af' }}>
                        Extend your RAG system to support multiple users with personalized knowledge bases.
                        Build community-driven intelligence where each member can query their own vault.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {[
                          { icon: Users, text: 'User Authentication', color: '#7c3aed' },
                          { icon: Database, text: 'Per-User Vaults', color: '#06b6d4' },
                          { icon: Zap, text: 'Fast Retrieval', color: '#10b981' },
                          { icon: CheckCircle2, text: 'Access Control', color: '#db2777' },
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.text}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 p-2"
                              style={{
                                borderWidth: '1px',
                                borderColor: '#333',
                                background: 'rgba(255,255,255,0.05)',
                              }}
                            >
                              <Icon size={16} style={{ color: item.color }} />
                              <span className="terminal-font text-xs" style={{ color: '#e5e7eb' }}>
                                {item.text}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, x: 2, y: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-4 py-2 brutal-btn"
                        style={{ background: '#db2777', color: 'white' }}
                      >
                        <span className="pixel-font text-sm">{'>'} ACCEPT_MISSION</span>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ============ SECTION FOOTER ============ */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 md:mt-12 text-center"
            >
              <div className="terminal-font text-sm text-gray-600">
                <span style={{ color: '#7c3aed' }}>SYS:</span> PROJECTS_LOADED
                <span className="mx-2">|</span>
                <span style={{ color: '#06b6d4' }}>GUIDE:</span> RAG_API_COMPLETE
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectApp;