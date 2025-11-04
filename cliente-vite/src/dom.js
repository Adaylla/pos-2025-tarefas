export class UIManager {
    constructor() {
        this.domElements = {};
        this.currentModalUser = null;
        this.currentModalTodos = [];
    }

    createInitialShell() {
        // If the page doesn't include the expected markup, build a minimal shell
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = `
                <div class="container">
                    <header>
                        <h1>JSON Placeholder</h1>
                        <p class="subtitle">Lista de usuários e tarefas</p>
                    </header>

                    <div class="content">
                        <div class="panel list-panel">
                            <h2>Usuários</h2>
                            <input id="search-input" placeholder="Filtrar por nome, email ou id" />
                            <div class="list-container">
                                <ul id="userList"></ul>
                            </div>
                        </div>

                        <!-- details panel removed (kept hidden elements for JS functionality) -->
                    </div>

                    <!-- hidden container that keeps todo-related elements available to JS but not visible -->
                    <div id="hidden-details" class="hidden">
                        <div id="loader" class="loading">Carregando...</div>
                        <div id="todoStats" class="stats"></div>
                        <div class="list-container">
                            <ul id="todoList"></ul>
                        </div>
                    </div>

                    <div id="user-modal" class="hidden">
                        <div class="modal-card">
                            <button id="close-modal-inner" aria-label="Fechar modal">×</button>
                            <h2 id="modal-user-name"></h2>
                            <div id="modal-content"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        this.setupDOMElements();
    }

    setupDOMElements() {
        this.domElements = {
            searchInput: document.getElementById('search-input'),
            userList: document.getElementById('userList'),
            todoList: document.getElementById('todoList'),
            todoStats: document.getElementById('todoStats'),
            modal: document.getElementById('user-modal'),
            modalContent: document.getElementById('modal-content'),
            modalUserName: document.getElementById('modal-user-name'),
            loader: document.getElementById('loader')
        };
    }

    /**
     * @param {Array} users 
     * @param {Function} onUserSelect 
     */
    displayUsers(users, onUserSelect) {
        const userList = this.domElements.userList;
        
        if (users.length === 0) {
            userList.innerHTML = '<li class="error">Nenhum usuário encontrado</li>';
            return;
        }
        
        userList.innerHTML = users.map(user => `
            <li class="user-item" data-user-id="${user.id}">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                    <div class="user-phone">${user.phone}</div>
                </div>
            </li>
        `).join('');

        userList.querySelectorAll('.user-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = parseInt(item.getAttribute('data-user-id'));
                const user = users.find(u => u.id === userId);
                if (user) {
                    userList.querySelectorAll('.user-item').forEach(li => {
                        li.classList.remove('selected');
                    });
                    item.classList.add('selected');
                    onUserSelect(user);
                }
            });
        });
    }

    /**
     * @param {Array} todos 
     */
    displayTodos(todos) {
        const todoList = this.domElements.todoList;
        const todoStats = this.domElements.todoStats;
        
        if (!todos || todos.length === 0) {
            todoList.innerHTML = '<li>Nenhuma tarefa encontrada</li>';
            todoStats.innerHTML = '';
            return;
        }
        
        let completedCount = 0;
        
        todoList.innerHTML = todos.map(todo => {
            if (todo.completed) completedCount++;
            
            return `
                <li class="todo-item">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} disabled>
                    <span class="todo-title ${todo.completed ? 'completed' : ''}">${todo.title}</span>
                </li>
            `;
        }).join('');

        this.updateStats(todos.length, completedCount);
    }

    /**
     * @param {number} total 
     * @param {number} completed 
     */
    updateStats(total, completed) {
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        this.domElements.todoStats.innerHTML = `
            <span>Total: ${total}</span>
            <span>Concluídas: ${completed}</span>
            <span>Progresso: ${percentage}%</span>
        `;
    }

    /**
     * @param {Object} user 
     * @param {Array} todos
     */
    displayUserModal(user, todos) {
        this.currentModalUser = user;
        this.currentModalTodos = todos;
        
        this.domElements.modalUserName.textContent = user.name;
        
        this.domElements.modalContent.innerHTML = `
            <div class="user-details">
                <div class="user-info-grid">
                    <div class="info-item">
                        <strong>Email:</strong>
                        <span>${user.email}</span>
                    </div>
                    <div class="info-item">
                        <strong>Telefone:</strong>
                        <span>${user.phone}</span>
                    </div>
                    <div class="info-item">
                        <strong>Website:</strong>
                        <span>${user.website}</span>
                    </div>
                    <div class="info-item">
                        <strong>Empresa:</strong>
                        <span>${user.company?.name || 'N/A'}</span>
                    </div>
                </div>
                
                <div class="todos-section">
                    <h3>Tarefas (${todos.length})</h3>
                    <div class="todo-filters">
                        <button class="filter-btn active" data-filter="all">Todas</button>
                        <button class="filter-btn" data-filter="completed">Concluídas</button>
                        <button class="filter-btn" data-filter="pending">Pendentes</button>
                    </div>
                    <div class="modal-todo-list">
                        ${this.renderTodoList(todos)}
                    </div>
                </div>
            </div>
        `;

        this.setupTodoFilters();
    }

    /**
     * @param {Array} todos 
     * @returns {string}
     */
    renderTodoList(todos) {
        if (todos.length === 0) {
            return '<p class="no-todos">Nenhuma tarefa encontrada</p>';
        }

        return todos.map(todo => `
            <div class="modal-todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
                <span class="todo-text">${todo.title}</span>
            </div>
        `).join('');
    }

    setupTodoFilters() {
        const filterButtons = this.domElements.modalContent.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                this.filterTodos(filter);
            });
        });
    }

    /**
     * @param {string} filter 
     */
    filterTodos(filter) {
        let filteredTodos = this.currentModalTodos;
        
        switch (filter) {
            case 'completed':
                filteredTodos = this.currentModalTodos.filter(todo => todo.completed);
                break;
            case 'pending':
                filteredTodos = this.currentModalTodos.filter(todo => !todo.completed);
                break;
            case 'all':
            default:
                filteredTodos = this.currentModalTodos;
        }
        
        const todoListContainer = this.domElements.modalContent.querySelector('.modal-todo-list');
        todoListContainer.innerHTML = this.renderTodoList(filteredTodos);
    }

    /**
     * @returns {Object}
     */
    getCurrentModalUser() {
        return this.currentModalUser;
    }

    /**
     * @param {boolean} show 
     */
    showModal(show) {
        if (show) {
            this.domElements.modal.classList.remove('hidden');
        } else {
            this.domElements.modal.classList.add('hidden');
        }
    }

    /**
     * @param {boolean} show
     */
    showLoader(show) {
        if (show) {
            this.domElements.loader.classList.remove('hidden');
        } else {
            this.domElements.loader.classList.add('hidden');
        }
    }

    /**
     * @param {string} message
     * @param {boolean} show 
     */
    setErrorMessage(message, show) {
        const userList = this.domElements.userList;
        if (show) {
            userList.innerHTML = `<li class="error">Erro: ${message}</li>`;
            this.showLoader(false);
        }
    }
}