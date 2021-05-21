import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "100px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 100,
    width: 100,
  },

  space: {
    display: "flex",
    marginLeft: "20px",
  },

  toLeft: {
    position: "absolute",
    right: "5%",
    top: "10%",
  },
}));

export const Profile = ({
  getLocalStorage,
  sendReq,
  loggedIn,
  setLoggedIn,
}) => {
  const [details, setDetails] = useState({
    name: "",
    username: "",
    age: 0,
    gender: "",
  });
  const [edit, setEdit] = useState(false);
  const token = getLocalStorage("jtoken");
  const username = getLocalStorage("jusername");
  const getProfile = async () => {
    if (token) {
      console.log("token is and also from profile page : " + token);
      const response = await sendReq("api/profile", {
        token: token,
        username: username,
      });

      if (response === undefined || !response.ok) {
        window.location.replace("/login");
      }
      const res = await response.json();
      console.log(res);
      setDetails(res.data);
    } else window.location.replace("/login");
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const validate = async (e) => {
    e.preventDefault();
    const response = await sendReq("api/updateProfile", {
      details: details,
      token: token,
    });
    console.log(response);
    if (response.ok) {
      setEdit(false);
    }
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Navbar
        title="profile"
        getLocalStorage={getLocalStorage}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        sendReq={sendReq}
      />
      <Card className={classes.root}>
        <AccountCircle
          fontSize="large"
          color="action"
          className={classes.playIcon}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            {edit ? (
              <form method="update" onSubmit={validate}>
                <input
                  type="text"
                  value={details.name}
                  onChange={handleChange}
                  placeholder="Name"
                  name="name"
                />
                <Typography variant="subtitle1" color="textSecondary">
                  {details.username}
                </Typography>
                <div>
                  <input
                    type="text"
                    value={details.gender}
                    onChange={handleChange}
                    placeholder="Gender"
                    name="gender"
                  />
                  <b>-</b>
                  <input
                    type="number"
                    value={details.age}
                    onChange={handleChange}
                    placeholder="Age"
                    name="age"
                  />
                  <button
                    // variant="contained"
                    // color="secondary"
                    onSubmit={validate}
                  >
                    Change
                  </button>
                </div>
              </form>
            ) : (
              <>
                <Typography component="h5" variant="h5">
                  {details.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {details.username}
                </Typography>
                <div style={{ display: "flex" }}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {details.gender}
                  </Typography>
                  <b>-</b>
                  <Typography variant="subtitle1" color="textSecondary">
                    {details.age}
                  </Typography>
                </div>
              </>
            )}
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              className={classes.toLeft}
              onClick={(e) => setEdit(!edit)}
            >
              <Edit fontSize="large" color={edit ? "secondary" : "action"} />
            </IconButton>
          </CardContent>
        </div>
      </Card>
    </>
  );
};
