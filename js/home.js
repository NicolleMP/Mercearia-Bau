// Dados dos produtos
const produtos = [
    {
        "id": 1,
        "nome": "Maçãs",
        "imagem": "https://i.postimg.cc/wydQ7yny/Ma.png",
        "preco": 4.50,
        "desconto": 20
    },
    {
        "id": 2,
        "nome": "Bananas",
        "imagem": "https://i.postimg.cc/c6yQmn9r/Banana.png",
        "preco": 7.00,
        "desconto": 15
    },
    {
        "id": 3,
        "nome": "Cenouras",
        "imagem": "https://i.postimg.cc/CRzNtVj1/Cenoura.png",
        "preco": 2.80,
        "desconto": 25
    },
    {
        "id": 4,
        "nome": "Pães",
        "imagem": "https://i.postimg.cc/njYY7Vtd/Paes.png",
        "preco": 8.00,
        "desconto": 30
    },
    {
        "id": 5,
        "nome": "Leite",
        "imagem": "https://i.postimg.cc/XZ5gjc16/Leite.png",
        "preco": 4.65,
        "desconto": 10
    },
    {
        "id": 6,
        "nome": "Ovos",
        "imagem": "https://i.postimg.cc/CRXNp6N4/Ovos.png",
        "preco": 10.00,
        "desconto": 18
    },
    {
        "id": 7,
        "nome": "Tomates",
        "imagem": "https://i.postimg.cc/zVd70fH6/Tomate.png",
        "preco": 6.50,
        "desconto": 22
    },
    {
        "id": 8,
        "nome": "Cereais",
        "imagem": "https://i.postimg.cc/c60cW3QP/Cereais.png",
        "preco": 9.00,
        "desconto": 12
    },
    {
        "id": 9,
        "nome": "Queijo",
        "imagem": "https://i.postimg.cc/BPS5CWSJ/Queijo.png",
        "preco": 30.00,
        "desconto": 28
    },
    {
        "id": 10,
        "nome": "Frango",
        "imagem": "https://i.postimg.cc/G9xqTKLc/Frango.png",
        "preco": 14.00,
        "desconto": 17
    }
];



function calcularPreco(precoNormal, desconto) {
    return precoNormal - (precoNormal * (desconto / 100));
}


function exibirProdutosNaTela() {
    const promocao = document.getElementById('produtos');
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
          </div>
      `;
    });
}


document.addEventListener('DOMContentLoaded', function () {
    exibirProdutosNaTela();

    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            icon.classList.toggle('bx-heart');
            icon.classList.toggle('bxs-heart');
        });
    });
});