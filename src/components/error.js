import { useState } from "react";
import Typography from "@material-ui/core/typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(8),
    },
  },

  top: {
    position: "absolute",
    right: "50%",
    top: "5",
  },
  center: {
    margin: "auto",
  },
  color: {
    margin: "auto",
    backgroundColor: "#ff3333",
    textAlign: "center",
  },
}));

export const Error = ({ msg }) => {
  const classes = useStyles();

  return (
    // <div className={classes.top}>
    //   <h3>{msg}</h3>
    // </div>

    <div
      style={{
        // margin: "auto",
        width: `250px`,
        position: "absolute",
        left: "50%",
      }}
    >
      <Paper elevation={3} className={classes.color}>
        <h3>{msg}</h3>
      </Paper>
    </div>
  );
};
