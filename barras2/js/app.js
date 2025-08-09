// Datos de gráficos (ejemplo)
const datosGraficos = {
    grafico1: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        valores: [200, 400, 300, 500],
        titulo: "S.I.C. 2024",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    },
    grafico2: {
        labels: ["Norte", "Sur", "Este", "Oeste"],
        valores: [150, 300, 450, 100],
        titulo: "C.L.M. 2024",
        colores: ['#9966FF', '#00CC99', '#FF9933', '#FF6699']
    },
    grafico3: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        valores: [600, 300, 200, 700],
        titulo: "S.I.C. 2025",
        colores: ['#FF5733', '#33FF57', '#3357FF', '#F333FF']
    },
    grafico4: {
        labels: ["Frontend", "Backend", "Testing"],
        valores: [400, 600, 200],
        titulo: "Desarrollo",
        colores: ['#8A2BE2', '#20B2AA', '#FF4500']
    }
};

// Configuración global de Chart.js
Chart.register(ChartDataLabels);
let miGrafico;

// Función para renderizar gráficos
function renderizarGrafico(idGrafico) {
    const datos = datosGraficos[idGrafico];
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
                    formatter: (value) => `${((value / 1000) * 100).toFixed(1)}%`, // Población = 1000
                    font: { weight: 'bold' }
                },
                title: {
                    display: true,
                    text: datos.titulo
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Eventos para los enlaces del sidebar
document.querySelectorAll('.sidebar a[data-grafico]').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const graficoId = e.target.getAttribute('data-grafico');
        document.getElementById('titulo-grafico').textContent = datosGraficos[graficoId].titulo;
        renderizarGrafico(graficoId);
    });
});