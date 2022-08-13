import React from "react";
import "./reporterror.css";

const ReportError = () => {
  return (
    <div className="report-error-body">
      <div className="report-error-container">
        <div className="box report-error">
          <div className="report-content-error">Oop! Error!!</div>
          <p className="report-error-des1">No result found for your search!</p>
          <p className="report-error-des2">
            The date might invalid or might not exist. Let try it again!!!
          </p>
          <p className="report-error-des3">Thank for visiting!!!</p>
        </div>
      </div>
    </div>
  );
};

export default ReportError;
