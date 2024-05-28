document.getElementById('closeIcon').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('add').addEventListener('click', function() {
    const codProduto = document.getElementById('codProduto').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    if (!Array.isArray(produtos)) {
        produtos = [];
    }

    const produtoExistenteIndex = produtos.findIndex(p => p.codProduto === codProduto);
    const nomeProduto = document.getElementById('nomeProduto').value;
    const descricaoProduto = document.getElementById('descricaoProduto').value;

    if (produtoExistenteIndex !== -1) {
        // Verifica se o nome do produto coincide
        if (produtos[produtoExistenteIndex].nomeProduto !== nomeProduto) {
            alert(`Já existe um produto com o código ${codProduto}, chamado "${produtos[produtoExistenteIndex].nomeProduto}"!`);
        } else {
            produtos[produtoExistenteIndex].quantidade += quantidade;
            localStorage.setItem('produtos', JSON.stringify(produtos));
            document.getElementById('produtoForm').reset();
            exibirProdutosSalvos();
        }
    } else {
        produtos.push({
            codProduto,
            nomeProduto,
            quantidade,
            descricaoProduto
        });
        localStorage.setItem('produtos', JSON.stringify(produtos));
        document.getElementById('produtoForm').reset();
        exibirProdutosSalvos();
    }
});

document.getElementById('remover').addEventListener('click', function() {
    const codProduto = document.getElementById('codProduto').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    if (!Array.isArray(produtos)) {
        produtos = [];
    }

    const produtoExistenteIndex = produtos.findIndex(p => p.codProduto === codProduto);

    if (produtoExistenteIndex !== -1) {
        produtos[produtoExistenteIndex].quantidade -= quantidade;
        if (produtos[produtoExistenteIndex].quantidade <= 0) {
            produtos.splice(produtoExistenteIndex, 1);
        }
        localStorage.setItem('produtos', JSON.stringify(produtos));
    } else {
        alert('Produto não encontrado no estoque!');
    }

    document.getElementById('produtoForm').reset();
    exibirProdutosSalvos();
});

function exibirProdutosSalvos() {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    if (!Array.isArray(produtos)) {
        produtos = [];
    }

    let produtosHTML = produtos.map(produto => {
        return `
            <tr>
                <td>${produto.codProduto}</td>
                <td>${produto.nomeProduto}</td>
                <td>${produto.descricaoProduto}</td>
                <td>${produto.quantidade}</td>
            </tr>
        `;
    }).join('');
    document.getElementById('produtosTableBody').innerHTML = produtosHTML;
}

document.addEventListener('DOMContentLoaded', exibirProdutosSalvos);
