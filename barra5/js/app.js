class HospitalDashboard {
    constructor() {
        this.dataManager = new DataManager();
        this.chart = null;
        this.currentSection = 'internacion';
        this.currentYear = '2024';
        
        this.init();
    }

    async init() {
        try {
            await this.dataManager.loadData(this.currentYear);
            this.setupEventListeners();
            this.populateChartSelector();
            this.showMainSection(); // Asegurar que se muestre el contenido principal
            this.renderChart();
        } catch (error) {
            console.error('Error inicializando la aplicación:', error);
        }
    }

    setupEventListeners() {
        // Toggle sidebar
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            document.body.classList.toggle('sb-sidenav-toggled');
        });

        // Navegación por año
        document.querySelectorAll('[data-year]').forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                this.currentYear = e.currentTarget.getAttribute('data-year');
                
                // Mostrar sección principal
                this.showMainSection();
                
                await this.dataManager.loadData(this.currentYear);
                this.populateChartSelector();
                this.renderChart();
                this.updateActiveLink(e.currentTarget);
            });
        });

        // Sección desarrollo
        document.querySelector('[data-section="desarrollo"]').addEventListener('click', (e) => {
            e.preventDefault();
            this.showDesarrolloSection();
            this.updateActiveLink(e.currentTarget);
        });

        // Selector de gráficos
        document.getElementById('chartSelector').addEventListener('change', () => {
            this.renderChart();
        });
    }

    showMainSection() {
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('desarrolloContent').style.display = 'none';
    }

    populateChartSelector() {
        const selector = document.getElementById('chartSelector');
        selector.innerHTML = '';

        const metadata = this.dataManager.data.metadata;
        
        // Agregar opciones de Sala de Internación
        Object.keys(metadata.chartTypes.internacion.charts).forEach(chartId => {
            const option = document.createElement('option');
            option.value = `internacion-${chartId}`;
            option.textContent = `S.I.C.: ${metadata.chartTypes.internacion.charts[chartId]}`;
            selector.appendChild(option);
        });

        // Agregar opciones de Centro de Lactancia
        Object.keys(metadata.chartTypes.lactancia.charts).forEach(chartId => {
            const option = document.createElement('option');
            option.value = `lactancia-${chartId}`;
            option.textContent = `C.L.M: ${metadata.chartTypes.lactancia.charts[chartId]}`;
            selector.appendChild(option);
        });
    }

    renderChart() {
        const selector = document.getElementById('chartSelector');
        const [type, chartId] = selector.value.split('-');
        
        const chartData = this.dataManager.getChartData(type, chartId);
        if (!chartData) return;

        const ctx = document.getElementById('myChart').getContext('2d');

        // Destruir gráfico anterior si existe
        if (this.chart) {
            this.chart.destroy();
        }

        // Calcular porcentajes
        const percentages = chartData.values.map(value => 
            parseFloat(this.dataManager.calculatePercentage(value, chartData.population))
        );

        // Crear nuevo gráfico con porcentajes
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Porcentaje',
                    data: percentages,
                    backgroundColor: chartData.colors,
                    borderColor: chartData.colors,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = chartData.values[context.dataIndex];
                                const percentage = percentages[context.dataIndex];
                                return `${context.label}: ${value} (${percentage}%)`;
                            }
                        }
                    },
                    datalabels: {
                        display: true,
                        color: '#000',
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => value + '%'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            },
            plugins: [{
                afterDraw: function(chart) {
                    var ctx = chart.ctx;
                    ctx.save();
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    
                    chart.data.datasets.forEach((dataset, i) => {
                        chart.getDatasetMeta(i).data.forEach((bar, index) => {
                            var data = dataset.data[index] + '%';
                            ctx.fillText(data, bar.x, bar.y - 5);
                        });
                    });
                    ctx.restore();
                }
            }]
        });

        // Actualizar título e información
        document.getElementById('chartTitle').textContent = chartData.title;
        document.getElementById('chartInfo').textContent = 
            `Población total: ${chartData.population} pacientes | Año: ${this.currentYear}`;
    }

    showDesarrolloSection() {
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('desarrolloContent').style.display = 'block';
    }

    updateActiveLink(activeLink) {
        // Remover active de todos
        document.querySelectorAll('.list-group-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Agregar active al actual
        activeLink.classList.add('active');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new HospitalDashboard();
});