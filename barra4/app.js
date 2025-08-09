// Configuración global para mostrar porcentajes
Chart.register(ChartDataLabels);

// Población total (100%)
const poblacion = 1000; // Ejemplo: 1000 personas

// Datos de todos los gráficos (fácil de escalar)
const datosGraficos = {
    grafico1: {
        labels: ["No Requiere Asistencia", "Requiere asistencia"],
        valores: [285, 212],
        titulo: "Binomios Asistidos",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    },
    grafico2: {
        labels: ["Operación por Cesárea", "Parto Natural"],
        valores: [251, 238],
        titulo: "Finalización de embarazos",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    },
    grafico3: {
        labels: ["NEO", "RPM", "SIC", "UTIGO", "C.Externa"],
        valores: [6, 79, 416, 6, 0],
        titulo: "Sector de Consulta",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    },
    grafico4: {
        labels: ["Beneficios", "Transición Láctea", "Frecuencia Alimentación", "Regla de Oro", "Tec. Prendida de pecho", "Banco Leche", "ALAS Humana", "Señales de hambre", "Lavado de Manos", "Prevención BOL", "Envío Info Wapp"],
        valores: [494, 494, 494, 494, 494, 212, 450, 494, 495, 495, 495, 495],
        titulo: "Capacitación en Puericultura",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    },
    grafico5: {
        labels: ["Pecho Exclusivo", "Lactancia Mixta", "Leche de Fórmula", "Lactancia Suspendida"],
        valores: [436, 60, 1, 0],
        titulo: "Tipo de Lactancia xx",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }
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
document.getElementById('miGrafico').addEventListener('change', (e) => {
    renderizarGrafico(e.target.value);
});

// Cargar primer gráfico por defecto
renderizarGrafico('grafico5');