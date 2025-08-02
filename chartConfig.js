import { baseOptions } from './chartConfig.js';

// Asegurate de registrar el plugin
Chart.register(ChartDataLabels);

let chartInstance = null;

async function cargarGraficoDesdeJSON(nombreArchivo, canvasId, titulo = "") {
  const res = await fetch(`datos/${nombreArchivo}`);
  const json = await res.json();

  const ctx = document.getElementById(canvasId).getContext("2d");

  const opciones = structuredClone(baseOptions);
  if (titulo) opciones.plugins.title.text = titulo;

  // Activar el plugin de etiquetas con cálculo real de porcentaje
  opciones.plugins.datalabels = {
    color: '#fff',
    anchor: 'end',
    align: 'top',
    formatter: function (value, context) {
      const data = context.chart.data.datasets[0].data;
      const total = data.reduce((a, b) => a + b, 0);
      const porcentaje = ((value / total) * 100).toFixed(1);
      return `${porcentaje}%`;
    },
    font: {
      weight: 'bold'
    }
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: json.type || "bar",
    data: json.data,
    options: opciones,
    plugins: [ChartDataLabels]
  });
}

async function cargarOpcionesDeSelector() {
  const res = await fetch("datos/lista.json");
  const lista = await res.json();
  const selector = document.getElementById("selectorGrafico");

  lista.forEach((item) => {
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
