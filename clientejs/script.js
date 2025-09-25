const userList = document.getElementById("userList");
const todoList = document.getElementById("todoList");
const todoStats = document.getElementById("todoStats");

let currentUser = null;

// Função para buscar usuários
async function fetchUsers() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        const users = await res.json();
        displayUsers(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        userList.innerHTML = `<li class="error">Erro ao carregar usuários: ${error.message}</li>`;
    }
}

// Função para exibir usuários
function displayUsers(users) {
    userList.innerHTML = ""; 
    
    users.forEach(user => {
        const li = document.createElement("li");
        li.className = "user-item";
        li.innerHTML = `
            <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
            </div>
        `;
        
        li.addEventListener("click", () => {
            document.querySelectorAll("#userList li").forEach(item => {
                item.classList.remove("selected");
            });
            
            li.classList.add("selected");
            
            loadTodos(user.id);
            currentUser = user;
        });
        
        userList.appendChild(li);
    });
}

// Função para carregar tarefas de um usuário
async function loadTodos(userId) {
    todoList.innerHTML = "<li class='loading'>Carregando tarefas...</li>";
    todoStats.innerHTML = "";
    
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        const todos = await res.json();
        displayTodos(todos);
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        todoList.innerHTML = `<li class="error">Erro ao carregar tarefas: ${error.message}</li>`;
    }
}

// Função para exibir tarefas
function displayTodos(todos) {
    todoList.innerHTML = "";
    
    if (todos.length === 0) {
        todoList.innerHTML = "<li>Nenhuma tarefa encontrada</li>";
        return;
    }
    
    let completedCount = 0;
    
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.disabled = true; 
        
        const title = document.createElement("span");
        title.className = "todo-title";
        title.textContent = todo.title;
        
        if (todo.completed) {
            title.classList.add("completed");
            completedCount++;
        }
        
        li.appendChild(checkbox);
        li.appendChild(title);
        todoList.appendChild(li);
    });
    
    updateStats(todos.length, completedCount);
}

// Função para atualizar estatísticas
function updateStats(total, completed) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    todoStats.innerHTML = `
        <span>Total: ${total}</span>
        <span>Concluídas: ${completed}</span>
        <span>Progresso: ${percentage}%</span>
    `;
}

document.addEventListener("DOMContentLoaded", fetchUsers);