import { baseOptions } from './chartConfig.js';

let chartInstance = null;

async function cargarGraficoDesdeJSON(nombreArchivo, canvasId, titulo = "") {
  const res = await fetch(`datos/${nombreArchivo}`);
  const json = await res.json();

  const ctx = document.getElementById(canvasId).getContext("2d");

  const opciones = structuredClone(baseOptions);
  if (titulo) opciones.plugins.title.text = titulo;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: json.type || "bar",
    data: json.data,
    options: opciones
  });
}

async function cargarOpcionesDeSelector() {
  const res = await fetch("datos/lista.json");
  const lista = await res.json();
  const selector = document.getElementById("selectorGrafico");

  lista.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = item.archivo;
    option.textContent = item.titulo;
    selector.appendChild(option);
  });

  if (lista.length > 0) {
    cargarGraficoDesdeJSON(lista[0].archivo, "myChart", lista[0].titulo);
  }

  selector.addEventListener("change", (e) => {
    const selected = lista.find(item => item.archivo === e.target.value);
    cargarGraficoDesdeJSON(selected.archivo, "myChart", selected.titulo);
  });
}

cargarOpcionesDeSelector();
