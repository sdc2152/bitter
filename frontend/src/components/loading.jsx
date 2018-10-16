import React from "react";

const Loading = () => (
  <div className="d-flex h-75 justify-content-center">
    <div className="align-self-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default Loading;
