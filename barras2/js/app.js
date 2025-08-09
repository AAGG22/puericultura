// Datos de todos los gráficos y el equipo
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
        tipo: "equipo",
        titulo: "Equipo de Desarrollo",
        equipo: [
            {
                nombre: "Mg. Valeria Flores",
                rol: "Dirección del Proyecto",
                email: "valerianoemiflores.vnf@gmail.com",
                img: "https://ui-avatars.com/api/?name=Valeria+Flores&background=0D6EFD&color=fff&rounded=true"
            },
            {
                nombre: "Tec. Alfredo Galván",
                rol: "Desarrollo web",
                email: "alfredodgalvan@gmail.com",
                img: "https://ui-avatars.com/api/?name=Alfredo+Galvan&background=20C997&color=fff&rounded=true"
            }
        ],
        metodologia: "Estadística descriptiva",
        derechos: "© 2025 Valeria Flores & Alfredo Galván. Todos los derechos reservados."
    }
};

// Configuración global de Chart.js
Chart.register(ChartDataLabels);
let miGrafico = null;

// Función para calcular porcentajes
function calcularPorcentajes(valores, poblacion = 1000) {
    return valores.map(valor => ((valor / poblacion) * 100).toFixed(1) + "%");
}

// Función para renderizar contenido dinámico
function renderizarGrafico(idGrafico) {
    const datos = datosGraficos[idGrafico];
    if (!datos) return; // Prevención de errores

    const ctx = document.getElementById('miGrafico');
    const tituloGrafico = document.getElementById('titulo-grafico');
    
    // Limpiar contenedor
    ctx.innerHTML = '';
    tituloGrafico.textContent = datos.titulo;

    // Destruir gráfico anterior si existe
    if (miGrafico) {
        miGrafico.destroy();
        miGrafico = null;
    }

    // Caso especial: Equipo de desarrollo
    if (datos.tipo === "equipo") {
        ctx.innerHTML = `
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <p class="text-muted mb-4">
                        <i class="fas fa-book me-2"></i><strong>Metodología:</strong> ${datos.metodologia}
                    </p>
                    <div class="row">
                        ${datos.equipo.map(miembro => `
                            <div class="col-md-6 mb-4">
                                <div class="d-flex align-items-start">
                                    <img src="${miembro.img}" alt="${miembro.nombre}" 
                                        class="rounded-circle me-3 shadow-sm" width="60" height="60">
                                    <div>
                                        <h5 class="mb-1">${miembro.nombre}</h5>
                                        <p class="mb-1 text-muted">
                                            <i class="fas fa-briefcase me-2"></i>${miembro.rol}
                                        </p>
                                        <p class="mb-0 text-muted">
                                            <i class="fas fa-envelope me-2"></i>
                                            <a href="mailto:${miembro.email}" class="text-decoration-none">${miembro.email}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <hr>
                    <p class="text-muted small mb-0">
                        <i class="fas fa-copyright me-2"></i>${datos.derechos}
                    </p>
                </div>
            </div>
        `;
        return;
    }

    // Caso normal: Gráficos
    const chartCtx = ctx.getContext('2d');
    const porcentajes = calcularPorcentajes(datos.valores);

    miGrafico = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: datos.labels,
            datasets: [{
                label: datos.titulo,
                data: datos.valores,
                backgroundColor: datos.colores,
                borderColor: datos.colores.map(color => color.includes('rgba') ? color.replace('0.6', '1') : color),
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
                legend: { display: false },
                title: {
                    display: true,
                    text: datos.titulo,
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Valores absolutos' }
                }
            }
        }
    });
}

// Eventos del sidebar
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar a[data-grafico]').forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            const graficoId = e.target.closest('a').getAttribute('data-grafico');
            renderizarGrafico(graficoId);
            
            // Marcar como activo
            document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
            e.target.closest('a').classList.add('active');
        });
    });

    // Cargar primer gráfico por defecto
    const primerGrafico = Object.keys(datosGraficos)[0];
    renderizarGrafico(primerGrafico);
});