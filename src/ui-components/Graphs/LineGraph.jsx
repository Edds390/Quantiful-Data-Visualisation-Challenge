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
import generateRandomColour from '../../utilities/ColourGenerator';

const LineGraph = props => (
  <ResponsiveContainer
    width="95%"
    height={600}
  >
    <LineChart
      data={props.data}
      margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        height={60}
        minTickGap={10}
        dataKey="date"
        type="category"
        label={{ value: props.xAxisLabel, angle: 0, position: 'bottom' }}
        allowDuplicatedCategory={false}
      />

      <YAxis dataKey="sales" label={{ value: props.yAxisLabel, angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend verticalAlign="top" />
      {props.data.map(series =>
        (<Line
          type="monotone"
          dataKey="sales"
          data={series.data}
          name={series.name}
          key={series.name}
          stroke={generateRandomColour()}
        />))}

    </LineChart>
  </ResponsiveContainer>

);

LineGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
  })).isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
};

export default LineGraph;
