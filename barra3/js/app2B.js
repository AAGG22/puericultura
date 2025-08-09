Chart.register(ChartDataLabels);

const datosGraficos = {
    grafico1: {
        labels: ["Femenino", "Masculino","EG 34-36", "EG 37", "38-41"],
        valores: [107, 105, 13, 23, 156],
        titulo: "212 Binomios que Requieren Asistencia",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }
};

let miGrafico;

function renderizarGrafico(idGrafico) {
    const datos = datosGraficos[idGrafico];
    if (!datos) return;

    const ctx = document.getElementById('miGrafico').getContext('2d');
    if (miGrafico) miGrafico.destroy();

    miGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.labels,
            datasets: [{
                label: datos.titulo,
                data: datos.valores,
                backgroundColor: datos.colores,
                borderColor: datos.colores.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (value) => `${(value/212*100).toFixed(1)}%`,
                    font: { weight: 'bold' }
                },
                legend: { display: false },
                title: {
                    display: true,
                    text: datos.titulo,
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Valores absolutos' }
                }
            }
        }
    });
}

// Eventos
document.getElementById('selectorGraficos').addEventListener('change', (e) => {
    renderizarGrafico(e.target.value);
});

// Inicializar
renderizarGrafico('grafico1');