document.addEventListener('DOMContentLoaded', (event) => {
    carregarTela();
});

function edit() {
    document.querySelectorAll('.form-control').forEach(element => {
        element.disabled = false;
    });

    document.getElementById('btnEdit').disabled = true;
    document.getElementById('btnCancelar').disabled = false;
    document.getElementById('btnSalvar').disabled = false;
}

function cancelar() {
    carregarTela();

    document.querySelectorAll('.form-control').forEach(element => {
        element.disabled = true;
    });

    document.getElementById('btnEdit').disabled = false;
    document.getElementById('btnCancelar').disabled = true;
    document.getElementById('btnSalvar').disabled = true;
}

function salvar() {
    const produto = {
        nome: document.getElementById('nome').value,
        qnt: document.getElementById('qnt').value,
        preco: document.getElementById('preco').value,
        codBarras: document.getElementById('codBarras').value,
        desc: document.getElementById('desc').value,
        dtCriacao: document.getElementById('dtCriacao').value,
        dtAtualiza: document.getElementById('dtAtualiza').value
    };

    localStorage.setItem('produto', JSON.stringify(produto));
    alert('Produto salvo com sucesso!');

    cancelar();
}

function carregarTela() {
    const produto = JSON.parse(localStorage.getItem('produto'));

    if (produto) {
        document.getElementById('nome').value = produto.nome;
        document.getElementById('qnt').value = produto.qnt;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('codBarras').value = produto.codBarras;
        document.getElementById('desc').value = produto.desc;
        document.getElementById('dtCriacao').value = produto.dtCriacao;
        document.getElementById('dtAtualiza').value = produto.dtAtualiza;
    }
}