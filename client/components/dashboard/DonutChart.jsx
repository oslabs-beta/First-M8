import React, { useState, useEffect } from 'react';
// eslint-disable-next-line object-curly-newline
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';

const DonutChart = ({
  type,
  columns,
  prometheusInstance,
}) => {
  /*
  initializes state of data and label for donut chart
  */
  const [data, setData] = useState(() => []);
  const [labelForDonut, setLabelForDonut] = useState(() => '');

  /*
  retrieves data from Prometheus based on data selector columns
  to be represented as a donut chart
  */
  const getData = async () => {
    const metrics = columns.metricsSelected.list;

    const query = `query=${metrics[0]}/${metrics[1]}`;

    if (prometheusInstance !== undefined) {
      await fetch(`http://${prometheusInstance.ipAddress}:${prometheusInstance.port}/api/v1/query?${query}`)
        .then((response) => response.json())
        .then((response) => {
          const percentageUsed = parseFloat(response.data.result[0].value[1]);
          const newData = [
            { name: 'used', value: percentageUsed },
            { name: 'remaining', value: 1 - percentageUsed },
          ];
          setData(newData);
          setLabelForDonut(`${Math.round(newData[0].value * 100)}%`);
        });
    }
  };

  /*
  sets up a recurring fetch request to Prometheus every minute
  to update donut chart with latest data
  */
  useEffect(() => {
    getData();
    if (type === 'saved-chart') {
      const interval = setInterval(() => {
        console.log('refetching');
        getData();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <ResponsiveContainer width="95%" height={500}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={125}
          outerRadius={200}
          stroke="none"
        >
          {data.map((dataPoints, index) => {
            if (index === 1) {
              return <Cell fill="#D7D7D7" />;
            }
            return <Cell fill="#005AAA" />;
          })}
        <Label
          value={labelForDonut}
          position="center"
          fill="gray"
          style={{
            fontSize: '60px',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
