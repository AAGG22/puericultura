// Configuración global para mostrar porcentajes
Chart.register(ChartDataLabels);

// Población total (100%)
const poblacion = 1000; // Ejemplo: 1000 personas

// Datos de todos los gráficos (fácil de escalar)
const datosGraficos = {
    grafico1: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        valores: [200, 400, 300, 500],
        titulo: "Ventas por Mes (2024)",
        colores: [  // Colores personalizados para cada barra (RGBA o HEX)
            'rgba(255, 99, 132, 0.6)',  // Rojo
            'rgba(54, 162, 235, 0.6)',  // Azul
            'rgba(255, 206, 86, 0.6)',  // Amarillo
            'rgba(75, 192, 192, 0.6)'   // Verde
        ]
    },
    grafico2: {
        labels: ["Norte", "Sur", "Este", "Oeste"],
        valores: [150, 300, 450, 100],
        titulo: "Distribución por Región",
        colores: [  // Colores en hexadecimal
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
        ]
    }
    // Añadir más gráficos con sus colores...
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
    
    if (miGrafico) miGrafico.destroy();

    miGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.labels,
            datasets: [{
                label: datos.titulo,
                data: datos.valores,
                backgroundColor: datos.colores,  // Usamos los colores del gráfico
                borderColor: datos.colores.map(color => color.replace('0.6', '1')), // Borde más opaco
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (value) => calcularPorcentajes([value])[0],
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