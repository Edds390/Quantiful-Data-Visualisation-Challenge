import React from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import generateRandomColour from '../../utilities/ColourGenerator';


const VerticalBarGraph = props => (

  <ResponsiveContainer
    width="95%"
    height={500}
  >
    <BarChart
      layout="vertical"
      data={props.data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis dataKey="dow" type="category" />
      <XAxis type="number" />
      <Tooltip />
      <Legend />
      {props.seriesKeys.map(seriesKey =>
        <Bar dataKey={seriesKey} key={seriesKey} stackId="a" fill={generateRandomColour()} />)}
      {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
    </BarChart>
  </ResponsiveContainer>

);

VerticalBarGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
  })).isRequired,
  xAxisLabel: PropTypes.string.isRequired,
  yAxisLabel: PropTypes.string.isRequired,
  seriesKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VerticalBarGraph;
