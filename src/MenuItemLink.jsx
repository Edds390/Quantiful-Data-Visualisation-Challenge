import React, {cloneElement, Component} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {NavLink} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "flex-start",
  },
  active: {
    color: theme.palette.text.primary,
  },
  icon: {paddingRight: "1.2em"},
});

export class MenuItemLink extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    primaryText: PropTypes.string,
    staticContext: PropTypes.object,
    to: PropTypes.string.isRequired,
  };

  render() {
    const {
      classes,
      className,
      primaryText,
      leftIcon,
      ...props
    } = this.props;

    return (
        <MenuItem
            className={classnames(classes.root, className)}
            activeClassName={classes.active}
            component={NavLink}
            {...props}
        >
          {leftIcon && (
              <span className={classes.icon}>
                        {cloneElement(leftIcon, {titleAccess: primaryText})}
                    </span>
          )}
          {primaryText}
        </MenuItem>
    );
  }
}

export default withStyles(styles)(MenuItemLink);
