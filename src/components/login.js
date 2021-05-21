import { useForm } from "../hooks/useform";
import { useState, useEffect } from "react";
import { Error } from "./error";
import { Link } from "react-router-dom";

export const Login = ({ setLocalStroage, sendReq, setLoggedIn }) => {
  const [form, setForm] = useForm({
    username: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);

  const validate = async (e) => {
    e.preventDefault();
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
  };

  useEffect(() => {
    console.log(invalid);
  }, [invalid]);

  return (
    <>
      {invalid ? <Error msg="Invalid credentials" /> : null}
      <form onSubmit={validate} method="post">
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
          id="password"
          placeholder="password"
          onChange={setForm}
          value={form.password}
        />
        <div className="actions">
          <Link to="/signup">Dont have an account</Link>
          <button onSubmit={validate}>Login</button>
        </div>
      </form>
    </>
  );
};
