function carregarPaginaPrincipal(fornecedoresParaSeremCarregados = null) {
    let DadosLocalStorage = localStorage.getItem('fornecedores');
    if (DadosLocalStorage == null) {
        localStorage.setItem('fornecedores', JSON.stringify([]));
    } else if (fornecedoresParaSeremCarregados != null) {
        localStorage.setItem('fornecedores', JSON.stringify(fornecedoresParaSeremCarregados));
    }

    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);

        let fornecedoresHTML = fornecedoresObj.map(fornecedor => {
            return `
                <tr id="${fornecedor.id}" style="cursor: pointer;" onclick="selecionarFornecedor(${fornecedor.id})">
                    <td>${fornecedor.nomeFornecedores}</td>
                    <td>${fornecedor.email}</td>
                    <td>${fornecedor.telefone}</td>
                    <td>${fornecedor.cidadeFornecedores}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); excluirFornecedor(${fornecedor.id})"><i class="bi bi-dash-circle-fill"></i></button>
                    </td>
                </tr>
            `;
        }).join('');

        document.getElementById('fornecedoresTableBody').innerHTML = fornecedoresHTML;
    } else {
        alert('Nenhum fornecedor encontrado no Local Storage!');
    }
}

function excluirFornecedor(id) {
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        fornecedoresObj = fornecedoresObj.filter(fornecedor => fornecedor.id !== id);
        localStorage.setItem('fornecedores', JSON.stringify(fornecedoresObj));
        carregarPaginaPrincipal();
    }
}

function selecionarFornecedor(id) {
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        let fornecedorSelecionado = fornecedoresObj.find(fornecedor => fornecedor.id === id);
        if (fornecedorSelecionado) {
            localStorage.setItem('fornecedoresSelecionado', JSON.stringify(fornecedorSelecionado));
            window.location.href = 'perfil-fornecedor.html';
        }
    }
}

document.querySelector('#nomeFornecedor').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-descricao');
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        if (iconeDescricao.className == 'bi bi-sort-alpha-up-alt') {
            fornecedoresObj.sort((a, b) => a.nomeFornecedores.localeCompare(b.nomeFornecedores));
            iconeDescricao.className = 'bi bi-sort-alpha-down';
        } else {
            fornecedoresObj.sort((a, b) => b.nomeFornecedores.localeCompare(a.nomeFornecedores));
            iconeDescricao.className = 'bi bi-sort-alpha-up-alt';
        }
        carregarPaginaPrincipal(fornecedoresObj);
    }
});

document.querySelector('#cidadeFornecedor').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-quantidade');
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        if (iconeDescricao.className == 'bi bi-sort-numeric-up-alt') {
            fornecedoresObj.sort((a, b) => a.cidadeFornecedores.localeCompare(b.cidadeFornecedores));
            iconeDescricao.className = 'bi bi-sort-numeric-down';
        } else {
            fornecedoresObj.sort((a, b) => b.cidadeFornecedores.localeCompare(a.cidadeFornecedores));
            iconeDescricao.className = 'bi bi-sort-numeric-up-alt';
        }
        carregarPaginaPrincipal(fornecedoresObj);
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    carregarPaginaPrincipal();
});