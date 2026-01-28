// ===== MAIN APP INITIALIZATION =====
// Global app functions used across all pages

// Function declarations
function loadTopics() {
    // Placeholder for loading topics logic
    return JSON.parse(localStorage.getItem('topics')) || {};
}

function loadSnippets() {
    // Placeholder for loading snippets logic
    return JSON.parse(localStorage.getItem('snippets')) || {};
}

function loadActivity() {
    // Placeholder for loading activity logic
    return JSON.parse(localStorage.getItem('activity')) || {};
}

function checkBadgesAndNotify() {
    // Placeholder for checking badges and notifying logic
    console.log('Checking badges and sending notifications...');
}

// Initialize navigation and active page highlighting
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupPageTransitions();
    initializeSampleData();
    checkBadgesAndNotify();
});

// Setup navigation active state
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Setup hamburger menu
    setupHamburgerMenu();
}

// Setup hamburger menu functionality
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });
}

// Setup page transitions with fade effect
function setupPageTransitions() {
    const container = document.querySelector('main');
    if (container) {
        container.style.animation = 'fadeIn 0.5s ease-in';
    }

    // Add fade-out animation before page unload
    document.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href').endsWith('.html')) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href.startsWith('http')) {
                    e.preventDefault();
                    if (container) {
                        container.style.animation = 'fadeOut 0.3s ease-out';
                        setTimeout(() => {
                            window.location.href = href;
                        }, 300);
                    }
                }
            });
        }
    });
}

// Initialize sample data on first load
function initializeSampleData() {
    const hasInitialized = localStorage.getItem('appInitialized');
    if (!hasInitialized) {
        // Load initial data structures
        const topics = loadTopics();
        const snippetsData = loadSnippets();
        const activity = loadActivity();
        
        // Add some sample activity and completed topics
        // Add activity for last 14 days
        for (let i = 0; i < 14; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            if (!activity[dateStr]) {
                activity[dateStr] = {
                    topicsCompleted: Math.floor(Math.random() * 3) + 1
                };
            }
        }
        
        // Mark a few topics as completed
        const frontendTopics = ['html-basics', 'css-basics', 'javascript-basics'];
        const backendTopics = ['nodejs-basics', 'npm-basics'];
        const algoTopics = ['big-o-notation', 'arrays'];
        
        [...frontendTopics, ...backendTopics, ...algoTopics].forEach(topicId => {
            if (topics[topicId]) {
                topics[topicId].completed = true;
                topics[topicId].completedDate = new Date().toISOString().split('T')[0];
                topics[topicId].notes = 'Learned and practiced this concept.';
            }
        });

        // Add sample snippets
        if (snippetsData.length === 0) {
            const sampleSnippets = [
                {
                    id: Date.now().toString(),
                    title: 'Array Map Example',
                    topicId: 'arrays',
                    language: 'javascript',
                    code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]',
                    createdAt: new Date().toISOString()
                },
                {
                    id: (Date.now() + 1).toString(),
                    title: 'HTML Semantic Structure',
                    topicId: 'html-basics',
                    language: 'html',
                    code: '<header>\n  <h1>My Website</h1>\n</header>\n<main>\n  <article>Content</article>\n</main>',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('snippets', JSON.stringify(sampleSnippets));
        }
        
        // Save initialized state
        localStorage.setItem('appInitialized', 'true');
        localStorage.setItem('topics', JSON.stringify(topics));
        localStorage.setItem('activity', JSON.stringify(activity));
    }
}

// Global error handler
window.addEventListener('error', function(e) {
    console.log('[v0] Error:', e.error);
    // Don't show errors to user, just log for debugging
});

// Prevent double form submissions
document.addEventListener('submit', function(e) {
    const button = e.target.querySelector('button[type="submit"]');
    if (button && button.dataset.submitted) {
        e.preventDefault();
        return false;
    }
    if (button) {
        button.dataset.submitted = 'true';
        button.disabled = true;
        setTimeout(() => {
            button.dataset.submitted = 'false';
            button.disabled = false;
        }, 1000);
    }
}, true);
