import React from 'react';
import Card from '@material-ui/core/Card';


import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router';
import { JSONresponeSales } from '../data';
import LineGraph from '../ui-components/Graphs/LineGraph';
import StackedAreaGraph from '../ui-components/Graphs/StackedAreaGraph';
import VerticalBarGraph from '../ui-components/Graphs/VerticalBarGraph';


const DATASETS = [
  'car',
  'phone',
];
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class EducationPageRouter extends React.Component {
  constructor(props) {
    super(props);
    const cleanedData = this.cleanData();
    const stackChartCleanedData = this.cleanDataForStackedChart();
    const dowCleanedData = this.cleanDataForBarChart();
    this.state = {
      data: cleanedData,
      stackData: stackChartCleanedData,
      barData: dowCleanedData,
      isLineChart: true,
    };
  }

  cleanData() {
    const cleanedData = JSONresponeSales.filter(dataset => dataset.key === 'car' || dataset.key === 'phone')
      .map((dataset) => {
        const name = dataset.key;
        const data = dataset.sales_over_time.buckets.map(obs => ({
          date: obs.key_as_string,
          sales: obs.total_sales.value,
        }));
        return {
          name,
          data,
        };
      });

    return cleanedData;
  }

  cleanDataForStackedChart() {
    const cleanedData = JSONresponeSales.filter(dataset => dataset.key === 'car' || dataset.key === 'phone')
      .reduce((acc, current) => acc.sales_over_time.buckets.map((obs, i) => {
        const curSales = current.sales_over_time.buckets[i].total_sales.value;
        const curKey = current.sales_over_time.buckets[i].key_as_string;
        const curObj = { date: curKey };
        curObj[current.key] = curSales;
        const obsSales = obs.total_sales.value;
        const obsKey = obs.key_as_string;
        const obsObj = { date: obsKey };
        curObj[acc.key] = obsSales;
        return Object.assign({}, obsObj, curObj);
      }));
    return cleanedData;
  }

  cleanDataForBarChart() {
    const dowMap = {
      Mon: {},
      Tue: {},
      Wed: {},
      Thu: {},
      Fri: {},
      Sat: {},
      Sun: {},
    };
    JSONresponeSales.forEach((dataset) => {
      if (dataset.key === 'car' || dataset.key === 'phone') {
        dataset.sales_over_time.buckets.forEach(((obs) => {
          const dow = DAYS_OF_WEEK[new Date(obs.key).getDay()];
          if (dowMap[dow][dataset.key] === undefined) {
            dowMap[dow][dataset.key] = obs.total_sales.value;
          } else {
            dowMap[dow][dataset.key] += obs.total_sales.value;
          }
        }));
      }
    });
    const cleanedData = Object.keys(dowMap).map((dow) => {
      const obs = { dow };
      Object.keys(dowMap[dow]).forEach((product) => {
        obs[product] = dowMap[dow][product];
      });
      return obs;
    });

    return cleanedData;
  }

  handleGraphSwitch = () => {
    const {
      isLineChart,
    } = this.state;
    this.setState({ isLineChart: !isLineChart });
  }

  renderGraphSwitch() {
    const {
      isLineChart,
    } = this.state;
    return (
      <FormControlLabel
        style={{ marginLeft: 20 }}
        control={
          <Switch
            color="primary"
            value={isLineChart}
            onChange={this.handleGraphSwitch}
          />
        }
        label="Change View"
      />

    );
  }

  renderStackedAreaChart() {
    const {
      stackData,
    } = this.state;
    return (
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={10}>
            <Typography variant="display1">
              Stacked Area Graph Displaying Sales Info
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {this.renderGraphSwitch()}
          </Grid>
        </Grid>
        <StackedAreaGraph
          data={stackData}
          seriesKeys={DATASETS}
          xAxisLabel="Date"
          yAxisLabel="Sales"
        />
      </CardContent>
    );
  }

  renderLineChart() {
    const {
      data,
    } = this.state;
    return (
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={10}>
            <Typography variant="display1">
              Line Graph Displaying Sales Info
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {this.renderGraphSwitch()}
          </Grid>
        </Grid>
        <LineGraph
          data={data}
          seriesKeys={DATASETS}
          xAxisLabel="Date"
          yAxisLabel="Sales"
        />
      </CardContent>
    );
  }

  renderBarGraph() {
    const {
      barData,
    } = this.state;
    return (
      <CardContent>
        <Typography variant="display1">
            Sales across Days of Week
        </Typography>
        <VerticalBarGraph
          data={barData}
          seriesKeys={DATASETS}
          yAxisLabel="Day of Week"
          xAxisLabel="Sales"
        />
      </CardContent>
    );
  }

  render() {
    const {
      isLineChart,
    } = this.state;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={4}>
          <Card>
            {this.renderBarGraph()}
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            {isLineChart ? this.renderLineChart() : this.renderStackedAreaChart()}
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const EducationPage = withRouter(EducationPageRouter);


export default (EducationPage);
