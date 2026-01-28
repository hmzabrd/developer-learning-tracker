// ===== UTILITY FUNCTIONS =====

// Format date to readable format (e.g., "Jan 15, 2024")
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format date as YYYY-MM-DD
function formatDateISO(date) {
    return date.toISOString().split('T')[0];
}

// Get activity level (0-4) for a given number of topics completed
function getActivityLevel(topicsCompleted) {
    if (topicsCompleted === 0) return 0;
    if (topicsCompleted === 1) return 1;
    if (topicsCompleted === 2) return 2;
    if (topicsCompleted === 3) return 3;
    return 4;
}

// Render activity grid (last 30 days)
function renderActivityGrid() {
    const container = document.getElementById('activityGrid');
    if (!container) return;

    container.innerHTML = '';
    const activity = window.loadActivity(); // Declare or import loadActivity

    // Get last 30 days
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = formatDateISO(date);

        const square = document.createElement('div');
        square.className = 'activity-square';

        // Check if there's activity on this day
        const dayActivity = activity[dateStr];
        const level = dayActivity ? getActivityLevel(dayActivity.topicsCompleted) : 0;

        if (level > 0) {
            square.classList.add('level-' + level);
            square.title = `${formatDate(date)}: ${dayActivity.topicsCompleted} topic${dayActivity.topicsCompleted > 1 ? 's' : ''}`;
        } else {
            square.title = formatDate(date);
        }

        container.appendChild(square);
    }
}

// Toggle theme
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load theme preference
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Setup navigation menu toggle
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Set active link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Setup default event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sample data on first load
    window.initializeSampleData(); // Declare or import initializeSampleData
    
    // Load theme
    loadTheme();
    
    // Setup navigation
    setupNavigation();
});

// Get path name from ID
function getPathName(pathId) {
    const paths = {
        'frontend': 'Frontend',
        'backend': 'Backend',
        'algorithms': 'Algorithms'
    };
    return paths[pathId] || pathId;
}

// Get path icon from ID
function getPathIcon(pathId) {
    const icons = {
        'frontend': '🎨',
        'backend': '⚙️',
        'algorithms': '🧮'
    };
    return icons[pathId] || '📚';
}

// Create a topic card element
function createTopicCard(topicId, topicData) {
    const card = document.createElement('div');
    card.className = 'card topic-card';
    
    const statusClass = topicData.completed ? 'completed' : 'not-started';
    const statusText = topicData.completed ? '✓ Completed' : 'Not Started';
    const statusIcon = topicData.completed ? '✓' : '○';
    const difficulty = topicData.difficulty || 'Intermediate';
    const difficultyClass = getDifficultyClass(difficulty);

    card.innerHTML = `
        <div class="topic-card-header">
            <div class="topic-info">
                <h3>${topicData.name}</h3>
                <span class="difficulty-badge ${difficultyClass}">${difficulty}</span>
            </div>
            <span class="status-icon ${statusClass}">${statusIcon}</span>
        </div>
        <p class="status-text ${statusClass}">${statusText}</p>
        <div class="topic-meta">
            <span class="meta-item">📚 ${topicData.path || 'Learning'}</span>
            <span class="meta-item" id="snippets-${topicId}">0 snippets</span>
        </div>
    `;

    card.style.cursor = 'pointer';
    card.classList.add(statusClass === 'completed' ? 'completed-card' : 'not-completed-card');
    card.addEventListener('click', () => {
        window.location.href = `topic.html?topic=${topicId}`;
    });
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });

    return card;
}

// Create a snippet card element
function createSnippetCard(snippet) {
    const card = document.createElement('div');
    card.className = 'card snippet-card';

    const topicName = window.getTopicName(snippet.topicId); // Declare or import getTopicName
    const codePreview = snippet.code.split('\n').slice(0, 2).join('\n').substring(0, 50);

    card.innerHTML = `
        <h3>${snippet.title}</h3>
        <p class="topic-label">📌 ${topicName}</p>
        <p class="language-label">Language: ${snippet.language}</p>
        <pre class="code-preview">${codePreview}${snippet.code.split('\n').length > 2 ? '...' : ''}</pre>
        <div class="button-group">
            <button class="btn-primary" onclick="viewSnippet('${snippet.id}')">View</button>
            <button class="btn-danger" onclick="deleteSnippetCard('${snippet.id}')">Delete</button>
        </div>
    `;

    return card;
}

