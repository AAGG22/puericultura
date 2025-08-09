// app.js (S.I.C. 2024)
Chart.register(ChartDataLabels);

const datosGraficos = {
    grafico1: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        valores: [200, 400, 300, 500],
        titulo: "S.I.C. 2024 - Ventas Mensuales",
        colores: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    }
};

let miGrafico = null;

function actualizarSelect() {
    const select = document.getElementById('selectorGraficos');
    select.innerHTML = Object.entries(datosGraficos).map(([key, value]) => 
        `<option value="${key}">${value.titulo}</option>`
    ).join('');
}

function renderizarGrafico(idGrafico) {
    if (miGrafico) miGrafico.destroy();
    
    const datos = datosGraficos[idGrafico];
    const ctx = document.getElementById('miGrafico').getContext('2d');
    
    miGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.labels,
            datasets: [{
                label: datos.titulo,
                data: datos.valores,
                backgroundColor: datos.colores,
                borderColor: datos.colores.map(c => c.replace('0.6', '1')),
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
            }
        }
    });
}

// Inicialización
actualizarSelect();
renderizarGrafico('grafico1');

document.getElementById('selectorGraficos').addEventListener('change', (e) => {
    renderizarGrafico(e.target.value);
});