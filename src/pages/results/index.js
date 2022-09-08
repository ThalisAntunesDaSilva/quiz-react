import React, { useState } from "react";
import "./styles.css";
import Charts from "../../components/charts/index";


export default function Results() {

  return (
<div className="section">
        <div className="results-box">
        <h1>Resultados</h1>
        <h3>
         Parabéns você teve um ótimo rendimento, confira os resultados.
        </h3>
        <Charts />
      </div>
      </div>

  );
}
