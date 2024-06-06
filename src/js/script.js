document.addEventListener('DOMContentLoaded', (event) => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const password = document.getElementById('password').value.trim();

            let errors = [];


            if (!name) {
                errors.push("Nome é obrigatório.");
            } else if (/[^a-zA-Z\s]/.test(name)) {
                errors.push("Nome deve conter apenas letras e espaços.");
            }


            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                errors.push("Email é obrigatório.");
            } else if (!emailRegex.test(email)) {
                errors.push("Formato de email inválido.");
            } else if (isEmailRegistered(email)) {
                errors.push("Email já cadastrado.");
            }


            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
            if (!cpf) {
                errors.push("CPF é obrigatório.");
            } else if (!cpfRegex.test(cpf)) {
                errors.push("Formato de CPF inválido.");
            } else if (!validarCPF(cpf)) {
                errors.push("CPF inválido.");
            } else if (isCPFRegistered(cpf)) {
                errors.push("CPF já cadastrado.");
            }


            if (!password) {
                errors.push("Senha é obrigatória.");
            } else if (password.length < 8) {
                errors.push("Senha deve ter pelo menos 8 caracteres.");
            }

            if (errors.length > 0) {
                alert(errors.join("\n"));
            } else {
                const user = {
                    name: name,
                    email: email,
                    cpf: cpf,
                    password: password
                };

                localStorage.setItem('user', JSON.stringify(user));
                alert('Cadastro realizado com sucesso!');
                signupForm.reset();
            }
        });

        function isEmailRegistered(email) {
            const user = JSON.parse(localStorage.getItem('user'));
            return user && user.email === email;
        }

        function isCPFRegistered(cpf) {
            const user = JSON.parse(localStorage.getItem('user'));
            return user && user.cpf === cpf;
        }

        function validarCPF(cpf) {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
                return false;
            }

            let sum = 0;
            for (let i = 0; i < 9; i++) {
                sum += parseInt(cpf.charAt(i)) * (10 - i);
            }
            let rev = 11 - (sum % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(cpf.charAt(9))) {
                return false;
            }

            sum = 0;
            for (let i = 0; i < 10; i++) {
                sum += parseInt(cpf.charAt(i)) * (11 - i);
            }
            rev = 11 - (sum % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(cpf.charAt(10))) {
                return false;
            }

            return true;
        }
    }

    // CODIGO LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('isAdmin', 'true');
                alert('Login bem-sucedido como administrador!');
                window.location.href = 'home.html';
            } else if (storedUser && storedUser.email === username && storedUser.password === password) {
                localStorage.setItem('isAdmin', 'false');
                alert('Login bem-sucedido!');
                window.location.href = 'home.html';
            } else {
                alert('Nome de usuário ou senha incorretos.');
            }
        });
    }
});
