import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Clock, Target, Database, Cpu, CheckCircle2,
  Code2, Layers, Zap, Home, FolderGit2, Moon, Sun, Trophy,
  Star, Flame, Gem, Shield, Award, Play, Check, AlertCircle,
  Copy, ChevronRight, ChevronDown, Lock, Unlock, Sparkles,
  RotateCcw, ArrowRight
} from 'lucide-react';

// ============================================
// GAMIFICATION SYSTEM
// ============================================

const ACHIEVEMENTS = [
  { id: 'first_step', name: 'First Steps', icon: Play, desc: 'Start your RAG journey', xp: 50, color: '#10b981' },
  { id: 'setup_master', name: 'Setup Master', icon: Terminal, desc: 'Complete environment setup', xp: 100, color: '#06b6d4' },
  { id: 'knowledge_builder', name: 'Knowledge Architect', icon: Database, desc: 'Build your first knowledge base', xp: 150, color: '#7c3aed' },
  { id: 'api_wizard', name: 'API Wizard', icon: Zap, desc: 'Create working API endpoint', xp: 200, color: '#f59e0b' },
  { id: 'quiz_genius', name: 'Quiz Genius', icon: Star, desc: 'Perfect quiz score', xp: 100, color: '#db2777' },
  { id: 'secret_agent', name: 'Secret Agent', icon: Shield, desc: 'Complete secret mission', xp: 300, color: '#db2777', locked: true },
  { id: 'rag_master', name: 'RAG Master', icon: Trophy, desc: 'Complete all levels', xp: 500, color: '#ffd700', locked: true },
];

const LEVELS = [
  { level: 1, title: 'Novice', xpRequired: 0, color: '#6b7280', nextAt: 200 },
  { level: 2, title: 'Apprentice', xpRequired: 200, color: '#10b981', nextAt: 500 },
  { level: 3, title: 'Developer', xpRequired: 500, color: '#06b6d4', nextAt: 1000 },
  { level: 4, title: 'Architect', xpRequired: 1000, color: '#7c3aed', nextAt: 2000 },
  { level: 5, title: 'RAG Master', xpRequired: 2000, color: '#db2777', nextAt: null },
];

// Mascot assignments - using available images with themed roles
const MASCOTS = {
  fox: './mascot/Screenshot 2026-04-20 065237.png',        // Setup/Guide
  robot: './mascot/Screenshot 2026-04-20 065134.png',      // Builder (API)
  scientist: './mascot/Screenshot 2026-04-20 065214.png',  // Data/Knowledge
  astronaut: './mascot/Screenshot 2026-04-20 065145.png', // Explorer/Cleanup
  warrior: './mascot/Screenshot 2026-04-20 065155.png',    // Challenge
  ninja: './mascot/Screenshot 2026-04-20 065249.png',      // Secret Mission
  wizard: './mascot/Screenshot 2026-04-20 065223.png',      // Master/Complete
  king: './mascot/Screenshot 2026-04-20 065445.png',        // Achievement
};

// ============================================
// PROJECT CONTENT
// ============================================

