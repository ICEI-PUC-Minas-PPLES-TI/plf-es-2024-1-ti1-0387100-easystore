document.addEventListener('DOMContentLoaded', function () {
    const addFornecedorSelect = document.getElementById('addFornecedor');
    const fornecedorForm = document.getElementById('fornecedorForm');
    const addButton = document.getElementById('add');
    const closeIcon = document.getElementById('closeIcon');

    addFornecedorSelect.addEventListener('change', function () {
        if (this.value === 'sim') {
            fornecedorForm.classList.remove('hidden');
        } else {
            fornecedorForm.classList.add('hidden');
        }
    });


    addButton.addEventListener('click', function () {

        const codProduto = document.getElementById('codProduto').value;
        const nomeProduto = document.getElementById('nomeProduto').value;
        const quantidade = document.getElementById('quantidade').value;
        const descricaoProduto = document.getElementById('descricaoProduto').value;

        let fornecedor = null;
        if (addFornecedorSelect.value === 'sim') {
            const nomeFornecedor = document.getElementById('nomeFornecedor').value;
            const dataEntrega = document.getElementById('dataEntrega').value;
            const cidadeFornecedor = document.getElementById('cidadeFornecedor').value;

            fornecedor = {
                nomeFornecedor: nomeFornecedor,
                dataEntrega: dataEntrega,
                cidadeFornecedor: cidadeFornecedor
            };
        }

        // Criar um objeto para armazenar os dados
        const produto = {
            codProduto: codProduto,
            nomeProduto: nomeProduto,
            quantidade: quantidade,
            descricaoProduto: descricaoProduto,
            fornecedor: fornecedor
        };

        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

        produtos.push(produto);

        localStorage.setItem('produtos', JSON.stringify(produtos));

        
        document.getElementById('produtoForm').reset();
        fornecedorForm.classList.add('hidden');
        addFornecedorSelect.value = 'nao';
    });

    
    closeIcon.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});
