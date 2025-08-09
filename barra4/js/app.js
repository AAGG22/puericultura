// Configuración global para mostrar porcentajes
Chart.register(ChartDataLabels);

// Población total (100%)
const poblacion = 1000; // Ejemplo: 1000 personas

// Datos de todos los gráficos (fácil de escalar)
const datosGraficos = {
    grafico1: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        valores: [200, 400, 300, 500], // Valores absolutos
        titulo: "Ventas por Mes (2024)"
    },
    grafico2: {
        labels: ["Norte", "Sur", "Este", "Oeste"],
        valores: [150, 300, 450, 100],
        titulo: "Distribución por Región"
    }
    // Añadir más gráficos aquí...
};

// Función para calcular porcentajes
function calcularPorcentajes(valores) {
    return valores.map(valor => (valor / poblacion * 100).toFixed(1) + "%");
}

// Inicializar gráfico
let miGrafico;

function renderizarGrafico(idGrafico) {
    const datos = datosGraficos[idGrafico];
    const porcentajes = calcularPorcentajes(datos.valores);

    const ctx = document.getElementById('miGrafico').getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (miGrafico) miGrafico.destroy();

    miGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.labels,
            datasets: [{
                label: datos.titulo,
                data: datos.valores,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (value) => calcularPorcentajes([value])[0], // Muestra el porcentaje
                    font: { weight: 'bold' }
                },
                title: {
                    display: true,
                    text: datos.titulo
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Cantidad' }
                }
            }
        }
    });
}

// Evento al cambiar el select
document.getElementById('selectorGraficos').addEventListener('change', (e) => {
    renderizarGrafico(e.target.value);
});

// Cargar primer gráfico por defecto
renderizarGrafico('grafico1');