const PROJECT_DATA = {
  stats: [
    { label: 'SUPPORT', value: 'EASY', color: '#10b981', icon: Target },
    { label: 'TIME', value: '45 MIN', color: '#06b6d4', icon: Clock },
    { label: 'LEVELS', value: '4 STEPS', color: '#db2777', icon: Layers },
    { label: 'XP', value: '+500', color: '#f59e0b', icon: Star },
  ],

  steps: [
    {
      id: 1,
      title: 'THE SETUP',
      subtitle: 'Environment Configuration',
      description: 'Get your development environment ready. Install tools, set up Python, and see RAG in action!',
      mascot: 'fox',
      mascotName: 'Setup Fox',
      xp: 100,
      sections: [
        {
          title: '🎯 Verify Ollama',
          content: 'Ensure Ollama is running on your machine before we begin.',
          commands: [
            { label: 'Mac/Linux', cmd: 'curl http://localhost:11434' },
            { label: 'Windows', cmd: 'curl.exe http://localhost:11434' },
            { label: 'Expected', cmd: '"Ollama is running"', success: true },
          ],
          tip: 'If Ollama is not running, start it with: ollama serve',
          checkpoint: 'Ollama running?',
        },
        {
          title: '🤖 Pull Chat Model',
          content: 'Download qwen2.5:0.5b (~400MB, 500M parameters) - runs entirely local!',
          commands: [{ label: 'Terminal', cmd: 'ollama pull qwen2.5:0.5b' }],
          checkpoint: 'Model downloaded?',
        },
        {
          title: '✨ Manual RAG Demo',
          content: 'Experience RAG before building it!',
          steps: [
            'Run: ollama run qwen2.5:0.5b',
            'Ask: "What is ASIA?" → AI cannot answer',
            'Provide context + question → AI answers!',
            'Type /bye to exit',
          ],
          insight: '🧠 RAG = Retrieval + Augmentation + Generation',
          code: `>>> What is ASIA?
"I don't have information..."

>>> Based on: "ASIA is an association founded
    by ESSAI students in 2025..."
"ASIA is an association focused on statistics
 and AI, founded by students at ESSAI..."`,
          checkpoint: 'Demo completed?',
          xpReward: 25,
        },
        {
          title: '📁 Project Directory',
          commands: [{ label: 'Create', cmd: 'mkdir ~/rag-api && cd ~/rag-api' }],
          checkpoint: 'Directory created?',
        },
        {
          title: '🐍 Virtual Environment',
          content: 'Create isolated Python environment:',
          commands: [
            { label: 'Create', cmd: 'python3 -m venv venv' },
            { label: 'Activate (Mac/Linux)', cmd: 'source venv/bin/activate' },
            { label: 'Activate (Windows)', cmd: 'venv\\Scripts\\activate' },
            { label: 'Success', cmd: '(venv) prefix appears', success: true },
          ],
          checkpoint: 'Environment active?',
        },
        {
          title: '📦 Install Dependencies',
          commands: [{ label: 'pip', cmd: 'pip install fastapi uvicorn chromadb ollama' }],
          packages: [
            { name: 'FastAPI', desc: 'Web framework + Swagger UI' },
            { name: 'Uvicorn', desc: 'ASGI server' },
            { name: 'ChromaDB', desc: 'Vector database' },
            { name: 'Ollama', desc: 'LLM client' },
          ],
          checkpoint: 'Packages installed?',
        },
        {
          title: '🔤 Embedding Model',
          content: 'Download nomic-embed-text (~274MB) for semantic search:',
          commands: [{ label: 'Pull', cmd: 'ollama pull nomic-embed-text' }],
          checkpoint: 'Embedding model ready?',
        },
        {
          title: '✅ Verify Setup',
          commands: [{ label: 'Check', cmd: 'ollama list' }],
          expected: ['qwen2.5:0.5b', 'nomic-embed-text'],
          checkpoint: 'Both models listed?',
          xpReward: 50,
        },
      ],
    },
    {
      id: 2,
      title: 'THE KNOWLEDGE BASE',
      subtitle: 'Building the RAG Vault',
      description: 'Create embeddings - mathematical fingerprints for semantic search!',
      mascot: 'scientist',
      mascotName: 'Data Fox',
      xp: 150,
      sections: [
        {
          title: '📝 asia_profile.txt',
          content: 'Create comprehensive ASIA document:',
          code: `ASIA (Association de la Statistique et de
l'Intelligence Artificielle) was founded in 2025
by students of ESSAI in Tunis, Tunisia.

MISSION:
Build a thriving community for learning,
connecting, and building in statistics,
data science, and AI.

ORGANIZATION:
• Pôle Formation - Training & GitHub repo
• Pôle Communication - Outreach
• Pôle Events - Workshops & competitions
• EMLC collaboration

ACTIVITIES:
Events, workshops, and competitions for members
to grow skills and expand professional network.`,
          action: 'Save to ~/rag-api/asia_profile.txt',
          checkpoint: 'File created?',
        },
        {
          title: '🐍 build_knowledge_base.py',
          content: 'Transform text into searchable embeddings:',
          code: `import chromadb
from chromadb.utils.embedding_functions import (
    OllamaEmbeddingFunction,
)

# 1. Read document
with open("asia_profile.txt", "r") as f:
    text = f.read()

# 2. Split into chunks
chunks = [c.strip() for c in text.split("\\n\\n") if c.strip()]
print(f"Loaded {len(chunks)} chunks")

# 3. Initialize ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")

# 4. Configure embeddings
ef = OllamaEmbeddingFunction(
    model_name="nomic-embed-text",
    url="http://localhost:11434",
)

# 5. Create collection
collection = client.get_or_create_collection(
    name="asia_knowledge",
    embedding_function=ef,
)

# 6. Add documents with metadata
collection.add(
    ids=[f"chunk{i}" for i in range(len(chunks))],
    documents=chunks,
    metadatas=[{"source": "asia_profile",
                "chunk_index": i}
               for i in range(len(chunks))],
)

print("✅ ASIA Knowledge Base built!"))`,
          checkpoint: 'Script created?',
        },
        {
          title: '🚀 Run Builder',
          commands: [{ label: 'Execute', cmd: 'python build_knowledge_base.py' }],
          expectedOutput: '✅ ASIA Knowledge Base built!',
          checkpoint: 'Knowledge base ready?',
          xpReward: 75,
        },
        {
          title: '💡 Understanding Embeddings',
          content: 'Embeddings are mathematical fingerprints:',
          visual: {
            from: 'Text: "ASIA was founded..."',
            to: 'Vector: [0.23, -0.45, ...] (768 numbers)',
          },
          insight: 'Similar concepts = similar vectors = semantic search!',
        },
      ],
    },
    {
      id: 3,
      title: 'THE API',
      subtitle: 'Build the Intelligence',
      description: 'Build the /ask endpoint powering RETRIEVE → AUGMENT → GENERATE!',
      mascot: 'robot',
      mascotName: 'Builder Bot',
      xp: 200,
      sections: [
        {
          title: '🎯 RAG Pipeline',
          content: 'Three-stage architecture:',
          pipeline: [
            { stage: 'RETRIEVE', desc: 'Query ChromaDB for chunks', color: '#06b6d4' },
            { stage: 'AUGMENT', desc: 'Build prompt with context', color: '#db2777' },
            { stage: 'GENERATE', desc: 'Call LLM for answer', color: '#10b981' },
          ],
        },
        {
          title: '🐍 main.py',
          content: 'Complete FastAPI application:',
          code: `from fastapi import FastAPI
import ollama
import chromadb
from chromadb.utils.embedding_functions import (
    OllamaEmbeddingFunction,
)

app = FastAPI(title="ASIA RAG Brain")

# Initialize
client = chromadb.PersistentClient(path="./chroma_db")
ef = OllamaEmbeddingFunction(
    model_name="nomic-embed-text",
    url="http://localhost:11434",
)
collection = client.get_or_create_collection(
    name="asia_knowledge",
    embedding_function=ef,
)

@app.get("/ask")
def ask(question: str):
    # 1. RETRIEVE
    results = collection.query(
        query_texts=[question],
        n_results=2,
    )
    context = "\\n\\n".join(results["documents"][0])

    # 2. AUGMENT
    prompt = f"""Use context to answer.
If no relevant info, say so.

Context:\n{context}

Question: {question}"""

    # 3. GENERATE
    response = ollama.chat(
        model="qwen2.5:0.5b",
        messages=[{"role": "user", "content": prompt}],
    )

    return {
        "question": question,
        "answer": response["message"]["content"],
        "context_used": results["documents"][0],
    }`,
          checkpoint: 'API code written?',
        },
        {
          title: '🚀 Start Server',
          commands: [{ label: 'Launch', cmd: 'uvicorn main:app --reload' }],
          expectedOutput: 'Running on http://127.0.0.1:8000',
          checkpoint: 'Server running?',
        },
        {
          title: '🎮 Test with Swagger',
          content: 'Interactive testing at /docs',
          steps: [
            'Open: http://127.0.0.1:8000/docs',
            'Click GET /ask → Try it out',
            'Enter: "What is ASIA?"',
            'Click Execute!',
          ],
          expectedResponse: `{
  "question": "What is ASIA?",
  "answer": "ASIA is an association...",
  "context_used": ["chunk1", "chunk2"]
}`,
          checkpoint: 'API working?',
          xpReward: 100,
        },
        {
          title: '🧪 More Questions',
          content: 'Try these:',
          examples: [
            'What is ASIA?',
            'When was ASIA founded?',
            'What are the poles?',
            'What is the mission?',
          ],
        },
      ],
    },
    {
      id: 4,
      title: 'CLEAN UP',
      subtitle: 'Wrap Up & Next Steps',
      description: 'Properly shutdown and prepare for future enhancements.',
      mascot: 'astronaut',
      mascotName: 'Explorer Fox',
      xp: 50,
      sections: [
        {
          title: '🛑 Stop Server',
          commands: [{ label: 'In terminal', cmd: 'Ctrl+C' }],
        },
        {
          title: '🚪 Deactivate',
          commands: [{ label: 'Terminal', cmd: 'deactivate' }],
        },
        {
          title: '💾 Project Structure',
          tree: `rag-api/
├── venv/              # Environment
├── chroma_db/         # Vector DB
├── asia_profile.txt   # Knowledge source
├── build_knowledge_base.py
└── main.py           # API`,
          note: 'Keep for Part 3: Docker!',
        },
      ],
    },
  ],

  secretMission: {
    title: 'Extend into Multi-Pole Directory',
    description: 'Add POST /documents so each ASIA pole can submit documents. Filter /ask by pole.',
    xp: 300,
    mascot: 'ninja',
    mascotName: 'Ninja Architect',
    requirements: [
      { icon: Code2, text: 'POST /documents endpoint', color: '#7c3aed' },
      { icon: Database, text: 'Per-pole storage', color: '#06b6d4' },
      { icon: Zap, text: 'Filter by pole', color: '#10b981' },
      { icon: CheckCircle2, text: 'Test 2+ poles', color: '#db2777' },
    ],
    hint: 'Add "pole" field to metadata. Filter queries.',
  },

  quiz: {
    questions: [
      { id: 1, q: 'What does RAG stand for?', options: ['Random Access Generation', 'Retrieval Augmented Generation', 'Recursive AI Gateway', 'Real-time Analytics Graph'], correct: 1, xp: 20 },
      { id: 2, q: 'What are embeddings?', options: ['Encrypted files', 'Mathematical fingerprints', 'Database tables', 'API endpoints'], correct: 1, xp: 20 },
      { id: 3, q: 'Correct RAG order?', options: ['GENERATE→RETRIEVE→AUGMENT', 'AUGMENT→RETRIEVE→GENERATE', 'RETRIEVE→AUGMENT→GENERATE', 'RETRIEVE→GENERATE→AUGMENT'], correct: 2, xp: 30 },
      { id: 4, q: 'Embedding model?', options: ['qwen2.5:0.5b', 'llama3.2', 'nomic-embed-text', 'gpt-4'], correct: 2, xp: 30 },
    ],
  },
};

