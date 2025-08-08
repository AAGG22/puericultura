class GestorGraficos {
    constructor() {
        this.chart = null;
        this.graficosDisponibles = [];
        this.urlBase = 'graficos/'; // Cambiar según tu estructura
        
        this.init();
    }
    
    async init() {
        // Cargar lista de gráficos disponibles
        await this.cargarListaGraficos();
        
        // Configurar eventos
        document.getElementById('selector-graficos').addEventListener('change', (e) => {
            this.cargarGrafico(e.target.value);
        });
        
        // Cargar primer gráfico por defecto
        if (this.graficosDisponibles.length > 0) {
            this.cargarGrafico(this.graficosDisponibles[0].archivo);
        }
    }
    
    async cargarListaGraficos() {
        try {
            // En producción, esto podría ser una API o lista estática
            this.graficosDisponibles = [
                { nombre: 'Centro Lactancia Materna', archivo: '0_CLM.json' },
                { nombre: 'Sala Internación Conjunta', archivo: '1_SIC.json' }
                // Agregar más gráficos según sea necesario
            ];
            
            const selector = document.getElementById('selector-graficos');
            selector.innerHTML = '';
            
            this.graficosDisponibles.forEach(grafico => {
                const option = document.createElement('option');
                option.value = grafico.archivo;
                option.textContent = grafico.nombre;
                selector.appendChild(option);
            });
            
        } catch (error) {
            console.error('Error al cargar lista de gráficos:', error);
            this.mostrarError('No se pudo cargar la lista de gráficos');
        }
    }
    
    async cargarGrafico(nombreArchivo) {
        try {
            // Mostrar estado de carga
            const canvas = document.getElementById('grafico-principal');
            canvas.style.display = 'none';
            
            // Cargar datos del gráfico
            const response = await fetch(this.urlBase + nombreArchivo);
            if (!response.ok) throw new Error('Error al cargar el archivo');
            
            const datosGrafico = await response.json();
            
            // Renderizar el gráfico
            this.renderizarGrafico(datosGrafico);
            canvas.style.display = 'block';
            
            // Actualizar información adicional
            this.actualizarInfoAdicional(datosGrafico);
            
        } catch (error) {
            console.error('Error al cargar el gráfico:', error);
            this.mostrarError('Error al cargar el gráfico seleccionado');
        }
    }
    
    renderizarGrafico(datos) {
        const ctx = document.getElementById('grafico-principal').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (this.chart) {
            this.chart.destroy();
        }
        
        // Configuración del gráfico
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: datos.bars.map(bar => bar.name),
                datasets: [{
                    label: datos.yAxisLabel,
                    data: datos.bars.map(bar => bar.value),
                    backgroundColor: datos.bars.map(bar => bar.color),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: datos.chartTitle,
                        font: { size: 18 }
                    },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.raw;
                                const total = datos.poblacion;
                                const porcentaje = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                                return `${value} (${porcentaje}%)`;
                            }
                        }
                    }
                },
                scales: {
                    x: { title: { display: true, text: datos.xAxisLabel } },
                    y: { title: { display: true, text: datos.yAxisLabel }, beginAtZero: true }
                }
            }
        });
    }
    
    actualizarInfoAdicional(datos) {
        const infoContainer = document.getElementById('info-adicional');
        infoContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${datos.chartTitle}</h5>
                    <p class="card-text">
                        <strong>Población:</strong> ${datos.poblacion} pacientes<br>
                        <strong>Última actualización:</strong> ${new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        `;
    }
    
    mostrarError(mensaje) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = mensaje;
        
        const contenedor = document.getElementById('contenido-graficos');
        contenedor.insertBefore(errorDiv, contenedor.firstChild);
        
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GestorGraficos();
});