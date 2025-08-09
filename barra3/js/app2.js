// Registrar plugins (¡ESTO ES ESENCIAL!)
Chart.register(ChartDataLabels);

// Datos para C.L.M. 2024
const datosGraficos = {
    grafico1: {
        labels: ["Norte", "Sur", "Este", "Oeste"],
        valores: [150, 300, 450, 100],
        titulo: "C.L.M. 2024 - Distribución Regional",
        colores: ['#8A2BE2', '#20B2AA', '#FF4500', '#4682B4']
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
    
    if (miGrafico) miGrafico.destroy();

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
                    formatter: (v) => `${(v/1000*100).toFixed(1)}%`,
                    font: { weight: 'bold' }
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Inicialización (¡IMPORTANTE!)
document.addEventListener('DOMContentLoaded', () => {
    actualizarSelect();
    renderizarGrafico('grafico1');
    
    document.getElementById('selectorGraficos').addEventListener('change', (e) => {
        renderizarGrafico(e.target.value);
    });
});