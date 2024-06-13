const fornecedores = [
    {
        "id": 1,
        "nomeFornecedores": "Sadia",
        "dataEntrega": "23-01-2024",
        "cidadeFornecedores": "Belo Horizonte"
    },
    {
        "id": 2,
        "nomeFornecedores": "Ambev",
        "dataEntrega": "13-05-2024",
        "cidadeFornecedores": "São Paulo"
    },
    {
        "id": 3,
        "nomeFornecedores": "Coca Cola",
        "dataEntrega": "19-04-2024",
        "cidadeFornecedores": "Belo Horizonte"
    },
    {
        "id": 4,
        "nomeFornecedores": "Guarana",
        "dataEntrega": "25-03-2024",
        "cidadeFornecedores": "Belo Horizonte"
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
                <tr id="${fornecedor.id}">
                    <td>${fornecedor.nomeFornecedores}</td>
                    <td>${fornecedor.dataEntrega}</td>
                    <td>${fornecedor.cidadeFornecedores}</td>
                    <td>
                        <button class="btn btn-danger btn-sm"><i class="bi bi-dash-circle-fill"></i></button>
                        <button class="btn btn-success btn-sm"><i class="bi bi-plus-circle-fill"></i></button>
                    </td>
                </tr>
            `;
        }).join('');

        document.getElementById('produtosTableBody').innerHTML = fornecedoresHTML;
    } else {
        alert('Nenhum fornecedor encontrado no Local Storage!');
    }

    document.querySelectorAll('tr').forEach(linha => {
        linha.addEventListener('click', function () {
            const arrayJSON = localStorage.getItem('fornecedores');
            if (arrayJSON) {
                let array = JSON.parse(arrayJSON);
                let idProcurado = parseInt(linha.id);
                if (Array.isArray(array.fornecedores)) {
                    let objetoEncontrado = array.fornecedores.find(objeto => objeto.id === idProcurado);
                    console.log('Objeto Encontrado ->', objetoEncontrado);
                    const objetoEncontradoString = JSON.stringify(objetoEncontrado)
                    localStorage.setItem('fornecedoresSelecionado', objetoEncontradoString)

                    window.location.href = 'edicao-fornecedor.html';
                }
            }
        })
    });
}

document.querySelector('#nomeFornecedor').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-descricao');
    if (iconeDescricao.className == 'bi bi-sort-alpha-up-alt') {
        iconeDescricao.className = 'bi bi-sort-alpha-down';
    } else {
        iconeDescricao.className = 'bi bi-sort-alpha-up-alt';
    }
});

document.querySelector('#dataEntrega').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-quantidade');
    if (iconeDescricao.className == 'bi bi-sort-numeric-up-alt') {
        iconeDescricao.className = 'bi bi-sort-numeric-down';
    } else {
        iconeDescricao.className = 'bi bi-sort-numeric-up-alt';
    }
});

document.querySelector('#cidadeFornecedor').addEventListener('click', function () {
    let iconeDescricao = document.querySelector('#icone-quantidade');
    if (iconeDescricao.className == 'bi bi-sort-numeric-up-alt') {
        iconeDescricao.className = 'bi bi-sort-numeric-down';
    } else {
        iconeDescricao.className = 'bi bi-sort-numeric-up-alt';
    }
});
