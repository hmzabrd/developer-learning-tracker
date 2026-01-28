# Developer Learning Path Tracker

A simple, beginner-friendly web application for tracking your programming learning journey. Built entirely with **vanilla HTML, CSS, and JavaScript** - no frameworks, no build tools.

## Features

✅ **Track Learning Progress**
- 45 programming topics across 3 learning paths: Frontend, Backend, and Algorithms
- Mark topics as complete and track completion dates
- Take notes on each topic

✅ **Code Snippets Library**
- Save and organize code examples from your learning
- Link snippets to specific topics
- Search through your snippet collection
- Copy snippets to clipboard

✅ **Activity Visualization**
- GitHub-style activity grid showing last 30 days
- Weekly activity chart with statistics
- Streak tracking (current and longest)
- Recent activity timeline

✅ **Statistics & Analytics**
- Overall completion percentage
- Progress by learning path
- Topics completed this week
- Visual progress bars

✅ **Data Management**
- Export your data as JSON file (backup)
- Import data from saved files (restore)
- Clear all data option with confirmation

✅ **User Experience**
- Dark/Light theme toggle
- Mobile-responsive design
- Easy-to-use navigation
- LocalStorage persistence (all data saved locally)

## Getting Started

### Installation
No installation required! Just open `index.html` in your web browser.

```bash
# If running locally, you can use a simple HTTP server:
python -m http.server 8000
# or
npx http-server
```

Then visit: `http://localhost:8000`

### Browser Support
Works on all modern browsers that support:
- ES6 JavaScript
- localStorage API
- CSS Grid and Flexbox
- File API (for import/export)

## Project Structure

```
project/
├── index.html              # Dashboard - Main page with stats and activity overview
├── paths.html              # Learning paths with topic overview
├── topic.html              # Topic detail page with notes and snippets
├── snippets.html           # Code snippets library
├── stats.html              # Statistics and analytics
├── settings.html           # User settings, data management, theme
├── css/
│   └── style.css           # All styles (responsive, dark mode support)
├── js/
│   ├── data.js             # localStorage functions and data management
│   ├── utils.js            # Helper functions and utilities
│   └── app.js              # Global app initialization
└── README.md               # This file
```

## Learning Paths

### Frontend (15 topics)
1. HTML Basics
2. HTML Forms
3. CSS Basics
4. CSS Flexbox
5. CSS Grid
6. JavaScript Basics
7. JavaScript Functions
8. DOM Manipulation
9. Events
10. Arrays & Loops
11. Objects
12. Fetch API
13. Local Storage
14. Form Validation
15. Responsive Design

### Backend (15 topics)
1. Node.js Basics
2. NPM Basics
3. Express Setup
4. Routing
5. Middleware
6. REST APIs
7. HTTP Methods
8. JSON
9. Database Basics
10. CRUD Operations
11. Authentication Basics
12. Password Security
13. Error Handling
14. API Testing
15. Deployment Basics

### Algorithms (15 topics)
1. Big O Notation
2. Arrays
3. Strings
4. Objects/Hash Maps
5. Linked Lists
6. Stacks
7. Queues
8. Binary Search
9. Two Pointers
10. Sorting Basics
11. Recursion
12. Trees Basics
13. Tree Traversal
14. Dynamic Programming Intro
15. Problem Solving Patterns

## How to Use

### On Dashboard
- View your stats: completed topics, current streak, snippets saved
- See your activity over the last 30 days
- Click any learning path to view topics
- Access other pages via navigation menu

### On Learning Paths
- View all topics in a path
- See your progress with a progress bar
- Click a topic card to view details

### On Topic Detail
- Write notes for the topic
- Check the box to mark as complete
- Create and manage code snippets for that topic
- Return to the path when done

### In Snippets Library
- View all your saved code snippets
- Search snippets by title
- View full code in a modal
- Copy code to clipboard
- Delete snippets you no longer need

### In Statistics
- View completion rate across all paths
- See progress for each learning path
- View weekly activity chart
- Review recent activity timeline

### In Settings
- Change your name
- Toggle dark/light mode
- Export your data (download as JSON)
- Import previously saved data
- Clear all data (with confirmation)

## Data Storage

All data is stored locally in your browser's **localStorage**:
- User name
- Topic completion status and notes
- Code snippets
- Activity history
- Theme preference

No data is sent to any server. Everything stays on your device.

### Export/Import
You can backup your data:
1. Go to Settings
2. Click "Export Data" to download a JSON file
3. To restore: Upload the JSON file using "Import Data"

## Code Examples

### Adding a New Topic
Topics are defined in `js/data.js` in the `getTopicsList()` function. Add new topics to the arrays:

```javascript
const topics = {
    frontend: [
        'html-basics',
        'your-new-topic', // Add here
    ]
};
```

### Understanding localStorage
The app uses simple localStorage operations:

```javascript
// Save data
localStorage.setItem('key', JSON.stringify(data));

// Load data
const data = JSON.parse(localStorage.getItem('key') || '{}');
```

### Adding a Feature
1. Create HTML elements in the relevant `.html` file
2. Add event listeners in the `<script>` tag
3. Use data functions from `data.js`
4. Style with `css/style.css`

## Customization

### Change Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary: #3b82f6;  /* Primary blue */
    --success: #10b981;  /* Success green */
}
```

### Change Topics
Edit `js/data.js` - modify `getTopicsList()` and `getTopicName()` functions.

### Add New Pages
1. Create new `.html` file
2. Copy the navbar structure from existing pages
3. Add links to navigation menu in all `.html` files
4. Add your page-specific scripts and styles

## Learning Points

This project demonstrates:
- **DOM Manipulation**: querySelector, addEventListener, innerHTML
- **Data Persistence**: localStorage, JSON serialization
- **Event Handling**: Click events, form submissions, modals
- **DOM Traversal**: parent/child elements, classList
- **CSS Grid & Flexbox**: Responsive layouts
- **Functions**: Data loading, saving, filtering
- **String Methods**: search filters, date formatting
- **Array Methods**: map, filter, find, forEach
- **File API**: Import/export JSON files

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ❌ Not supported (uses ES6+)

## Tips for Success

1. **Start with Frontend Path** - Build HTML, CSS, and JavaScript fundamentals first
2. **Create Snippets** - Save code examples you find useful
3. **Use Notes** - Write down key concepts for each topic
4. **Regular Practice** - Use the activity grid to stay consistent
5. **Export Regularly** - Backup your progress frequently

## Troubleshooting

### Data Not Saving?
- Check if localStorage is enabled in your browser
- Check browser console for errors (F12)
- Try clearing browser cache

### Activity Grid Empty?
- The grid only shows activity from the past 30 days
- Complete some topics to see activity

### Can't Import Data?
- Make sure file is valid JSON format
- File should be exported from this app

## Future Enhancement Ideas

- Add reminders/notifications for learning goals
- Create custom learning paths
- Add spaced repetition for topic reviews
- Share progress with friends (export/import)
- Add code syntax highlighting
- Create achievement badges
- Add learning goals/deadlines
- Integrate with GitHub for commit tracking

## License

Free to use and modify for personal or educational purposes.

---

**Happy Learning! 🚀**

Questions? Check the code comments in each file - they explain how everything works!
