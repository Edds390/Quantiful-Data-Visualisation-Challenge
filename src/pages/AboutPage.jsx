import React from "react";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";

import CardContent from "@material-ui/core/CardContent";
import {withRouter} from "react-router";
import {withStyles} from "@material-ui/core/styles/index";

const instructions4= "We encourage you to demonstrate your creativity and go beyond these specifications to display your skills!"

const styles = (theme) => ({
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize:50,
    color: theme.palette.primary.main,
    "& span": {
      color: theme.palette.primary.light,
    },
  },
  subheading:{
    color: theme.palette.secondary.light
  }
});

const AboutPageRouter = (styles, theme) => (
    <Card>
      <CardContent>
        {console.log(styles.classes.title)}
        <h1 className={styles.classes.title}>Instructions</h1>
        <p>Referring to the example in the experience tab, <b>please use the recharts library to visualise car sales and phone sales in the education tab</b>.</p>
        <p>Data for sales can be found in the <i>'src/data.js'</i> file as ‘JSONresponseSales’. Please rearrange this data into a compatible format with recharts and create a relevant graph. This will involve removing any extra data. We recommend you use .filter, .map and .reduce instead of loops. If you have having trouble with arranging this data, you can use ‘formattedSales’ which contains data in a structure compatible with recharts.</p>
        <p>Recharts installation instructions, API and examples can be found in the <a href= "http://recharts.org/">Recharts Page</a></p>

        <h3>You will be assessed on your:</h3>
        <ul>
          <li> success with visualising the data </li>
          <li> graph choice </li>
          <li> coding style </li>
          <li> visualisation appearance </li>
        </ul>
        <p>{instructions4}</p>
      </CardContent>
    </Card>
);

const AboutPage = withRouter(AboutPageRouter);

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(AboutPageRouter);