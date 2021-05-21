import { useForm } from "../hooks/useform";
import { useState, useEffect } from "react";
import { Error } from "./error";
import { Link } from "react-router-dom";

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
      <form onSubmit={validate} method="post">
        <input
          type="text"
          name="name"
          onChange={setForm}
          placeholder="name"
          value={form.name}
        />
        <input
          type="text"
          name="username"
          onChange={setForm}
          placeholder="username"
          value={form.username}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={setForm}
          value={form.password}
        />
        <input
          type="password"
          name="confirm"
          id="password"
          placeholder="confirm password"
          onChange={setForm}
          value={form.confirm}
        />
        <input
          type="number"
          name="age"
          onChange={setForm}
          placeholder="age"
          value={form.age}
        />
        <input
          type="text"
          name="gender"
          onChange={setForm}
          placeholder="gender"
          value={form.gender}
        />

        <div className="actions">
          <Link to="/signup">Already have an account!</Link>
          <button onSubmit={validate}>Sign up</button>
        </div>
      </form>
    </>
  );
};
