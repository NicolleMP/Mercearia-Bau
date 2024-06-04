function carregarProdutos() {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];

    return fetch('../data/db.json')
        .then(response => response.json())
        .then(data => data.concat(produtosSalvos))
        .catch(error => {
            console.error("Erro ao carregar produtos na tela: ", error);
            return produtosPadrao.concat(produtosSalvos);
        });
}

function calcularPreco(precoNormal, desconto) {
    return precoNormal - (precoNormal * (desconto / 100));
}

function isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
}

function removerProdutos(id) {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    const novosProdutos = produtosSalvos.filter(produto => produto.id !== id);
    localStorage.setItem('produtos', JSON.stringify(novosProdutos));
    exibirProdutosNaTela();
}

function exibirProdutosNaTela() {
    carregarProdutos().then(produtos => {
        const promocao = document.getElementById('produtos');
        promocao.innerHTML = '';

        produtos.forEach(produto => {
            const precoAtual = calcularPreco(produto.preco, produto.desconto);
            promocao.innerHTML += `
                <div class="produto">
                    <span class="oferta">Oferta</span>
                    <img class="prod-image" src="${produto.imagem}" alt="${produto.nome}" />
                    <h3 class="prod-title">${produto.nome}</h3>
                    <p class="preco-antigo">R$${produto.preco.toFixed(2)}</p>
                    <p class="preco-atual">R$${precoAtual.toFixed(2)}</p>
                    <i class="bx bx-heart heart-icon"></i>
                    ${isAdmin() ? '<button class = "btn-remove">Remover</button>' : ''}
                </div>
            `;
        });

        const heartIcons = document.querySelectorAll('.heart-icon');
        heartIcons.forEach(icon => {
            icon.addEventListener('click', function () {
                icon.classList.toggle('bx-heart');
                icon.classList.toggle('bxs-heart');
            });
        });
    });


    if (isAdmin()) {
        const removebuttons = document.querySelectorAll('.btn-remove');
        removebuttons.forEach(button => {
            button.addEventListener('click', function () {
                const produtosId = parseInt(button.parentElement.getAttribute('data-id'));
                removerProdutos(produtosId);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    exibirProdutosNaTela();
});