// Calculate stats
function calculateStats() {
    const topics = window.loadTopics(); // Declare or import loadTopics
    const snippets = window.loadSnippets(); // Declare or import loadSnippets
    const activity = window.loadActivity(); // Declare or import loadActivity

    let completedTopics = 0;
    let currentStreak = 0;

    // Count completed topics
    for (let topicId in topics) {
        if (topics[topicId].completed) {
            completedTopics++;
        }
    }

    // Calculate current streak
    const today = new Date();
    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = formatDateISO(date);

        if (activity[dateStr] && activity[dateStr].topicsCompleted > 0) {
            currentStreak++;
        } else if (i > 0) {
            break;
        }
    }

    return {
        completedTopics: completedTopics,
        totalTopics: 45,
        currentStreak: currentStreak,
        snippetsCount: snippets.length,
        completionRate: Math.round((completedTopics / 45) * 100)
    };
}

// Show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
function setupModalClose() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Setup close button for modals
function setupCloseButtons() {
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Initialize modals on page load
document.addEventListener('DOMContentLoaded', () => {
    setupModalClose();
    setupCloseButtons();
});

// Get topics by path
function getTopicsByPath(path) {
    const topicsList = window.getTopicsList(); // Declare or import getTopicsList
    const topics = window.loadTopics(); // Declare or import loadTopics
    const result = [];

    if (topicsList[path]) {
        topicsList[path].forEach(topicId => {
            if (topics[topicId]) {
                result.push({
                    id: topicId,
                    ...topics[topicId]
                });
            }
        });
    }

    return result;
}

// ===== KEYBOARD SHORTCUTS =====
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for quick add snippet
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const modal = document.getElementById('snippetModal');
            if (modal) {
                modal.style.display = 'block';
                const titleInput = modal.querySelector('input[placeholder*="Title"]');
                if (titleInput) titleInput.focus();
            }
        }
        // Ctrl/Cmd + S for quick save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const saveBtn = document.querySelector('[class*="save"], button:contains("Save")');
            if (saveBtn) saveBtn.click();
        }
        // Ctrl/Cmd + L for learning paths
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            window.location.href = 'paths.html';
        }
        // Ctrl/Cmd + / for shortcuts help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showShortcutsHelp();
        }
    });
}

function showShortcutsHelp() {
    const shortcuts = [
        { key: 'Ctrl/Cmd + K', action: 'Quick add snippet' },
        { key: 'Ctrl/Cmd + S', action: 'Save current item' },
        { key: 'Ctrl/Cmd + L', action: 'Go to learning paths' },
        { key: 'Ctrl/Cmd + /', action: 'Show this help' }
    ];

    let helpHTML = '<h3>Keyboard Shortcuts</h3><div class="shortcuts-list">';
    shortcuts.forEach(s => {
        helpHTML += `<div class="shortcut-item"><span>${s.action}</span><span class="shortcut-key">${s.key}</span></div>`;
    });
    helpHTML += '</div>';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Keyboard Shortcuts</h2>
                <button class="close-btn">&times;</button>
            </div>
            ${helpHTML}
        </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('.close-btn').addEventListener('click', () => {
        modal.remove();
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ===== ACHIEVEMENT NOTIFICATIONS =====
function showAchievementPopup(badgeName, badgeIcon) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-icon">${badgeIcon}</div>
        <div class="achievement-text">Achievement Unlocked!</div>
        <div style="font-size: 14px; margin-top: 5px;">${badgeName}</div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('hide');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

function checkBadgesAndNotify() {
    const oldBadges = JSON.parse(localStorage.getItem('badges') || '{}');
    const newBadges = window.checkAndAwardBadges();

    for (let badgeId in newBadges) {
        if (!oldBadges[badgeId]) {
            const badge = newBadges[badgeId];
            showAchievementPopup(badge.name, badge.icon);
        }
    }
}

// ===== DIFFICULTY COLOR HELPERS =====
function getDifficultyClass(difficulty) {
    const classMap = {
        'Beginner': 'difficulty-beginner',
        'Intermediate': 'difficulty-intermediate',
        'Advanced': 'difficulty-advanced'
    };
    return classMap[difficulty] || 'difficulty-beginner';
}

function getDifficultyColor(difficulty) {
    const colorMap = {
        'Beginner': '#10b981',
        'Intermediate': '#f59e0b',
        'Advanced': '#ef4444'
    };
    return colorMap[difficulty] || '#6b7280';
}

// Initialize shortcuts on page load
document.addEventListener('DOMContentLoaded', setupKeyboardShortcuts);
