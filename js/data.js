// ===== DATA MANAGEMENT FUNCTIONS =====
// This file handles all localStorage operations

// ===== TOPICS MANAGEMENT =====
function getTopicsList() {
    return {
        frontend: [
            'html-basics',
            'html-forms',
            'css-basics',
            'css-flexbox',
            'css-grid',
            'javascript-basics',
            'javascript-functions',
            'dom-manipulation',
            'events',
            'arrays-loops',
            'objects',
            'fetch-api',
            'local-storage',
            'form-validation',
            'responsive-design'
        ],
        backend: [
            'nodejs-basics',
            'npm-basics',
            'express-setup',
            'routing',
            'middleware',
            'rest-apis',
            'http-methods',
            'json',
            'database-basics',
            'crud-operations',
            'authentication-basics',
            'password-security',
            'error-handling',
            'api-testing',
            'deployment-basics'
        ],
        algorithms: [
            'big-o-notation',
            'arrays',
            'strings',
            'objects-hash-maps',
            'linked-lists',
            'stacks',
            'queues',
            'binary-search',
            'two-pointers',
            'sorting-basics',
            'recursion',
            'trees-basics',
            'tree-traversal',
            'dynamic-programming',
            'problem-solving-patterns'
        ]
    };
}

function getTopicDifficulty(topicId) {
    const difficulties = {
        'html-basics': 'Beginner', 'html-forms': 'Beginner', 'css-basics': 'Beginner',
        'css-flexbox': 'Intermediate', 'css-grid': 'Intermediate', 'javascript-basics': 'Beginner',
        'javascript-functions': 'Intermediate', 'dom-manipulation': 'Intermediate', 'events': 'Intermediate',
        'arrays-loops': 'Beginner', 'objects': 'Beginner', 'fetch-api': 'Intermediate',
        'local-storage': 'Beginner', 'form-validation': 'Intermediate', 'responsive-design': 'Intermediate',
        'nodejs-basics': 'Beginner', 'npm-basics': 'Beginner', 'express-setup': 'Beginner',
        'routing': 'Intermediate', 'middleware': 'Intermediate', 'rest-apis': 'Intermediate',
        'http-methods': 'Beginner', 'json': 'Beginner', 'database-basics': 'Intermediate',
        'crud-operations': 'Intermediate', 'authentication-basics': 'Advanced', 'password-security': 'Advanced',
        'error-handling': 'Intermediate', 'api-testing': 'Advanced', 'deployment-basics': 'Advanced',
        'big-o-notation': 'Intermediate', 'arrays': 'Beginner', 'strings': 'Beginner',
        'objects-hash-maps': 'Intermediate', 'linked-lists': 'Intermediate', 'stacks': 'Intermediate',
        'queues': 'Intermediate', 'binary-search': 'Advanced', 'two-pointers': 'Advanced',
        'sorting-basics': 'Intermediate', 'recursion': 'Advanced', 'trees-basics': 'Advanced',
        'tree-traversal': 'Advanced', 'dynamic-programming': 'Advanced', 'problem-solving-patterns': 'Advanced'
    };
    return difficulties[topicId] || 'Intermediate';
}

function getTopicName(topicId) {
    const names = {
        'html-basics': 'HTML Basics',
        'html-forms': 'HTML Forms',
        'css-basics': 'CSS Basics',
        'css-flexbox': 'CSS Flexbox',
        'css-grid': 'CSS Grid',
        'javascript-basics': 'JavaScript Basics',
        'javascript-functions': 'JavaScript Functions',
        'dom-manipulation': 'DOM Manipulation',
        'events': 'Events',
        'arrays-loops': 'Arrays & Loops',
        'objects': 'Objects',
        'fetch-api': 'Fetch API',
        'local-storage': 'Local Storage',
        'form-validation': 'Form Validation',
        'responsive-design': 'Responsive Design',
        'nodejs-basics': 'Node.js Basics',
        'npm-basics': 'NPM Basics',
        'express-setup': 'Express Setup',
        'routing': 'Routing',
        'middleware': 'Middleware',
        'rest-apis': 'REST APIs',
        'http-methods': 'HTTP Methods',
        'json': 'JSON',
        'database-basics': 'Database Basics',
        'crud-operations': 'CRUD Operations',
        'authentication-basics': 'Authentication Basics',
        'password-security': 'Password Security',
        'error-handling': 'Error Handling',
        'api-testing': 'API Testing',
        'deployment-basics': 'Deployment Basics',
        'big-o-notation': 'Big O Notation',
        'arrays': 'Arrays',
        'strings': 'Strings',
        'objects-hash-maps': 'Objects/Hash Maps',
        'linked-lists': 'Linked Lists',
        'stacks': 'Stacks',
        'queues': 'Queues',
        'binary-search': 'Binary Search',
        'two-pointers': 'Two Pointers',
        'sorting-basics': 'Sorting Basics',
        'recursion': 'Recursion',
        'trees-basics': 'Trees Basics',
        'tree-traversal': 'Tree Traversal',
        'dynamic-programming': 'Dynamic Programming Intro',
        'problem-solving-patterns': 'Problem Solving Patterns'
    };
    return names[topicId] || topicId;
}

