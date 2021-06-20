import React from "react";
import Dashboard from "../../../components/Dashboard";
import axios from "axios";

const Static = (props) => {
  const [chartData, steChartData] = React.useState(null);

  const getRequest = () => {
    axios
      .get(`${props.env.api_url}requestcar/getRequestChart`)
      .then((val) => {
        console.log(val.data);
        if (val.data.result.rowCount > 0) {
          let labels = [],
            dataset = [],
            data = [];

          [...val.data.result.result].forEach((e, i) => {
            labels.push(e.yt);
            dataset.push(`${e.data}`.split(",").length);
            data.push(
              `${e.data}`.split(",").map((e, i) => {
                return `${e}`.split(" - ");
              })
            );
          });

          steChartData({ labels: labels, dataset: dataset, data: data });
        } else {
          steChartData(null);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    let myChart = null;
    if (chartData) {
      console.log(chartData);
      let canvas = document.getElementById("myChart").getContext("2d");
      myChart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "สถิติการขอใช้",
              data: chartData.dataset,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          onClick: (...a) => {
            console.log(chartData.data[a[1][0]["index"]]);
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      myChart && myChart.destroy();
    };
  }, [chartData]);

  React.useEffect(() => {
    getRequest();
    return () => {};
  }, []);

  return (
    <Dashboard {...props}>
      <div className="box-padding">
        <canvas id="myChart"></canvas>
      </div>

      <style jsx>{`
        #myChart {
          width: 100% !important;
          height: 600px !important;
        }
      `}</style>
    </Dashboard>
  );
};

export default Static;
