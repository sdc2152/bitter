import React from "react";

const AuthErrors = ({errors}) => {
  const errorsList = errors ? errors.map((e, i) => <li key={i} >{e}</li>) : null;
  return (
    <ul>
      {errorsList}
    </ul>
  );
};

export default AuthErrors;
