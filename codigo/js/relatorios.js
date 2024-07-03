document.getElementById('filtrarButton').addEventListener('click', function() {
    const isGraph = document.getElementById('reportTypeSwitch').checked;
    const reportContainer = document.getElementById('reportContainer');
    reportContainer.innerHTML = '';

    if (isGraph) {
        const canvas = document.createElement('canvas');
canvas.id = 'reportChart';
reportContainer.appendChild(canvas);

let movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];
let codbarra = Number(document.getElementById('codbarra').value);
let startDate = new Date(document.getElementById('startDate').value);
let endDate = new Date(document.getElementById('endDate').value);

// Ajustar a data final para incluir o final do dia
endDate.setHours(23, 59, 59, 999);

var produtosObj = JSON.parse(localStorage.getItem('produtos')) || [];
console.log(produtosObj);
console.log(codbarra);
var produto = produtosObj.produtos.find(p => p.codBarras === codbarra);
if (!produto) {
        alert('Produto não encontrado!');
        return; // Interrompe a execução se o produto não for encontrado
    }
movimentacoes = movimentacoes.filter(mov => {
	let movDate = new Date(mov.data);
	return (!codbarra || mov.id_produto === produto.id);
});
const ctx = canvas.getContext('2d');

// Processar os dados para criar etiquetas e valores
let labels = [];
let entradas = [];
let saidas = [];

movimentacoes.forEach(mov => {
    let data = new Date(mov.data);
    let mesAno = data.toLocaleString('default', { month: 'long' }) + ' ' + data.getFullYear();

    if (!labels.includes(mesAno)) {
        labels.push(mesAno);
        entradas[labels.indexOf(mesAno)] = 0;
        saidas[labels.indexOf(mesAno)] = 0;
    }

    if (mov.tipo_movimentacao === 'E') {
        entradas[labels.indexOf(mesAno)] += mov.quantidade_movimentacao;
    } else if (mov.tipo_movimentacao === 'S') {
        saidas[labels.indexOf(mesAno)] += mov.quantidade_movimentacao;
    }
});

const data = {
    labels: labels,
    datasets: [{
        label: 'Entradas',
        data: entradas,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    },
    {
        label: 'Saídas',
        data: saidas,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
    }]
};

new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

    } else {
        const textReport = `
            <h3>Relatório de Entrada e Saída por Produto</h3>
            <p>SKU: ${document.getElementById('sku').value}</p>
            <p>Período: ${document.getElementById('startDate').value} até ${document.getElementById('endDate').value}</p>
            <ul >
                <li>Janeiro: Entradas - 10, Saídas - 5</li>
                <li>Fevereiro: Entradas - 20, Saídas - 15</li>
                <li>Março: Entradas - 30, Saídas - 25</li>
                <li>Abril: Entradas - 40, Saídas - 35</li>
                <li>Maio: Entradas - 50, Saídas - 45</li>
            </ul>
        `;
        reportContainer.innerHTML = textReport;
    }
});

document.getElementById('exitButton').addEventListener('click', function() {
    window.location.href = 'menu-principal.html';
});