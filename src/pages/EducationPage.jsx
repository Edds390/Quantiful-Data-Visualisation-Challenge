import React from 'react';
import Card from '@material-ui/core/Card';


import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { JSONresponeSales } from '../data';

const DATASETS = [
  'car',
  'phone',
];

class EducationPageRouter extends React.Component {
  constructor(props) {
    super(props);
    const cleanedData = this.cleanData();
    this.state = {
      data: cleanedData,
    };
  }

  componentDidMount() {
    this.cleanData();
  }

  cleanData() {
    // {date: "5/6/18", car: 10, phone: 35},
    const cleanedData = JSONresponeSales.filter(dataset => dataset.key === 'car' || dataset.key === 'phone')
      .reduce((acc, current) => acc.sales_over_time.buckets.map((obs, i) => {
        const curSales = current.sales_over_time.buckets[i].total_sales.value;
        const curKey = current.sales_over_time.buckets[i].key;
        const curObj = { key: curKey };
        curObj[current.key] = curSales;
        const obsSales = obs.total_sales.value;
        const obsKey = obs.key;
        const obsObj = { key: obsKey };
        curObj[acc.key] = obsSales;
        return Object.assign({}, obsObj, curObj);
      }));

    console.log(cleanedData);
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="display1">
            Line Graph Displaying Sales Info
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const EducationPage = withRouter(EducationPageRouter);


export default (EducationPage);
