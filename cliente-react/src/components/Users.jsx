import { useEffect, useState } from 'react'
import { fetchUsers, fetchUserTodos } from '../api/client'
import UserModal from './UserModal'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUserTodos, setSelectedUserTodos] = useState([])

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await fetchUsers()
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Erro ao carregar usuários')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  const filtered = users.filter(u => {
    const term = search.toLowerCase()
    return (
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.id.toString().includes(term)
    )
  })

  async function openUser(user) {
    try {
      const todos = await fetchUserTodos(user.id)
      setSelectedUser(user)
      setSelectedUserTodos(todos)
    } catch (err) {
      setError(err.message || 'Erro ao buscar tarefas do usuário')
      setSelectedUser(user)
      setSelectedUserTodos([])
    }
  }

  function closeModal() {
    setSelectedUser(null)
    setSelectedUserTodos([])
  }

  return (
    <div className="container">
      <header>
        <h1>JSON Placeholder</h1>
        <p className="subtitle">Lista de usuários e tarefas</p>
      </header>

      <div className="content">
        <div className="panel list-panel">
          <h2>Usuários</h2>
          <input id="search-input" placeholder="Filtrar por nome, email ou id" value={search} onChange={handleSearch} />

          <div className="list-container">
            {loading && <div className="loading">Carregando...</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
              <ul id="userList">
                {filtered.length === 0 && <li className="error">Nenhum usuário encontrado</li>}
                {filtered.map(u => (
                  <li key={u.id} className={`user-item ${selectedUser?.id === u.id ? 'selected' : ''}`} onClick={() => openUser(u)}>
                    <div className="user-info">
                      <div className="user-name">{u.name}</div>
                      <div className="user-email">{u.email}</div>
                      <div className="user-phone">{u.phone}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Hidden details panel - kept for parity with cliente-vite (not shown) */}
        <div id="hidden-details" className="hidden">
          <div id="loader" className="loading">Carregando...</div>
          <div id="todoStats" className="stats"></div>
          <div className="list-container">
            <ul id="todoList"></ul>
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserModal user={selectedUser} todos={selectedUserTodos} onClose={closeModal} />
      )}
    </div>
  )
}
