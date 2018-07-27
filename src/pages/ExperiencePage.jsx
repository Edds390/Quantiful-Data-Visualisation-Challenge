import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {withRouter} from "react-router";
import {locations} from "../data";
import {BarGraph} from "../ui-components/Graphs/BarGraph";


class ExperiencePageRouter extends React.Component{

  render() {
    return (
    <Card>
      <CardContent>Graph Example</CardContent>
      <BarGraph title="Location of Visiters in the last Month" 
                xAxis='country' 
                yAxis='numberOfVisitors' 
                yAxisLabel = "Number" 
                xAxisLabel = "Country" 
                data={locations} />
    </Card>
    )
  }
}

const ExperiencePage = withRouter(ExperiencePageRouter);

export default (ExperiencePage);