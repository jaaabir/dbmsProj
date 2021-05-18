import { useState } from "react";

export const Error = ({ msg }) => {
  const top = {
    position: "absolute",
    right: 1,
    top: 5,
    backgroundColor: "maroon",
    color: "white",
  };

  return (
    <div style={top}>
      <h3>{msg}</h3>
    </div>
  );
};
