import React, { useEffect } from "react";
import Chart from "chart.js/auto";

interface ChartProps {
  keys: string[];
  chartData: Record<string, any>[];
}

const MyChartComponent: React.FC<ChartProps> = (props) => {
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement | null;

    if (ctx && props.chartData && props.keys) {
      const counts = props.chartData.reduce(
        (acc: Record<string, number>, item: Record<string, any>) => {
          const brand = item[props.keys[0]];
          if (!acc[brand]) {
            acc[brand] = 0;
          }
          acc[brand]++;
          return acc;
        },
        {}
      );

      const labels = Object.keys(counts);
      const datasetData = Object.values(counts);

      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Quantidade",
              data: datasetData,
              backgroundColor: "rgba(75, 192, 192, 0.4)",
              borderColor: "#000",
              borderWidth: 1.5,
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
  }, [props.chartData, props.keys]);

  return <canvas id="myChart" width="700" height="700"></canvas>;
};

export default MyChartComponent;
