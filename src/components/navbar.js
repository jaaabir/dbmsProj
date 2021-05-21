import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import AddCircle from "@material-ui/icons/AddCircle";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { PostCard } from "./postCard";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export const Navbar = ({ title, loggedIn, setLoggedIn, sendReq }) => {
  const getLocalStorage = (key) => window.localStorage.getItem(key);
  const setLocalStroage = (key, value) =>
    window.localStorage.setItem(key, value);
  const [username, setUsername] = useState(getLocalStorage("jusername"));
  const classes = useStyles();

  console.log("is user logged into the app : " + loggedIn);
  const logout = (e) => {
    setLocalStroage("jtoken", null);
    setLocalStroage("jusername", null);
    setLoggedIn(false);
    window.location.replace("/login");
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                style={{ width: 60, height: 60, cursor: "pointer" }}
              />
            </Link>
            <Typography>{title}</Typography>
            <div className={classes.grow} />

            {loggedIn && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                //   aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => setOpenModal(true)}
                color="inherit"
              >
                <AddCircle color="action" fontSize="default" />
              </IconButton>
            )}
            {loggedIn && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                //   aria-controls={menuId}
                aria-haspopup="true"
                onClick={logout}
                color="inherit"
              >
                <ExitToApp color="secondary" fontSize="default" />
              </IconButton>
            )}
            <div className={classes.sectionDesktop}>
              <Link to="/profile">
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  // aria-controls={menuId}
                  aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" color="action" />
                </IconButton>
              </Link>
            </div>
            <Typography>{username}</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <PostCard
        openModal={openModal}
        setOpenModal={(val) => setOpenModal(val)}
        username={username}
        sendReq={sendReq}
        getLocalStorage={getLocalStorage}
      />
    </>
  );
};
