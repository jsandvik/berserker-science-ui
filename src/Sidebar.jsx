import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { NAMES, IMAGES } from "./characterInfo.js";
import { Link } from "react-router-dom";

const drawerWidth = 200;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  // overrides default link styling, we don't want highlighted buttons
  link: {
    color: "inherit",
    textDecoration: "inherit",
    "&:hover": {
      color: "inherit",
      textDecoration: "inherit",
    }
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <SwipeableDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.onSidebarClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to="/" className={classes.link}>
          <ListItem button>
            <ListItemText primary={"View All"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {Object.keys(NAMES).map(character => (
          <Link to={`/${character}`} className={classes.link} onClick={props.onSidebarClose}>
            <ListItem button key={character}>
              <ListItemAvatar>
                <Avatar alt={character} src={IMAGES[character]} />
              </ListItemAvatar>
              <ListItemText primary={NAMES[character]} />
            </ListItem>
          </Link>
        ))}
      </List>
    </SwipeableDrawer>
  );
}
