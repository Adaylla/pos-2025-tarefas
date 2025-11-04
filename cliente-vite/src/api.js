const BASE_URL = 'https://jsonplaceholder.typicode.com';

export class JsonPlaceholderAPI {
    /**
     * @returns {Promise<Array>}
     */
    async fetchUsers() {
        try {
            const response = await fetch(`${BASE_URL}/users`);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw error;
        }
    }

    /**
     * @param {number} userId
     * @returns {Promise<Array>}
     */
    async fetchUserTodos(userId) {
        try {
            const response = await fetch(`${BASE_URL}/todos?userId=${userId}`);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            throw error;
        }
    }

    /**
     * @param {number} userId 
     * @returns {Promise<Object>}
     */
    async fetchUserById(userId) {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }
}