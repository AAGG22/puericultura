// app.js - Estructura modular
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const datosGraficos = {
    grafico1: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        valores: [200, 400, 300, 500],
        titulo: "S.I.C. 2024 - Ventas Mensuales",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }
};

export function init() {
    // Limpiar select
    const select = document.getElementById('selectorGraficos');
    select.innerHTML = '';
    
    // Llenar select
    Object.entries(datosGraficos).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value.titulo;
        select.appendChild(option);
    });
    
    // Renderizar primer gráfico
    renderizarGrafico('grafico1');
    
    // Event listener
    select.addEventListener('change', (e) => {
        renderizarGrafico(e.target.value);
    });
}

function renderizarGrafico(idGrafico) {
    const datos = datosGraficos[idGrafico];
    const ctx = document.getElementById('miGrafico').getContext('2d');
    
    if (window.currentChart) {
        window.currentChart.destroy();
    }
    
    window.currentChart = new Chart(ctx, {
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
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (v) => `${(v/1000*100).toFixed(1)}%`,
                    font: { weight: 'bold' }
                }
            }
        }
    });
}