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
    height: "380px",
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

export const Signup = ({ setLocalStroage, sendReq, setLoggedIn }) => {
  const [form, setForm] = useForm({
    username: "",
    password: "",
    confirm: "",
    name: "",
    age: 0,
    gender: "",
  });
  const [invalid, setInvalid] = useState(false);
  const classes = useStyles();

  const validate = async (e) => {
    e.preventDefault();
    let allValid = false;
    const { password, confirm } = form;

    if (password === confirm) allValid = true;

    if (allValid) {
      const response = await sendReq("api/signup", form);

      if (response.ok) {
        const res = await response.json();
        setLocalStroage("jtoken", res.token);
        setLocalStroage("jusername", res.username);
        setLoggedIn(true);
        window.location.replace("/");
      } else {
        setInvalid(true);
        setTimeout(setInvalid(false), 2);
      }
    }
  };

  return (
    <>
      {invalid ? <Error msg="Invalid credentials" /> : null}
      <Paper elevation={3} className={classes.paper}>
        <form onSubmit={validate} method="post">
          <div className={classes.root}>
            <TextField
              id="standard-basic"
              label="Name"
              name="name"
              onChange={setForm}
              value={form.name}
            />
            {/* <input
              type="text"
              name="name"
              onChange={setForm}
              placeholder="name"
              value={form.name}
            /> */}
            <TextField
              id="standard-basic"
              label="username"
              name="username"
              onChange={setForm}
              value={form.username}
            />
            {/* <input
              type="text"
              name="username"
              onChange={setForm}
              placeholder="username"
              value={form.username}
            /> */}
            <TextField
              id="standard-basic"
              label="password"
              name="password"
              type="password"
              onChange={setForm}
              value={form.password}
            />
            {/* <input
              type="password"
              name="password"
              placeholder="password"
              onChange={setForm}
              value={form.password}
            /> */}
            <TextField
              id="standard-basic"
              label="confirm password"
              name="confirm"
              type="password"
              onChange={setForm}
              value={form.confirm}
            />
            {/* <input
              type="password"
              name="confirm"
              id="password"
              placeholder="confirm password"
              onChange={setForm}
              value={form.confirm}
            /> */}
            <TextField
              id="standard-basic"
              label="age"
              name="age"
              type="number"
              onChange={setForm}
              value={form.age}
            />
            {/* <input
              type="number"
              name="age"
              onChange={setForm}
              placeholder="age"
              value={form.age}
            /> */}
            <TextField
              id="standard-basic"
              label="gender"
              name="gender"
              onChange={setForm}
              value={form.gender}
            />
            {/* <input
              type="text"
              name="gender"
              onChange={setForm}
              placeholder="gender"
              value={form.gender}
            /> */}

            <div className={classes.root}>
              <button onSubmit={validate} className={classes.btn}>
                Sign up
              </button>
              <Link to="/login">Already have an account!</Link>
            </div>
          </div>
        </form>
      </Paper>
    </>
  );
};
