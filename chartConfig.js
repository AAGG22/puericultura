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
