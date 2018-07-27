import React from "react";
import Card from "@material-ui/core/Card";


import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router";


const EducationPageRouter = (classes, theme) => (

    <Card className={classes.root}>
      <CardContent>
        <Typography variant="display1">Line Graph Displaying Sales Info</Typography>
      </CardContent>
    </Card>
);

const EducationPage = withRouter(EducationPageRouter);


export default (EducationPage);