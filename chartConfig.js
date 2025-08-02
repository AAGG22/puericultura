export const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#aaaaaa"
      }
    },
    title: {
      display: true,
      text: "",
      color: "#aaaaaa",
      font: { size: 24 }
    },
    datalabels: {
      color: "#ffffff",
      anchor: "end",
      align: "top",
      formatter: function (value, context) {
        const data = context.chart.data.datasets[0].data;
        const total = data.reduce((a, b) => a + b, 0);
        const porcentaje = ((value / total) * 100).toFixed(1);
        return `${porcentaje}%`;
      },
      font: {
        weight: 'bold'
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Cantidad",
        color: "#aaaaaa",
        font: { size: 16 }
      },
      ticks: { color: "#aaaaaa" },
      grid: { color: "#444444" }
    },
    x: {
      title: {
        display: true,
        text: "Categoría",
        color: "#aaaaaa",
        font: { size: 16 }
      },
      ticks: { color: "#aaaaaa" },
      grid: { color: "#444444" }
    }
  }
};
