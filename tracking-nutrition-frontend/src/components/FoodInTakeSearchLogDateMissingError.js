import React from "react";
import "./foodintakesearchlogdatemissingerror.css";

const FoodInTakeSearchLogDateMissingError = () => {
  return (
    <div className="datelog-error-body">
      <div className="datelog-error-container">
        <div className="box datelog-error">
          <div className="datelog-content-error">Oop! Missing Log Date!!</div>
          <p className="datelog-error-des1">
            Please select log date before searching
          </p>
          <p className="datelog-error-des2">Let try it again!!!</p>
          <p className="datelog-error-des3">Thank for visiting!!!</p>
        </div>
      </div>
    </div>
  );
};

export default FoodInTakeSearchLogDateMissingError;
