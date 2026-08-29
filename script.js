// To-Do List Application with Local Storage
class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    // Initialize the app
    init() {
        this.loadTasks();
        this.setupEventListeners();
        this.render();
        console.log('✅ To-Do App initialized successfully!');
    }

    // Setup all event listeners
    setupEventListeners() {
        // Add task on button click
        document.getElementById('addBtn').addEventListener('click', () => this.addTask());

        // Add task on Enter key
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Clear completed button
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());

        // Clear all button
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
    }

    // Add new task
    addTask() {
        const input = document.getElementById('taskInput');
        const taskText = input.value.trim();

        if (!taskText) {
            alert('Please enter a task!');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        input.value = '';
        input.focus();
        this.render();
        this.showNotification('✅ Task added successfully!');
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    // Delete task
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            this.showNotification('🗑️ Task deleted!');
        }
    }

    // Edit task
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null && newText.trim()) {
                task.text = newText.trim();
                this.saveTasks();
                this.render();
                this.showNotification('✏️ Task updated!');
            }
        }
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    // Filter tasks based on current filter
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'all':
            default:
                return this.tasks;
        }
    }

    // Clear completed tasks
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }
        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.showNotification('🧹 Completed tasks cleared!');
        }
    }

    // Clear all tasks
    clearAll() {
        if (this.tasks.length === 0) {
            alert('No tasks to clear!');
            return;
        }
        if (confirm('Delete ALL tasks? This cannot be undone!')) {
            this.tasks = [];
            this.saveTasks();
            this.render();
            this.showNotification('🧹 All tasks cleared!');
        }
    }

    // Update task statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
    }

    // Render tasks
    render() {
        const tasksList = document.getElementById('tasksList');
        const filteredTasks = this.getFilteredTasks();

        // Clear existing tasks
        tasksList.innerHTML = '';

        if (filteredTasks.length === 0) {
            tasksList.innerHTML = '<li class="empty-state"><p>No tasks yet. Add one to get started! 🚀</p></li>';
        } else {
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="checkbox" 
                        ${task.completed ? 'checked' : ''} 
                        onchange="app.toggleTask(${task.id})"
                    >
                    <span class="task-text">${this.escapeHtml(task.text)}</span>
                    <span class="task-date">${task.createdAt}</span>
                    <div class="task-actions">
                        <button class="edit-btn" onclick="app.editTask(${task.id})">Edit</button>
                        <button class="delete-btn" onclick="app.deleteTask(${task.id})">Delete</button>
                    </div>
                `;
                tasksList.appendChild(li);
            });
        }

        this.updateStats();
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Load tasks from localStorage
    loadTasks() {
        const stored = localStorage.getItem('tasks');
        this.tasks = stored ? JSON.parse(stored) : [];
    }

    // Show notification
    showNotification(message) {
        // You can enhance this with a toast notification system
        console.log(message);
    }
}

// Initialize the app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});
