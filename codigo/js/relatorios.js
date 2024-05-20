document.getElementById('filtrarButton').addEventListener('click', function() {
    const isGraph = document.getElementById('reportTypeSwitch').checked;
    const reportContainer = document.getElementById('reportContainer');
    reportContainer.innerHTML = '';

    if (isGraph) {
        const canvas = document.createElement('canvas');
        canvas.id = 'reportChart';
        reportContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const data = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
            datasets: [{
                label: 'Entradas',
                data: [10, 40, 30, 40, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Saídas',
                data: [5, 15, 25, 35, 45],
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
    window.location.href = 'index.html';
});