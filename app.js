let chart;

function initChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.bars.map(bar => bar.name),
            datasets: [{
                label: data.yAxisLabel,
                data: data.bars.map(bar => bar.value),
                backgroundColor: data.bars.map(bar => bar.color),
                borderColor: data.bars.map(bar => bar.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: data.chartTitle,
                    font: { size: 18 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: data.xAxisLabel },
                    grid: { color: data.gridColor }
                },
                y: {
                    title: { display: true, text: data.yAxisLabel },
                    grid: { color: data.gridColor },
                    beginAtZero: true
                }
            }
        }
    });
}

async function loadChartList() {
    try {
        const response = await fetch('/graficos/list');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const files = await response.json();
        const select = document.getElementById('chartSelect');
        select.innerHTML = '';
        if (files.length === 0) {
            select.innerHTML = '<option value="">No hay gráficos disponibles</option>';
            return;
        }
        files.forEach(file => {
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file.replace('.json', '');
            select.appendChild(option);
        });
        loadChart(files[0]);
    } catch (error) {
        console.error('Error al cargar la lista de gráficos:', error);
        document.getElementById('chartSelect').innerHTML = '<option value="">Error al cargar gráficos</option>';
    }
}

async function loadChart(file) {
    try {
        const response = await fetch(`/graficos/${file}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        initChart(data);
    } catch (error) {
        console.error('Error al cargar el gráfico:', error);
        alert('Error al cargar el archivo JSON');
    }
}

document.getElementById('chartSelect').addEventListener('change', (e) => {
    if (e.target.value) loadChart(e.target.value);
});

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    if (chart) {
        const isDark = document.body.classList.contains('dark');
        chart.options.scales.x.grid.color = isDark ? 'rgba(255, 255, 255, 0.2)' : chart.data.datasets[0].data.gridColor || 'rgba(128, 128, 128, 0.2)';
        chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.2)' : chart.data.datasets[0].data.gridColor || 'rgba(128, 128, 128, 0.2)';
        chart.update();
    }
});

loadChartList();