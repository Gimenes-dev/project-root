const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.auth) {
            alert('Registro bem-sucedido');
            localStorage.setItem('token', data.token);
            
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Erro:', error));
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.auth) {
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido');
        } else {
            alert('Erro ao fazer login');
        }
    })
    .catch(error => console.error('Erro:', error));
});


document.getElementById('load-users').addEventListener('click', function () {
    fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '';

        data.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.textContent = `${user.id} - ${user.username}`;
            usersList.appendChild(userDiv);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.getElementById('update-user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const id = document.getElementById('update-user-id').value;
    const username = document.getElementById('update-username').value;
    const password = document.getElementById('update-password').value;

    fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('update-user-message');
        if (data.error) {
            messageDiv.textContent = `Erro: ${data.error}`;
        } else {
            messageDiv.textContent = 'Usuário alterado com sucesso!';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.getElementById('delete-user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const id = document.getElementById('delete-user-id').value;

    fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('delete-user-message');
        if (data.error) {
            messageDiv.textContent = `Erro: ${data.error}`;
        } else {
            messageDiv.textContent = 'Usuário apagado com sucesso!';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.getElementById('user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('user-message');
        if (data.error) {
            messageDiv.textContent = `Erro: ${data.error}`;
        } else {
            messageDiv.textContent = 'Usuário cadastrado com sucesso!';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.getElementById('task-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const completed = document.getElementById('completed').checked;

    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('task-message');
        if (data.error) {
            messageDiv.textContent = `Erro: ${data.error}`;
        } else {
            messageDiv.textContent = 'Tarefa cadastrada com sucesso!';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.getElementById('load-tasks').addEventListener('click', function () {
    fetch('/api/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML = '';

        data.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.textContent = `${task.id} - ${task.title} - ${task.description} - ${task.completed ? 'Concluída' : 'Pendente'}`;
            tasksList.appendChild(taskDiv);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.getElementById('update-task-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const id = document.getElementById('update-id').value;
    const title = document.getElementById('update-title').value;
    const description = document.getElementById('update-description').value;
    const completed = document.getElementById('update-completed').checked;

    fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, completed }),
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('update-message');
        if (data.error) {
            messageDiv.textContent = `Erro: ${data.error}`;
        } else {
            messageDiv.textContent = 'Tarefa alterada com sucesso!';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

document.getElementById('delete-task-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const id = document.getElementById('delete-id').value;

    fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('delete-message');
        if (data.error) {
            messageDiv.textContent = `Erro: ${data.error}`;
        } else {
            messageDiv.textContent = 'Tarefa apagada com sucesso!';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
