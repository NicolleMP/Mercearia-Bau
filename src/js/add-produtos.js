document.querySelector('.itens-cadastro').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const desconto = parseFloat(document.getElementById('desconto').value);
    const imagem = document.getElementById('imagem').files[0];

    if (!titulo || isNaN(valor) || isNaN(desconto) || !imagem) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const imagemDataURL = reader.result;
        const produto = { id: Date.now(), nome: titulo, imagem: imagemDataURL, preco: valor, desconto: desconto };

        const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtosSalvos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtosSalvos));

        window.location.href = 'home.html';
    };
    reader.readAsDataURL(imagem);
});