function loadTopics() {
    try {
        const stored = localStorage.getItem('topics');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.log('[v0] Error loading topics:', e);
        // Return empty object on error
    }

    // Initialize with empty topics
    const topicsList = getTopicsList();
    const topics = {};
    
    for (let path in topicsList) {
        topicsList[path].forEach(topicId => {
            topics[topicId] = {
                name: getTopicName(topicId),
                path: path,
                completed: false,
                completedDate: null,
                difficulty: getTopicDifficulty(topicId),
                notes: '',
                timeSpent: 0,
                estimatedTime: getEstimatedTime(topicId),
                practiceCount: 0
            };
        });
    }

    localStorage.setItem('topics', JSON.stringify(topics));
    return topics;
}

function getEstimatedTime(topicId) {
    const difficulty = getTopicDifficulty(topicId);
    switch(difficulty) {
        case 'Beginner': return 30;
        case 'Intermediate': return 60;
        case 'Advanced': return 90;
        default: return 45;
    }
}

function saveTopic(topicId, topicData) {
    const topics = loadTopics();
    topics[topicId] = topicData;
    localStorage.setItem('topics', JSON.stringify(topics));
}

function completeTopic(topicId) {
    const topics = loadTopics();
    if (topics[topicId]) {
        topics[topicId].completed = true;
        topics[topicId].completedDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('topics', JSON.stringify(topics));

        // Update activity
        const activity = loadActivity();
        const today = new Date().toISOString().split('T')[0];
        if (!activity[today]) {
            activity[today] = { topicsCompleted: 0 };
        }
        activity[today].topicsCompleted += 1;
        localStorage.setItem('activity', JSON.stringify(activity));
    }
}

// ===== SNIPPETS MANAGEMENT =====
function loadSnippets() {
    const stored = localStorage.getItem('snippets');
    return stored ? JSON.parse(stored) : [];
}

function saveSnippet(snippet) {
    try {
        // Validate snippet
        if (!snippet.title || !snippet.code || !snippet.language) {
            console.log('[v0] Invalid snippet - missing required fields');
            return false;
        }

        const snippets = loadSnippets();
        
        if (snippet.id) {
            // Update existing snippet
            const index = snippets.findIndex(s => s.id === snippet.id);
            if (index !== -1) {
                snippet.updatedAt = new Date().toISOString();
                snippets[index] = snippet;
            }
        } else {
            // Create new snippet
            snippet.id = Date.now().toString();
            snippet.createdAt = new Date().toISOString();
            snippet.updatedAt = new Date().toISOString();
            snippets.push(snippet);
        }
        
        localStorage.setItem('snippets', JSON.stringify(snippets));
        return true;
    } catch (e) {
        console.log('[v0] Error saving snippet:', e);
        return false;
    }
}

function deleteSnippet(id) {
    const snippets = loadSnippets();
    const filtered = snippets.filter(s => s.id !== id);
    localStorage.setItem('snippets', JSON.stringify(filtered));
}

function getSnippetsByTopic(topicId) {
    const snippets = loadSnippets();
    return snippets.filter(s => s.topicId === topicId);
}

// ===== ACTIVITY MANAGEMENT =====
function loadActivity() {
    const stored = localStorage.getItem('activity');
    return stored ? JSON.parse(stored) : {};
}

function saveActivity(activity) {
    localStorage.setItem('activity', JSON.stringify(activity));
}

// ===== USER MANAGEMENT =====
function setUserName(name) {
    localStorage.setItem('userName', name);
}

function getUserName() {
    return localStorage.getItem('userName') || 'Learner';
}

// ===== EXPORT/IMPORT =====
function exportData() {
    const data = {
        userName: getUserName(),
        topics: loadTopics(),
        snippets: loadSnippets(),
        activity: loadActivity()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'learning-tracker-backup-' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function importData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        
        if (data.userName) localStorage.setItem('userName', data.userName);
        if (data.topics) localStorage.setItem('topics', JSON.stringify(data.topics));
        if (data.snippets) localStorage.setItem('snippets', JSON.stringify(data.snippets));
        if (data.activity) localStorage.setItem('activity', JSON.stringify(data.activity));
        
        return true;
    } catch (e) {
        console.error('Failed to import data:', e);
        return false;
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to delete all data? This cannot be undone.')) {
        localStorage.clear();
        return true;
    }
    return false;
}

