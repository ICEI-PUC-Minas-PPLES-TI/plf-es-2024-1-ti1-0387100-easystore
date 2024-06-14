const fornecedores = [
    {
        "id": 1,
        "nomeFornecedores": "Sadia",
        "dataEntrega": "2024-01-23",
        "cidadeFornecedores": "Belo Horizonte",
        "email": "contato@sadia.com",
        "endereço": "Rua Frango Assado, 123",
        "telefone": "1234-5678"
    },
    {
        "id": 2,
        "nomeFornecedores": "Ambev",
        "dataEntrega": "2024-05-13",
        "cidadeFornecedores": "São Paulo",
        "email": "contato@ambev.com",
        "endereço": "Avenida Paulista, 456",
        "telefone": "8765-4321"
    },
    {
        "id": 3,
        "nomeFornecedores": "Coca Cola",
        "dataEntrega": "2024-04-19",
        "cidadeFornecedores": "Belo Horizonte",
        "email": "contato@cocacola.com",
        "endereço": "Rua Cocs, 789",
        "telefone": "1357-2468"
    },
    {
        "id": 4,
        "nomeFornecedores": "Guarana",
        "dataEntrega": "2024-03-25",
        "cidadeFornecedores": "Belo Horizonte",
        "email": "contato@guarana.com",
        "endereço": "Avenida Professor Antonio, 321",
        "telefone": "2468-1357"
    },
    {
        "id": 5,
        "nomeFornecedores": "Bom Bril",
        "dataEntrega": "2024-12-30",
        "cidadeFornecedores": "Uberlandia",
        "email": "contato@bombril.com",
        "endereço": "Rua Bombras, 777",
        "telefone": "1234-0902"
    },
    {
        "id": 6,
        "nomeFornecedores": "Rexona",
        "dataEntrega": "2024-01-13",
        "cidadeFornecedores": "Rio de Janeiro",
        "email": "contato@rexona.com",
        "endereço": "Rua Rex, 2077",
        "telefone": "9012-7823"
    }
];

document.addEventListener('DOMContentLoaded', (event) => {
    carregarPaginaPrincipal();
});

function carregarPaginaPrincipal(fornecedoresParaSeremCarregados = null) {
    let DadosLocalStorage = localStorage.getItem('fornecedores');
    if (DadosLocalStorage == null) {
        const fornecedoresJSON = JSON.stringify({ "fornecedores": fornecedores });
        localStorage.setItem('fornecedores', fornecedoresJSON);
    } else if (fornecedoresParaSeremCarregados != null) {
        const fornecedoresJSON = JSON.stringify({ "fornecedores": fornecedoresParaSeremCarregados });
        localStorage.setItem('fornecedores', fornecedoresJSON);
    }

    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);

        let fornecedoresHTML = fornecedoresObj.fornecedores.map(fornecedor => {
            return `
                <tr id="${fornecedor.id}" onclick="mostrarPerfil(${fornecedor.id})" style="cursor: pointer;">
                    <td>${fornecedor.nomeFornecedores}</td>
                    <td>${fornecedor.dataEntrega}</td>
                    <td>${fornecedor.cidadeFornecedores}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); excluirFornecedor(${fornecedor.id})"><i class="bi bi-dash-circle-fill"></i></button>
                        <button class="btn btn-success btn-sm" onclick="event.stopPropagation(); mostrarPerfil(${fornecedor.id})"><i class="bi bi-plus-circle-fill"></i></button>
                    </td>
                </tr>
            `;
        }).join('');

        document.getElementById('produtosTableBody').innerHTML = fornecedoresHTML;
    } else {
        alert('Nenhum fornecedor encontrado no Local Storage!');
    }
}

function excluirFornecedor(id) {
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        fornecedoresObj.fornecedores = fornecedoresObj.fornecedores.filter(fornecedor => fornecedor.id !== id);
        localStorage.setItem('fornecedores', JSON.stringify(fornecedoresObj));
        carregarPaginaPrincipal();
    }
}

function mostrarPerfil(id) {
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        let fornecedor = fornecedoresObj.fornecedores.find(fornecedor => fornecedor.id === id);
        if (fornecedor) {
            localStorage.setItem('fornecedoresSelecionado', JSON.stringify(fornecedor));
            window.location.href = 'perfil-fornecedor.html';
        }
    }
}

// Ordenação por nome
document.querySelector('#nomeFornecedor').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-descricao');
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        if (iconeDescricao.className == 'bi bi-sort-alpha-up-alt') {
            fornecedoresObj.fornecedores.sort((a, b) => a.nomeFornecedores.localeCompare(b.nomeFornecedores));
            iconeDescricao.className = 'bi bi-sort-alpha-down';
        } else {
            fornecedoresObj.fornecedores.sort((a, b) => b.nomeFornecedores.localeCompare(a.nomeFornecedores));
            iconeDescricao.className = 'bi bi-sort-alpha-up-alt';
        }
        carregarPaginaPrincipal(fornecedoresObj.fornecedores);
    }
});

// Ordenação por data de entrega
document.querySelector('#dataEntrega').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-quantidade');
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        if (iconeDescricao.className == 'bi bi-sort-numeric-up-alt') {
            fornecedoresObj.fornecedores.sort((a, b) => new Date(a.dataEntrega) - new Date(b.dataEntrega));
            iconeDescricao.className = 'bi bi-sort-numeric-down';
        } else {
            fornecedoresObj.fornecedores.sort((a, b) => new Date(b.dataEntrega) - new Date(a.dataEntrega));
            iconeDescricao.className = 'bi bi-sort-numeric-up-alt';
        }
        carregarPaginaPrincipal(fornecedoresObj.fornecedores);
    }
});

// Ordenação por cidade
document.querySelector('#cidadeFornecedor').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-quantidade');
    let fornecedoresData = localStorage.getItem('fornecedores');
    if (fornecedoresData) {
        let fornecedoresObj = JSON.parse(fornecedoresData);
        if (iconeDescricao.className == 'bi bi-sort-numeric-up-alt') {
            fornecedoresObj.fornecedores.sort((a, b) => a.cidadeFornecedores.localeCompare(b.cidadeFornecedores));
            iconeDescricao.className = 'bi bi-sort-numeric-down';
        } else {
            fornecedoresObj.fornecedores.sort((a, b) => b.cidadeFornecedores.localeCompare(a.cidadeFornecedores));
            iconeDescricao.className = 'bi bi-sort-numeric-up-alt';
        }
        carregarPaginaPrincipal(fornecedoresObj.fornecedores);
    }
});
