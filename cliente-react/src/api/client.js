const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`)
  return res.json()
}

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
  return res.json()
}

export async function fetchUserTodos(userId) {
  const res = await fetch(`${BASE_URL}/todos?userId=${userId}`)
  if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
  return res.json()
}

export async function fetchUserById(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`)
  if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
  return res.json()
}