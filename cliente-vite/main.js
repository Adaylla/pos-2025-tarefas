import './style.css';
import { JsonPlaceholderAPI } from './src/api.js';
import { UIManager } from './src/dom.js';

let allUsersData = [];
let api;
let dom;

async function handleUserClick(user) {
    try {
        const todos = await api.fetchUserTodos(user.id);
        
        dom.displayUserModal(user, todos);
        dom.showModal(true);
    } catch (error) {
        console.error("Erro ao buscar tarefas do usuário:", error);
        dom.domElements.modalContent.innerHTML = "<p class='error'>Não foi possível carregar as tarefas do usuário.</p>";
        dom.showModal(true);
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = allUsersData.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.id.toString().includes(searchTerm)
    );
    dom.displayUsers(filteredUsers, handleUserClick);
}

function handleModalClose(e) {
    if (e.target.id === 'user-modal' || e.target.closest('#close-modal-inner')) {
        dom.showModal(false);
    }
}

function handleTodoFilter(filter) {
    const currentUser = dom.getCurrentModalUser();
    if (currentUser) {
        const filteredTodos = dom.filterTodos(currentUser.todos, filter);
        dom.updateModalTodos(filteredTodos);
    }
}

async function initializeApp() {
    api = new JsonPlaceholderAPI();
    dom = new UIManager();
    
    dom.createInitialShell();

    dom.domElements.searchInput.addEventListener('input', handleSearch);
    dom.domElements.modal.addEventListener('click', handleModalClose);
    
    if (dom.domElements.todoFilterAll) {
        dom.domElements.todoFilterAll.addEventListener('click', () => handleTodoFilter('all'));
    }
    if (dom.domElements.todoFilterCompleted) {
        dom.domElements.todoFilterCompleted.addEventListener('click', () => handleTodoFilter('completed'));
    }
    if (dom.domElements.todoFilterPending) {
        dom.domElements.todoFilterPending.addEventListener('click', () => handleTodoFilter('pending'));
    }

    try {
        dom.showLoader(true);
        
        allUsersData = await api.fetchUsers();
        
        dom.showLoader(false);
        dom.displayUsers(allUsersData, handleUserClick);
        
    } catch (error) {
        dom.setErrorMessage(error.message, true);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);