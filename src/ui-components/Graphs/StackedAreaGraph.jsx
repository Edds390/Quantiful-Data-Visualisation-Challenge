import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import generateRandomColour from '../../utilities/ColourGenerator';


const StackedAreaGraph = props => (

  <ResponsiveContainer
    width="95%"
    height={600}
  >
    <AreaChart
      data={props.data}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        height={60}
        minTickGap={15}
        dataKey="date"
        label={{ value: props.xAxisLabel, angle: 0, position: 'bottom' }}
      />

      <YAxis label={{ value: props.yAxisLabel, angle: -90, position: 'insideLeft' }} />
      <Legend verticalAlign="top" />
      <Tooltip />
      {props.seriesKeys.map((seriesKey) => {
        const color = generateRandomColour();
        return (<Area
          type="monotone"
          dataKey={seriesKey}
          stackId="1"
          stroke={color}
          fill={color}
        />);
      })}
    </AreaChart>
  </ResponsiveContainer>

);

StackedAreaGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
  })).isRequired,
  seriesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
};

export default StackedAreaGraph;
