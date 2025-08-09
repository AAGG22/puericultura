class DataManager {
    constructor() {
        this.data = {};
        this.currentYear = '2024';
    }

    async loadData(year) {
        try {
            const [internacion, lactancia, metadata] = await Promise.all([
                fetch(`data/internacion.json`).then(r => r.json()),
                fetch(`data/lactancia.json`).then(r => r.json()),
                fetch(`data/metadata.json`).then(r => r.json())
            ]);

            this.data = {
                internacion: internacion[year],
                lactancia: lactancia[year],
                metadata: metadata
            };

            return this.data;
        } catch (error) {
            console.error('Error cargando datos:', error);
            throw error;
        }
    }

    getChartData(type, chartId) {
        if (type === 'internacion') {
            return this.data.internacion[chartId];
        } else if (type === 'lactancia') {
            return this.data.lactancia[chartId];
        }
    }

    calculatePercentage(value, population) {
        return ((value / population) * 100).toFixed(2);
    }
}