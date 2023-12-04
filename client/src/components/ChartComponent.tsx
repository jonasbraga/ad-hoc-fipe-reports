import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const MyChartComponent: React.FC = () => {
  useEffect(() => {
    // Obtendo o contexto do canvas
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;

    if (ctx) {
      // Criando um gráfico de barras
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
          datasets: [
            {
              label: 'Vendas',
              data: [12, 19, 3, 5, 2],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Certifique-se de destruir o gráfico ao desmontar o componente para evitar vazamentos de memória
      return () => {
        myChart.destroy();
      };
    }
  }, []); // Executado apenas uma vez ao montar o componente

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default MyChartComponent;
