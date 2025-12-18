document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const sortAllBtn = document.getElementById('sortAll');
    const sortActiveBtn = document.getElementById('sortActive');
    const sortCompletedBtn = document.getElementById('sortCompleted');
    const totalCount = document.getElementById('totalCount');
    const activeCount = document.getElementById('activeCount');
    const completedCount = document.getElementById('completedCount');
    
    let tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    let currentFilter = 'all';
    
    function saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
        updateStats();
    }
    
    function formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = String(d.getFullYear()).slice(2);
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    }
    
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const active = total - completed;
        
        totalCount.textContent = total;
        activeCount.textContent = active;
        completedCount.textContent = completed;
    }
    
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'task-completed' : ''}`;
        li.dataset.id = task.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        dateSpan.textContent = formatDate(task.date);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '×';
        
        checkbox.addEventListener('change', function() {
            task.completed = this.checked;
            if (task.completed) {
                li.classList.add('task-completed');
                checkbox.style.display = 'none';
            } else {
                li.classList.remove('task-completed');
                checkbox.style.display = 'block';
            }
            saveTasks();
            filterTasks();
        });
        
        deleteBtn.addEventListener('click', function() {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            filterTasks();
        });
        
        textSpan.addEventListener('dblclick', function() {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'task-edit-input';
            input.value = task.text;
            
            li.replaceChild(input, textSpan);
            input.focus();
            
            function finishEdit() {
                const newText = input.value.trim();
                if (newText) {
                    task.text = newText;
                    textSpan.textContent = newText;
                }
                li.replaceChild(textSpan, input);
                saveTasks();
            }
            
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') finishEdit();
            });
            
            input.addEventListener('blur', finishEdit);
        });
        
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(dateSpan);
        li.appendChild(deleteBtn);
        
        if (task.completed) {
            checkbox.style.display = 'none';
        }
        
        return li;
    }
    
    function filterTasks() {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        filteredTasks.forEach(task => {
            taskList.appendChild(createTaskElement(task));
        });
        
        updateStats();
    }
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            const newTask = {
                id: Date.now(),
                text: this.value.trim(),
                completed: false,
                date: new Date().toISOString()
            };
            
            tasks.unshift(newTask);
            this.value = '';
            saveTasks();
            filterTasks();
        }
    });
    
    sortAllBtn.addEventListener('click', function() {
        currentFilter = 'all';
        updateSortButtons();
        filterTasks();
    });
    
    sortActiveBtn.addEventListener('click', function() {
        currentFilter = 'active';
        updateSortButtons();
        filterTasks();
    });
    
    sortCompletedBtn.addEventListener('click', function() {
        currentFilter = 'completed';
        updateSortButtons();
        filterTasks();
    });
    
    function updateSortButtons() {
        sortAllBtn.classList.toggle('active', currentFilter === 'all');
        sortActiveBtn.classList.toggle('active', currentFilter === 'active');
        sortCompletedBtn.classList.toggle('active', currentFilter === 'completed');
    }
    
    updateSortButtons();
    filterTasks();
});