document.addEventListener('DOMContentLoaded', (event) => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const cpf = document.getElementById('cpf').value;
            const password = document.getElementById('password').value;

            const user = {
                name: name,
                email: email,
                cpf: cpf,
                password: password
            };

            localStorage.setItem('user', JSON.stringify(user));

            alert('Cadastro realizado com sucesso!');
        });
    }

    //TELA DE LOGIN//
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;


            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('isAdmin', 'true');
                alert('Login bem-sucedido como administrador!');
                window.location.href = 'homepage.html';
            } else if (storedUser && storedUser.name === username && storedUser.password === password) {
                localStorage.setItem('isAdmin', 'false');
                alert('Login bem-sucedido!');
                window.location.href = 'homepage.html';
            } else {
                alert('Nome de usuário ou senha incorretos.');
            }
        });
    }
});