// ============================================
// HELPER COMPONENTS
// ============================================

const XpBar = ({ current, max, level }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-1">
      <Star size={16} className="text-yellow-500" />
      <span className="terminal-font text-sm font-bold">Lvl {level}</span>
    </div>
    <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border-2 border-black">
      <motion.div
        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((current / max) * 100, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
    <span className="terminal-font text-xs">{current}/{max} XP</span>
  </div>
);

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
    </button>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const ProjectApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(3);
  const [xp, setXp] = useState(50);
  const [level, setLevel] = useState(1);
  const [streak] = useState(1);
  const [achievements, setAchievements] = useState(['first_step']);
  const [completedSteps, setCompletedSteps] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [showAchievements, setShowAchievements] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  // Calculate level
  useEffect(() => {
    const newLevel = LEVELS.findIndex((l, i) => {
      const next = LEVELS[i + 1];
      return !next || xp < next.xpRequired;
    }) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      showNotification(`Level Up! You're now ${LEVELS[newLevel - 1].title}!`);
    }
  }, [xp, level]);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addXp = (amount, reason) => {
    setXp(p => p + amount);
    showNotification(`+${amount} XP${reason ? ` for ${reason}` : ''}`);
  };

  const unlockAchievement = (id) => {
    if (!achievements.includes(id)) {
      setAchievements(p => [...p, id]);
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (a) addXp(a.xp, a.name);
    }
  };

  const toggleSection = (stepId, sectionIdx) => {
    const key = `${stepId}-${sectionIdx}`;
    setExpandedSections(p => ({ ...p, [key]: !p[key] }));
  };

  const completeCheckpoint = (stepId, sectionIdx, xpReward) => {
    const key = `${stepId}-${sectionIdx}`;
    if (!completedSteps[key]) {
      setCompletedSteps(p => ({ ...p, [key]: true }));
      if (xpReward) addXp(xpReward, 'completing checkpoint');
    }
  };

  const handleQuizAnswer = (qId, idx) => {
    if (quizSubmitted) return;
    setQuizAnswers(p => ({ ...p, [qId]: idx }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    let earned = 0;
    let correct = 0;
    PROJECT_DATA.quiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        earned += q.xp;
        correct++;
      }
    });
    addXp(earned, 'quiz completion');
    if (correct === PROJECT_DATA.quiz.questions.length) {
      unlockAchievement('quiz_genius');
    }
  };

  const getQuizScore = () => PROJECT_DATA.quiz.questions.filter(q => quizAnswers[q.id] === q.correct).length;

  const currentLevelData = LEVELS[level - 1];
  const nextLevelData = LEVELS[level];
  const xpForNext = nextLevelData ? nextLevelData.xpRequired - currentLevelData.xpRequired : 100;
  const currentLevelXp = xp - currentLevelData.xpRequired;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const totalSections = PROJECT_DATA.steps.reduce((acc, s) => acc + s.sections.length, 0);
  const completedCount = Object.keys(completedSteps).length;
  const progressPercent = (completedCount / totalSections) * 100;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode text-white' : 'text-black'}`} style={{ background: darkMode ? '#0a0a0f' : '#f0f0f5' }}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{
        backgroundImage: `radial-gradient(circle, ${darkMode ? '#7c3aed' : '#000'} 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        opacity: darkMode ? 0.1 : 0.08
      }} />

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 px-6 py-3 bg-purple-600 text-white border-2 border-black"
            style={{ boxShadow: '4px 4px 0px 0px #000' }}
          >
            <span className="pixel-font text-sm">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b-2 border-black`} style={{ boxShadow: '0 4px 0 0 rgba(0,0,0,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="./logo/Gemini_Generated_Image_2mill52mill52mil.png" alt="ASIA" className="w-10 h-10 object-contain border-2 border-black" style={{ boxShadow: '2px 2px 0 0 #000' }} />
            <div>
              <span className="terminal-font text-xs text-gray-500">CHECK_PROJECT://</span>
              <span className="pixel-font text-xl ml-2">ASIA</span>
            </div>
          </a>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-black">
              <Flame size={16} className="text-orange-500" />
              <span className="terminal-font text-xs">{streak} day streak</span>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 border-2 border-black bg-gray-100 dark:bg-gray-800" style={{ boxShadow: '3px 3px 0 0 #000' }}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="/" className="flex items-center gap-2 px-4 py-2 brutal-btn bg-white dark:bg-gray-800">
              <Home size={16} />
              <span className="terminal-font text-xs">START</span>
            </a>
          </div>
        </div>

        <div className="bg-gray-900 px-4 py-1 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between terminal-font text-xs">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-green-500">● ONLINE</span>
              <span className="text-gray-400">|</span>
              <span className="text-yellow-400">LEVEL: {level} {currentLevelData?.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400">ACTION</span>
              <span className="text-cyan-400">DATA</span>
              <span className="text-pink-400">ALERT</span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* Gamification Panel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-black p-4`} style={{ boxShadow: '6px 6px 0px 0px #000' }}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <XpBar current={currentLevelXp} max={xpForNext} level={level} />
                <div className="mt-2 flex items-center justify-between text-xs terminal-font text-gray-500">
                  <span>Progress to {nextLevelData?.title || 'Max'}</span>
                  <span>{Math.round((currentLevelXp / xpForNext) * 100)}%</span>
                </div>
              </div>
              <button onClick={() => setShowAchievements(!showAchievements)} className="flex items-center gap-2 px-4 py-2 brutal-btn bg-purple-500 text-white">
                <Trophy size={16} />
                <span className="terminal-font text-xs">{achievements.length}/{ACHIEVEMENTS.length}</span>
              </button>
            </div>

            <AnimatePresence>
              {showAchievements && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {ACHIEVEMENTS.map(a => {
                      const unlocked = achievements.includes(a.id);
                      return (
                        <div key={a.id} className={`p-3 border-2 border-black ${unlocked ? darkMode ? 'bg-gray-700' : 'bg-white' : 'bg-gray-100 dark:bg-gray-900 opacity-50'}`} style={{ boxShadow: unlocked ? '4px 4px 0px 0px #000' : 'none' }}>
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded ${unlocked ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-200 dark:bg-gray-700'}`}>
                              <a.icon size={18} className={unlocked ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'} />
                            </div>
                            <div>
                              <div className="pixel-font text-xs">{a.name}</div>
                              <div className="terminal-font text-xs text-gray-500">+{a.xp} XP</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="terminal-font text-xs text-gray-500">PROJECT://</span>
                <h1 className="pixel-font-lg text-4xl md:text-5xl">ASIA RAG BRAIN</h1>
              </div>
              <div className="terminal-font text-sm text-gray-600">
                <span className="text-purple-600">●</span> RAG_API_BUILD_GUIDE
                <span className="mx-2">|</span>
                STATUS: <span className="text-green-500">START</span>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-black`} style={{ boxShadow: '6px 6px 0px 0px #000' }}>
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 border-b-2 border-black">
                <h2 className="pixel-font-lg text-xl text-white">MISSION: BUILD THE ASIA RAG BRAIN</h2>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`relative p-4 border-2 border-black ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                      <img src={MASCOTS.wizard} alt="Guide Wizard" className="w-32 h-32 object-contain" style={{ imageRendering: 'pixelated' }} />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-green-500 border-2 border-black">
                        <span className="terminal-font text-xs text-white">Guide Wizard</span>
                      </div>
                    </div>
                    <p className="mt-6 text-center terminal-font text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                      Build a Retrieval-Augmented Generation API that lets ASIA answer questions from your knowledge base.
                    </p>
                    <a href="https://github.com/khalil-akremi/asia-rag-brain" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 px-4 py-2 brutal-btn bg-gray-800 text-white">
                      <FolderGit2 size={16} />
                      <span className="terminal-font text-xs">khalil-akremi/asia-rag-brain</span>
                    </a>
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {PROJECT_DATA.stats.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className={`p-3 text-center border-2 border-black ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                          <stat.icon size={20} className="mx-auto mb-1" style={{ color: stat.color }} />
                          <div className="terminal-font text-xs text-gray-500">{stat.label}</div>
                          <div className="pixel-font text-lg" style={{ color: stat.color }}>{stat.value}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-black p-4 overflow-x-auto border-2 border-purple-500">
                      <pre className="text-xs text-purple-400 whitespace-pre">{`    ┌─────────────┐
    │  QUESTION   │
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   RETRIEVE  │ ← Query ChromaDB
    │   (Chroma)  │   Get 2 chunks
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   AUGMENT   │ ← Build prompt
    │   (Context) │   with context
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   GENERATE  │ ← ollama.chat()
    │   (qwen2.5) │   with qwen2.5:0.5b
    └──────┬──────┘
           ▼
    ┌─────────────┐
    │   ANSWER    │
    └─────────────┘`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className={`mb-8 p-4 border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '4px 4px 0px 0px #000' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="terminal-font text-sm">Tutorial Progress</span>
              <span className="terminal-font text-sm text-green-600">{completedCount}/{totalSections} sections</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-black overflow-hidden">
              <motion.div className="h-full bg-green-500" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Difficulty Selector */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="flex flex-col md:flex-row gap-2">
              {[
                { level: 1, title: 'On Your Own 🫤', sub: 'NO TOUCH / HARD', color: '#ef4444' },
                { level: 2, title: 'Some Guidance', sub: 'MEDIUM', color: '#f59e0b' },
                { level: 3, title: 'Step-by-Step', sub: 'EASY', color: '#10b981' },
              ].map((d) => (
                <motion.button key={d.level} onClick={() => setDifficultyLevel(d.level)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`flex-1 p-4 border-2 border-black text-left ${difficultyLevel === d.level ? 'text-white' : darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ background: difficultyLevel === d.level ? d.color : undefined, boxShadow: '4px 4px 0px 0px #000' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="pixel-font text-sm block">{d.title}</span>
                      <span className="terminal-font text-xs opacity-80">{d.sub}</span>
                    </div>
                    {difficultyLevel === d.level && <Check size={16} />}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Level Content */}
          <div className="space-y-8">
            {difficultyLevel === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className={`p-6 border-2 border-red-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #ef4444' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-red-500 text-white border-2 border-black"><span className="terminal-font text-xs">Figure-It-Out Project</span></div>
                  </div>
                  <p className="terminal-font text-sm text-gray-600 dark:text-gray-400">Challenge yourself with minimal guidance.</p>
                  <p className="terminal-font text-xs text-gray-500 mt-2">No detailed tasks. Refer to other versions for help.</p>
                </div>
                {PROJECT_DATA.steps.map((step, i) => (
                  <div key={i} className={`border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #000' }}>
                    <div className="p-4 flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 border-2 border-black flex items-center justify-center">
                        <img src={MASCOTS[step.mascot]} alt={step.mascotName} className="w-12 h-12 object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 bg-red-500 text-white text-center text-sm border border-black">{step.id}</span>
                          <h3 className="pixel-font text-lg">{step.title}</h3>
                        </div>
                        <p className="terminal-font text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {difficultyLevel === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className={`p-6 border-2 border-amber-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #f59e0b' }}>
                  <div className="px-3 py-1 bg-amber-500 text-white border-2 border-black inline-block mb-4"><span className="terminal-font text-xs">Guided Project</span></div>
                  <p className="terminal-font text-sm text-gray-600 dark:text-gray-400">Clear goals with structured milestones.</p>
                </div>
                {PROJECT_DATA.steps.map((step, i) => (
                  <div key={i} className={`border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #000' }}>
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 border-2 border-black flex items-center justify-center">
                          <img src={MASCOTS[step.mascot]} alt={step.mascotName} className="w-12 h-12 object-contain" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 bg-amber-500 text-white text-center text-sm border border-black">{step.id}</span>
                            <h3 className="pixel-font text-lg">{step.title}</h3>
                          </div>
                          <span className="terminal-font text-xs text-cyan-600">{step.subtitle}</span>
                          <div className="mt-3 space-y-2">
                            {step.sections.slice(0, 3).map((section, j) => (
                              <div key={j} className="flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <span className="text-amber-500">▸</span>
                                <span className="terminal-font text-sm">{section.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {difficultyLevel === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className={`p-6 border-2 border-green-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #10b981' }}>
                  <div className="px-3 py-1 bg-green-500 text-white border-2 border-black inline-block mb-4"><span className="terminal-font text-xs">Interactive Tutorial</span></div>
                  <p className="terminal-font text-sm text-gray-600 dark:text-gray-400">Fully guided with detailed instructions, code, and checkpoints!</p>
                </div>

                {PROJECT_DATA.steps.map((step, stepIdx) => (
                  <div key={stepIdx} className={`border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #000' }}>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 border-b-2 border-black">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center" style={{ boxShadow: '3px 3px 0 0 #000' }}>
                          <span className="pixel-font text-xl text-green-600">#{step.id}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="pixel-font-lg text-xl text-white">{step.title}</h3>
                          <span className="terminal-font text-sm text-green-100">{step.subtitle}</span>
                        </div>
                        <div className="text-right">
                          <img src={MASCOTS[step.mascot]} alt={step.mascotName} className="w-10 h-10 object-contain inline-block" />
                          <span className="terminal-font text-xs text-white bg-black/20 px-2 py-1 ml-2">+{step.xp} XP</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="terminal-font text-sm text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>

                      {step.sections.map((section, secIdx) => {
                        const isExpanded = expandedSections[`${step.id}-${secIdx}`];
                        const isCompleted = completedSteps[`${step.id}-${secIdx}`];
                        return (
                          <div key={secIdx} className={`mb-4 border-2 border-black ${isCompleted ? 'bg-green-50 dark:bg-green-900/20' : darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                            <button onClick={() => toggleSection(step.id, secIdx)} className="w-full p-4 flex items-center justify-between text-left">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 flex items-center justify-center border-2 border-black ${isCompleted ? 'bg-green-500' : 'bg-yellow-400'}`}>
                                  {isCompleted ? <Check size={16} className="text-white" /> : <span className="pixel-font text-sm">{secIdx + 1}</span>}
                                </div>
                                <span className="pixel-font text-sm">{section.title}</span>
                              </div>
                              <ChevronRight size={20} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t-2 border-black overflow-hidden">
                                  <div className="p-4">
                                    {section.content && <p className="terminal-font text-sm text-gray-600 dark:text-gray-400 mb-4">{section.content}</p>}

                                    {section.steps && (
                                      <div className="space-y-2 mb-4">
                                        {section.steps.map((s, i) => (
                                          <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                                            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full">{i + 1}</span>
                                            <span className="terminal-font text-xs">{s}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {section.commands && (
                                      <div className="relative mb-4">
                                        <div className="bg-black p-3 overflow-x-auto border-2 border-green-500">
                                          {section.commands.map((cmd, i) => (
                                            <div key={i} className="mb-1 last:mb-0">
                                              <span className="terminal-font text-xs text-gray-400">{cmd.label}: </span>
                                              <span className={`terminal-font text-xs ${cmd.success ? 'text-green-400 font-bold' : 'text-green-300'}`}>{cmd.cmd}</span>
                                            </div>
                                          ))}
                                        </div>
                                        <CopyButton text={section.commands.map(c => c.cmd).join('\n')} />
                                      </div>
                                    )}

                                    {section.code && (
                                      <div className="relative mb-4">
                                        <div className="bg-gray-900 p-4 overflow-x-auto border-2 border-cyan-500">
                                          <pre className="text-xs text-gray-300"><code>{section.code}</code></pre>
                                        </div>
                                        <CopyButton text={section.code} />
                                      </div>
                                    )}

                                    {section.packages && (
                                      <div className="grid grid-cols-2 gap-2 mb-4">
                                        {section.packages.map((pkg, i) => (
                                          <div key={i} className="p-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded">
                                            <div className="font-bold text-xs text-purple-700 dark:text-purple-300">{pkg.name}</div>
                                            <div className="terminal-font text-xs text-gray-600 dark:text-gray-400">{pkg.desc}</div>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {section.pipeline && (
                                      <div className="flex flex-wrap items-center gap-2 mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
                                        {section.pipeline.map((p, i) => (
                                          <div key={i} className="flex items-center gap-2">
                                            <div className="px-3 py-1 text-white font-bold text-sm border-2 border-black" style={{ background: p.color, boxShadow: '2px 2px 0 0 #000' }}>
                                              {p.stage}
                                            </div>
                                            <span className="terminal-font text-xs text-gray-600">{p.desc}</span>
                                            {i < section.pipeline.length - 1 && <ArrowRight size={16} className="text-gray-400" />}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {section.checkpoint && (
                                      <div className={`mt-4 p-4 border-2 border-black ${isCompleted ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            {isCompleted ? <Check size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-yellow-600" />}
                                            <span className="terminal-font text-sm">{section.checkpoint}</span>
                                          </div>
                                          {!isCompleted && (
                                            <button onClick={() => completeCheckpoint(step.id, secIdx, section.xpReward)} className="px-4 py-2 brutal-btn bg-green-500 text-white text-xs">
                                              Confirm ✓
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {section.tip && (
                                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500">
                                        <span className="terminal-font text-xs text-blue-700 dark:text-blue-300">💡 {section.tip}</span>
                                      </div>
                                    )}

                                    {section.insight && (
                                      <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500">
                                        <span className="terminal-font text-xs text-purple-700 dark:text-purple-300">🧠 {section.insight}</span>
                                      </div>
                                    )}

                                    {section.visual && (
                                      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded border-2 border-dashed border-gray-400">
                                        <div className="text-center">
                                          <div className="terminal-font text-sm text-gray-600 dark:text-gray-400">{section.visual.from}</div>
                                          <div className="my-2 text-2xl">↓</div>
                                          <div className="terminal-font text-sm text-purple-600">{section.visual.to}</div>
                                        </div>
                                      </div>
                                    )}

                                    {section.tree && (
                                      <div className="mt-4 p-4 bg-gray-900 rounded border-2 border-green-500">
                                        <pre className="text-xs text-green-400">{section.tree}</pre>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Secret Mission */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-pink-500" style={{ boxShadow: '6px 6px 0px 0px #db2777' }}>
              <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" animate={{ top: ['0%', '100%'] }} transition={{ duration: 3, repeat: Infinity }} />
              <div className="absolute top-4 right-4 px-3 py-1 bg-pink-500 text-white border-2 border-black">
                <span className="terminal-font text-xs">💎 SECRET MISSION</span>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <img src={MASCOTS[PROJECT_DATA.secretMission.mascot]} alt={PROJECT_DATA.secretMission.mascotName} className="w-24 h-24 object-contain" />
                      <div className="text-center mt-2">
                        <span className="terminal-font text-xs text-white bg-pink-600 px-2 py-1">{PROJECT_DATA.secretMission.mascotName}</span>
                      </div>
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="pixel-font-lg text-xl text-pink-400 mb-2">{PROJECT_DATA.secretMission.title}</h3>
                    <p className="terminal-font text-sm text-gray-300 mb-4">{PROJECT_DATA.secretMission.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {PROJECT_DATA.secretMission.requirements.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-black/30 border border-gray-600">
                          <r.icon size={16} style={{ color: r.color }} />
                          <span className="terminal-font text-xs text-gray-300">{r.text}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => unlockAchievement('secret_agent')} className="px-4 py-2 brutal-btn bg-pink-500 text-white">
                      <span className="pixel-font text-sm">{'>'} ACCEPT_MISSION</span>
                    </button>
                    <span className="ml-4 terminal-font text-xs text-pink-400">+{PROJECT_DATA.secretMission.xp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quiz Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
            <div className="text-center mb-6">
              <h3 className="pixel-font-lg text-2xl">TEST YOUR KNOWLEDGE</h3>
              <p className="terminal-font text-sm text-gray-600">Prove you mastered the RAG Brain!</p>
            </div>
            <button onClick={() => setShowQuiz(!showQuiz)} className="w-full md:w-auto mx-auto block px-6 py-3 brutal-btn bg-cyan-500 text-white">
              <span className="pixel-font text-base">{showQuiz ? 'CLOSE QUIZ' : '> START_QUIZ'}</span>
            </button>

            <AnimatePresence>
              {showQuiz && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-6 overflow-hidden">
                  <div className={`border-2 border-black ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #000' }}>
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 border-b-2 border-black">
                      <div className="flex items-center gap-2">
                        <Layers size={20} className="text-white" />
                        <span className="pixel-font text-lg text-white">RAG FUNDAMENTALS</span>
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      {PROJECT_DATA.quiz.questions.map((q) => (
                        <div key={q.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                          <p className="terminal-font text-sm mb-3">
                            <span className="text-purple-600">{q.id}.</span> {q.q}
                            <span className="ml-2 text-xs text-gray-500">({q.xp} XP)</span>
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {q.options.map((opt, i) => (
                              <button
                                key={i}
                                onClick={() => handleQuizAnswer(q.id, i)}
                                disabled={quizSubmitted}
                                className={`px-4 py-3 text-left terminal-font text-sm border-2 ${
                                  quizSubmitted && i === q.correct ? 'bg-green-500 text-white border-green-600' :
                                  quizSubmitted && quizAnswers[q.id] === i && i !== q.correct ? 'bg-red-500 text-white border-red-600' :
                                  quizAnswers[q.id] === i ? 'bg-purple-500 text-white border-purple-600' :
                                  darkMode ? 'bg-gray-700 border-black hover:bg-gray-600' : 'bg-white border-black hover:bg-gray-50'
                                }`}
                                style={{ boxShadow: quizAnswers[q.id] === i ? '3px 3px 0px 0px #000' : '4px 4px 0px 0px #000' }}
                              >
                                {quizSubmitted && i === q.correct && '✓ '}
                                {quizSubmitted && quizAnswers[q.id] === i && i !== q.correct && '✗ '}
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      {!quizSubmitted && (
                        <button
                          onClick={submitQuiz}
                          disabled={Object.keys(quizAnswers).length < PROJECT_DATA.quiz.questions.length}
                          className="w-full px-6 py-3 brutal-btn bg-green-500 text-white disabled:bg-gray-400"
                        >
                          <span className="pixel-font text-base">
                            {Object.keys(quizAnswers).length === PROJECT_DATA.quiz.questions.length ? '> SUBMIT_ANSWERS' : `ANSWER ALL (${Object.keys(quizAnswers).length}/${PROJECT_DATA.quiz.questions.length})`}
                          </span>
                        </button>
                      )}

                      {quizSubmitted && (
                        <div className={`p-6 text-center border-2 border-black ${getQuizScore() === PROJECT_DATA.quiz.questions.length ? 'bg-green-500' : 'bg-gray-100 dark:bg-gray-700'}`} style={{ boxShadow: '4px 4px 0px 0px #000' }}>
                          <div className="pixel-font text-3xl mb-2">
                            {getQuizScore() === PROJECT_DATA.quiz.questions.length ? '🎉 PERFECT!' : `${getQuizScore()}/${PROJECT_DATA.quiz.questions.length} CORRECT`}
                          </div>
                          <p className={`terminal-font text-sm ${getQuizScore() === PROJECT_DATA.quiz.questions.length ? 'text-white' : 'text-gray-600'}`}>
                            {getQuizScore() === PROJECT_DATA.quiz.questions.length ? 'You mastered RAG fundamentals!' : 'Keep learning! Review the material.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mission Accomplished */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
            <div className={`border-2 border-green-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: '6px 6px 0px 0px #10b981' }}>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 border-b-2 border-black">
                <h3 className="pixel-font-lg text-xl text-white">🎉 That's a Wrap!</h3>
              </div>
              <div className="p-6">
                <p className="terminal-font text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You built a fully functional ASIA RAG Brain running entirely on your local machine!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { icon: Target, text: 'Perform RAG manually and with code', color: '#7c3aed' },
                    { icon: Database, text: 'Create knowledge base with ChromaDB', color: '#06b6d4' },
                    { icon: Zap, text: 'Build REST API with FastAPI', color: '#f59e0b' },
                    { icon: Cpu, text: 'Use nomic-embed-text and qwen2.5:0.5b', color: '#10b981' },
                    { icon: Layers, text: 'Extend to multi-pole directory', color: '#db2777' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 border-2 border-black ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <item.icon size={20} style={{ color: item.color }} />
                      <span className="terminal-font text-xs">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="terminal-font text-sm text-gray-600">
              <span className="text-purple-600">SYS:</span> PROJECTS_LOADED
              <span className="mx-2">|</span>
              <span className="text-cyan-600">GUIDE:</span> ASIA_RAG_BRAIN_COMPLETE
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectApp;
