const datosGraficos = {
    // ... (otros gráficos)
    grafico4: {
        tipo: "equipo", // ¡Esta línea es clave!
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

function renderizarGrafico(idGrafico) {
    const datos = datosGraficos[idGrafico];
    const ctx = document.getElementById('miGrafico');
    const tituloGrafico = document.getElementById('titulo-grafico');

    if (!datos) return; // Si no existen datos, salir

    // Limpiar contenedor
    ctx.innerHTML = '';
    tituloGrafico.textContent = datos.titulo;

    // Destruir gráfico anterior si existe
    if (miGrafico) {
        miGrafico.destroy();
    }

    // Renderizar equipo (si es tipo "equipo")
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
        return; // ¡Importante: Salir de la función después de renderizar el equipo!
    }

    // Renderizar gráfico (si no es equipo)
    const chartCtx = ctx.getContext('2d');
    miGrafico = new Chart(chartCtx, {
        // ... (configuración del gráfico)
    });
}