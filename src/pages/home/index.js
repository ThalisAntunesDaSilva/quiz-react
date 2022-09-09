import React from "react";
import "./styles.css";
import image from "../../assets/Woman thinking-amico.svg";

export default function Home() {
  return (
    <div className="section">
      <div className="container-home">
        <div>
          <h1>Bem vindo de volta :D</h1>

          <img src={image} />
        </div>

        <div className="options-name">
          <a href="/questions" className="link-home">
            Iniciar teste
          </a>
        </div>
      </div>
    </div>
  );
}
