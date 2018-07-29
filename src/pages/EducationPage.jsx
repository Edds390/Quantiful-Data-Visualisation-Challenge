import React from 'react';
import Card from '@material-ui/core/Card';


import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import { JSONresponeSales } from '../data';
import LineGraph from '../ui-components/Graphs/LineGraph';
import StackedAreaGraph from '../ui-components/Graphs/StackedAreaGraph';

const DATASETS = [
  'car',
  'phone',
];

class EducationPageRouter extends React.Component {
  constructor(props) {
    super(props);
    const cleanedData = this.cleanData();
    const stackChartCleanedData = this.cleanDataForStackedChart();
    this.state = {
      data: cleanedData,
      stackData: stackChartCleanedData,
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

  render() {
    const {
      data,
      stackData,
    } = this.state;
    console.log(data);
    return (
      <Card>
        <CardContent>
          <Typography variant="display1">
            Line Graph Displaying Sales Info
          </Typography>
        </CardContent>
        <CardContent>
          <StackedAreaGraph
            data={stackData}
            seriesKeys={DATASETS}
            xAxisLabel="Date"
            yAxisLabel="Sales"
          />
        </CardContent>
      </Card>
    );
  }
}

const EducationPage = withRouter(EducationPageRouter);


export default (EducationPage);
