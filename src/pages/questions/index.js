import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { RiTimer2Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

import Chart from "../../components/charts";
import {questions} from "../../Mock/questions";



export default function Questions() {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");

  const [showScore, setShowScore] = useState(false);
  const [responseHability, setResponseHability] = useState(false);
  const [mostraRelogioParado, setMostraRelogioParado] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreError, setScoreError] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionsNotResponse, setQuestionsNotResponse] = useState(0);
  const [questionsNotTime, setQuestionsNotTime] = useState(0);
  const [verificaSePerdeuTempo, setverificaSePerdeuTempo] = useState(false);

  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);

    console.log(seconds);

    if (seconds === 0 && !showScore) {
      toast("Tempo esgotado", {
        icon: "⏰​",
      });
      setResponseHability(true);

      setverificaSePerdeuTempo(true);
    }

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  }

  function startTimer(e) {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  }

  //Responsáveis por limpar e resetar o tempo
  const clearTimer = (e) => {
    setTimer("00:00:10");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  //Configuração das perguntas

  function handleRespondeu(isCorrect) {
    //Pontua se estiver correta
    if (isCorrect) {
      setScore(score + 1);
      questions[currentQuestion].respondeu = true;
      toast.success("Resposta certa!");
    } else if (!isCorrect) {
      setScoreError(scoreError + 1);
      questions[currentQuestion].respondeu = true;
      toast.error("Resposta errada.");
    }

    setResponseHability(true);

    setMostraRelogioParado(false);
  }

  function handleProxima() {
    if (verificaSePerdeuTempo) {
      setQuestionsNotTime(questionsNotTime + 1);
    } else if (!questions[currentQuestion].respondeu) {
      questions[currentQuestion].respondeu = false;

      setQuestionsNotResponse(questionsNotResponse + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);

      setResponseHability(false);

      setMostraRelogioParado(true);

      onClickReset();
      setverificaSePerdeuTempo(false);
    } else {
      setShowScore(true);
    }
  }

  function handleIniciaTeste() {
    setMostraRelogioParado(true);

    onClickReset();
  }

  //Gráfico

  const data = [
    { name: "Acertou", value: score },
    { name: "Errou", value: scoreError },
    { name: "Não respondeu", value: questionsNotResponse },
    { name: "Perdeu o tempo", value: questionsNotTime },
  ];



  return (
    <div className="section">
      {showScore ? (
        <div className="results-box">
          <h2>Teste encerrado</h2>
          Você <br />
          acertou: {score}
          <br /> errou: {scoreError}
          <br /> não respondeu: {questionsNotResponse} <br />
          perdeu o tempo {questionsNotTime}
          <br />
          de {questions.length} questões.
       <Chart data={data}/>
        </div>
      ) : (
        <div className="question-box">
          <div className="header-question">
            <h1>
              Pergunta {currentQuestion + 1} / {questions.length}
            </h1>

            <button onClick={() => handleIniciaTeste()}>Iniciar</button>

            <div className="timer">
              {mostraRelogioParado ? (
                <span className="timer">
                  <RiTimer2Fill />
                  <h2>{timer}</h2>
                </span>
              ) : (
                <span className="timer">
                  <RiTimer2Fill />
                  <h2>00:00:00</h2>
                </span>
              )}
            </div>
          </div>

          <div>{questions[currentQuestion].questionText}</div>
          <div>
            {questions[currentQuestion].temTexto ? (
              <b> {questions[currentQuestion].texto} </b>
            ) : (
              ""
            )}
          </div>

          <div className="responses">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <div className="responses-button">
                  <button
                    disabled={responseHability ? true : false}
                    className="button-respostas"
                    key={index}
                    onClick={() => handleRespondeu(answerOption.isCorrect)}
                  >
                    {answerOption.answerText}
                  </button>
                </div>
              )
            )}
          </div>

          {responseHability ? (
            <div className="feedback">
              <b>Resposta certa :</b>
              <br />

              {questions[currentQuestion].optionCorrect}
            </div>
          ) : (
            ""
          )}

          <div className="buttons-question">
            <button
              className="button-response"
              onClick={() => {
                handleProxima();
              }}
            >
              Próxima pergunta
            </button>
          </div>
          <Toaster />
        </div>
      )}
    </div>
  );
}
