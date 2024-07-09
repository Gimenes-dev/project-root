document.addEventListener('DOMContentLoaded', () => {
    const apiBaseURL = 'http://localhost:3000/api';

    // Função para obter o token do localStorage
    const getToken = () => localStorage.getItem('token');

    // Register User
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch(`${apiBaseURL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.token) {
                localStorage.setItem('token', result.token);
                alert('User registered successfully and token stored!');
            } else {
                alert(result.error || 'Error registering user');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error registering user');
        }
    });

    // Login User
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(`${apiBaseURL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.token) {
                localStorage.setItem('token', result.token);
                alert('User logged in successfully and token stored!');
            } else {
                alert(result.error || 'Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error logging in user');
        }
    });

    // Create Task
    const createTaskForm = document.getElementById('createTaskForm');
    createTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const completed = document.getElementById('taskCompleted').checked;
        const token = getToken();

        try {
            const response = await fetch(`${apiBaseURL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, completed })
            });
            const result = await response.json();
            alert(result.message || 'Task created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating task');
        }
    });

    // List Tasks
    const listTasksButton = document.getElementById('listTasksButton');
    listTasksButton.addEventListener('click', async () => {
        const token = getToken();
        try {
            const response = await fetch(`${apiBaseURL}/tasks`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const tasks = await response.json();
            const tasksList = document.getElementById('tasksList');
            tasksList.innerHTML = '<ul>' + tasks.map(task => `<li>${task.id} | ${task.title} | ${task.description} | <input type="checkbox" ${task.completed ? 'checked' : ''} disabled></li>`).join('') + '</ul>';
        } catch (error) {
            console.error('Error:', error);
            alert('Error listing tasks');
        }
    });

    // Update Task
    const updateTaskForm = document.getElementById('updateTaskForm');
    updateTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('updateTaskId').value;
        const title = document.getElementById('updateTaskTitle').value;
        const description = document.getElementById('updateTaskDescription').value;
        const completed = document.getElementById('updateTaskCompleted').checked;
        const token = getToken();

        try {
            const response = await fetch(`${apiBaseURL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, completed })
            });
            const result = await response.json();
            alert(result.message || 'Task updated successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating task');
        }
    });

    // Delete Task
    const deleteTaskForm = document.getElementById('deleteTaskForm');
    deleteTaskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('deleteTaskId').value;
        const token = getToken();

        try {
            const response = await fetch(`${apiBaseURL}/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            alert(result.message || 'Task deleted successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting task');
        }
    });
});
