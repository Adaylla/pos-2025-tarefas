import { useState } from 'react'

export default function UserModal({ user, todos = [], onClose }) {
  const [filter, setFilter] = useState('all')

  function handleFilter(f) {
    setFilter(f)
  }

  function filteredTodos() {
    switch (filter) {
      case 'completed':
        return todos.filter(t => t.completed)
      case 'pending':
        return todos.filter(t => !t.completed)
      case 'all':
      default:
        return todos
    }
  }

  return (
    <div id="user-modal">
      <div className="modal-card">
        <button id="close-modal-inner" onClick={onClose} aria-label="Fechar modal">×</button>
        <h2 id="modal-user-name">{user.name}</h2>
        <div id="modal-content">
          <div className="user-details">
            <div className="user-info-grid">
              <div className="info-item">
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <strong>Telefone:</strong>
                <span>{user.phone}</span>
              </div>
              <div className="info-item">
                <strong>Website:</strong>
                <span>{user.website}</span>
              </div>
              <div className="info-item">
                <strong>Empresa:</strong>
                <span>{user.company?.name || 'N/A'}</span>
              </div>
            </div>

            <div className="todos-section">
              <h3>Tarefas ({todos.length})</h3>
              <div className="todo-filters">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} data-filter="all" onClick={() => handleFilter('all')}>Todas</button>
                <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} data-filter="completed" onClick={() => handleFilter('completed')}>Concluídas</button>
                <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} data-filter="pending" onClick={() => handleFilter('pending')}>Pendentes</button>
              </div>
              <div className="modal-todo-list">
                {filteredTodos().length === 0 && <p className="no-todos">Nenhuma tarefa encontrada</p>}
                {filteredTodos().map(todo => (
                  <div key={todo.id} className={`modal-todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <span className="todo-text">{todo.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
