import React, {Component} from "react";
import SideBar from "./SideBar";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import {routes} from "./routes";
import {Route} from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends Component {
  render() {
    const {classes} = this.props;

    return (
        <div className="App">
          <div className={classes.root}>
            <SideBar/>

            <main className={classes.content}>
              <div className={classes.toolbar}/>
              {routes.map(item => (
                  <Route
                      key={item.link}
                      path={`/${item.link}`} exact
                      component={item.component}
                  />
              ))}
            </main>

          </div>
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);