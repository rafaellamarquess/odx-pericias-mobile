import { DadosItem } from "@/types/Dashboards";

export const getColorWithOpacity = (baseColor: string) => (opacity: number) => baseColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');

export const baseColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

export const transformToChartData = (chartData: DadosItem[]) => {
  const tipoGrafico = chartData[0]?.tipoGrafico || 'barra';

  if (tipoGrafico === 'pizza') {
    const pieData = chartData.map((item, index) => ({
      name: item.categoria,
      value: item.quantidade,
      color: baseColors[index % baseColors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }));

    return {
      labels: chartData.map(item => item.categoria),
      datasets: [{
        pieData,
        data: chartData.map(item => item.quantidade),
        colors: baseColors.map(color => getColorWithOpacity(color)),
      }],
    };
  } else {
    return {
      labels: chartData.map(item => item.categoria),
      datasets: [{
        data: chartData.map(item => item.quantidade),
        colors: baseColors.map(color => getColorWithOpacity(color)),
      }],
    };
  }
};