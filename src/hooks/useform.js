import { useState } from "react";

export const useForm = (initVal) => {
  const [form, setForm] = useState(initVal);

  return [
    form,
    (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    },
  ];
};
