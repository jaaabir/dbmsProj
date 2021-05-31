import { useForm } from "../hooks/useform";
import { useState, useEffect } from "react";
import { Error } from "./error";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "300px",
    height: "350px",
    margin: "auto",
    marginTop: "50px",
  },
  circle: {
    fontSize: "150px",
    marginTop: "10px",
  },
  btn: {
    marginTop: "10px",
    width: "100px",
    height: "50px",
    color: "white",
    backgroundColor: "#3fbde0",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "#2293b3",
    },
  },
}));

export const Login = ({ setLocalStroage, sendReq, setLoggedIn }) => {
  const [form, setForm] = useForm({
    username: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);
  const classes = useStyles();

  const validate = async (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (username && password) {
      const response = await sendReq("api/login", form);

      if (response.ok) {
        const res = await response.json();
        setLocalStroage("jtoken", res.token);
        setLocalStroage("jusername", res.username);
        window.location.replace("/");
      } else {
        setInvalid(true);
        setTimeout(() => setInvalid(false), 3000);
      }
    }
  };

  useEffect(() => {
    console.log(invalid);
  }, [invalid]);

  return (
    <>
      {invalid ? <Error msg="Invalid credentials" type="error" /> : null}
      <Paper elevation={3} className={classes.paper}>
        <form onSubmit={validate} method="post">
          <div className={classes.root}>
            <AccountCircle className={classes.circle} />
            <TextField
              id="standard-basic"
              label="username"
              name="username"
              onChange={setForm}
              value={form.username}
            />
            <TextField
              id="standard-basic"
              label="password"
              name="password"
              type="password"
              onChange={setForm}
              value={form.password}
            />
            <div className={classes.root}>
              <button onSubmit={validate} className={classes.btn}>
                Login
              </button>
              <Link to="/signup">Dont have an account</Link>
            </div>
          </div>
        </form>
      </Paper>
    </>
  );
};
