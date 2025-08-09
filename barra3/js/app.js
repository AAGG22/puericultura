// Registrar plugins
Chart.register(ChartDataLabels);

// Datos para S.I.C. 2024
const datosGraficos = {
    grafico1: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        valores: [200, 400, 300, 500],
        titulo: "S.I.C. 2024 - Ventas Mensuales",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    },
        grafico2: {
        labels: ["Mayo", "Junio", "Julio", "Agosto"],
        valores: [700, 100, 245, 500],
        titulo: "S.I.C. 2024 - Ventas Mensuales",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }
};

// Variables globales
let miGrafico = null;

// Llenar select
function actualizarSelect() {
    const select = document.getElementById('selectorGraficos');
    select.innerHTML = '';

    Object.keys(datosGraficos).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = datosGraficos[key].titulo;
        select.appendChild(option);
    });
}

// Renderizar gráfico
function renderizarGrafico(idGrafico) {
    const datos = datosGraficos[idGrafico];
    if (!datos) return;

    const ctx = document.getElementById('miGrafico').getContext('2d');

    // Destruir gráfico anterior
    if (miGrafico) {
        miGrafico.destroy();
    }

    miGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.labels,
            datasets: [{
                label: datos.titulo,
                data: datos.valores,
                backgroundColor: datos.colores,
                borderColor: datos.colores.map(c => c.includes('rgba') ? c.replace('0.6', '1') : c),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (v) => `${(v / 1000 * 100).toFixed(1)}%`,
                    font: { weight: 'bold' }
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarSelect();
    renderizarGrafico('grafico1');

    document.getElementById('selectorGraficos').addEventListener('change', (e) => {
        renderizarGrafico(e.target.value);
    });
});

// Forzar redibujado al cambiar tamaño
window.addEventListener('resize', () => {
    if (miGrafico) {
        miGrafico.resize();
    }
});