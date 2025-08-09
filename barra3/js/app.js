Chart.register(ChartDataLabels);

const datosGraficos = {
    grafico1: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        valores: [200, 400, 300, 500],
        titulo: "Ventas por Mes (2024)",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    },
    grafico2: {
        labels: ["Norte", "Sur", "Este", "Oeste"],
        valores: [150, 300, 450, 100],
        titulo: "Distribución por Región (2024)",
        colores: ['#9966FF', '#00CC99', '#FF9933', '#FF6699']
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
                    formatter: (value) => `${(value/1000*100).toFixed(1)}%`,
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