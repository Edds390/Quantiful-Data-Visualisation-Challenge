import React from 'react';
import PropTypes from 'prop-types';

import {
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const generateRandomColour = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`;


const LineGraph = props => (
  <ResponsiveContainer
    width="95%"
    height={500}
  >
    <LineChart
      data={props.data}
      margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        height={30}
        dataKey="date"
        label={{ value: props.xAxisLabel, angle: 0, position: 'bottom' }}
      />

      <YAxis label={{ value: props.yAxisLabel, angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend verticalAlign="top" />
      {props.dataKeys.map(dataKey =>
        <Line type="monotone" dataKey={dataKey} stroke={generateRandomColour()} />)}

    </LineChart>
  </ResponsiveContainer>

);

LineGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
  })).isRequired,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
};

export default LineGraph;