// ===== INITIALIZE WITH SAMPLE DATA =====
function initializeSampleData() {
    // Only initialize once
    if (localStorage.getItem('sampleDataInitialized')) {
        return;
    }

    const topics = loadTopics();

    // Mark some topics as completed (sample data)
    const completedTopics = [
        'html-basics', 'html-forms', 'css-basics', 'css-flexbox', 'dom-manipulation',
        'nodejs-basics', 'npm-basics', 'express-setup', 'routing',
        'arrays', 'strings', 'recursion', 'trees-basics'
    ];

    completedTopics.forEach(topicId => {
        topics[topicId].completed = true;
        topics[topicId].completedDate = getRandomDate();
    });

    localStorage.setItem('topics', JSON.stringify(topics));

    // Add sample snippets
    const snippets = [
        {
            id: '1',
            title: 'Array Map Function',
            topicId: 'arrays-loops',
            language: 'javascript',
            code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]',
            createdDate: getRandomDate()
        },
        {
            id: '2',
            title: 'Express Server Setup',
            topicId: 'express-setup',
            language: 'javascript',
            code: 'const express = require("express");\nconst app = express();\napp.listen(3000, () => {\n  console.log("Server running on port 3000");\n});',
            createdDate: getRandomDate()
        }
    ];

    localStorage.setItem('snippets', JSON.stringify(snippets));

    // Add sample activity
    const activity = {};
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        if (Math.random() > 0.5) {
            activity[dateStr] = {
                topicsCompleted: Math.floor(Math.random() * 3) + 1
            };
        }
    }
    localStorage.setItem('activity', JSON.stringify(activity));

    // Set user name
    setUserName('Learner');

    // Mark as initialized
    localStorage.setItem('sampleDataInitialized', 'true');
}

function getRandomDate() {
    const start = new Date();
    start.setDate(start.getDate() - 30);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// ===== BADGES/ACHIEVEMENTS =====
function loadBadges() {
    const stored = localStorage.getItem('badges');
    return stored ? JSON.parse(stored) : {};
}

function checkAndAwardBadges() {
    const badges = loadBadges();
    const topics = loadTopics();
    const completedTopics = Object.values(topics).filter(t => t.completed).length;
    const totalTopics = Object.keys(topics).length;

    const allBadges = {
        'first-step': { name: 'First Step', icon: '👣', condition: () => completedTopics >= 1 },
        'quick-learner': { name: 'Quick Learner', icon: '⚡', condition: () => completedTopics >= 5 },
        'apprentice': { name: 'Apprentice', icon: '🎓', condition: () => completedTopics >= 10 },
        'expert': { name: 'Expert', icon: '🏆', condition: () => completedTopics >= 25 },
        'master': { name: 'Master', icon: '👑', condition: () => completedTopics === totalTopics },
        'streak-warrior': { name: 'Streak Warrior', icon: '🔥', condition: () => getCurrentStreak() >= 7 },
        'frontend-master': { name: 'Frontend Master', icon: '🎨', condition: () => {
            const frontendTopics = Object.values(topics).filter(t => t.path === 'frontend');
            return frontendTopics.filter(t => t.completed).length === frontendTopics.length;
        }},
        'backend-master': { name: 'Backend Master', icon: '⚙️', condition: () => {
            const backendTopics = Object.values(topics).filter(t => t.path === 'backend');
            return backendTopics.filter(t => t.completed).length === backendTopics.length;
        }},
        'algorithm-master': { name: 'Algorithm Master', icon: '🧠', condition: () => {
            const algoTopics = Object.values(topics).filter(t => t.path === 'algorithms');
            return algoTopics.filter(t => t.completed).length === algoTopics.length;
        }},
        'snippet-collector': { name: 'Snippet Collector', icon: '📝', condition: () => loadSnippets().length >= 5 }
    };

    for (let badgeId in allBadges) {
        if (!badges[badgeId] && allBadges[badgeId].condition()) {
            badges[badgeId] = {
                name: allBadges[badgeId].name,
                icon: allBadges[badgeId].icon,
                earnedDate: new Date().toISOString().split('T')[0]
            };
        }
    }

    localStorage.setItem('badges', JSON.stringify(badges));
    return badges;
}

function getCurrentStreak() {
    const activity = loadActivity();
    let streak = 0;
    let currentDate = new Date();

    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (activity[dateStr] && activity[dateStr].topicsCompleted > 0) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}

function getLongestStreak() {
    const activity = loadActivity();
    const dates = Object.keys(activity).sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let lastDate = null;

    for (let dateStr of dates) {
        if (activity[dateStr].topicsCompleted > 0) {
            const date = new Date(dateStr);
            if (!lastDate) {
                currentStreak = 1;
            } else {
                const lastCheckDate = new Date(lastDate);
                const diffTime = Math.abs(date - lastCheckDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                }
            }
            longestStreak = Math.max(longestStreak, currentStreak);
            lastDate = dateStr;
        }
    }

    return longestStreak;
}
