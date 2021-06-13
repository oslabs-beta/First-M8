import React, { useState, useEffect } from 'react';
// eslint-disable-next-line object-curly-newline
import { ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';

const DonutChart = ({
  type,
  columns,
  prometheusInstance,
}) => {
  const [data, setData] = useState(() => []);
  const [labelForDonut, setLabelForDonut] = useState(() => '');

  const getData = async () => {
    const metric = columns.metricsSelected.list;

    const query = `query=${metric[0]}/${metric[1]}`;

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
          innerRadius={60}
          outerRadius={80}
        >
          {data.map((dataPoints, index) => {
            if (index === 1) {
              return <Cell fill="#f3f6f9" />;
            }
            return <Cell fill="green" />;
          })}
        <Label
          value={labelForDonut}
          position="center"
          fill="grey"
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            fontFamily: 'Roboto',
          }}
        />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
