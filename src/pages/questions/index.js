import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { RiTimer2Fill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const questions = [
  {
    id: 1,
    questionText: "O texto mais abaixo define qual dessas opções?",
    nivelQuestion: "Fácil",
    temTexto: true,
    texto:
      "Recurso do TalkProcess que possibilita que um ou mais colaboradores sejam treinados em um processo de negócio.",
    answerOptions: [
      { answerText: "Símbolo de desenho de processo", isCorrect: false },
      { answerText: "Treinamento de processo", isCorrect: true },
      { answerText: "Caminho de um processo", isCorrect: false },
    ],
    optionCorrect: "Treinamento de processo",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 2,
    questionText: "O texto mais abaixo define qual dessas opções?",
    nivelQuestion: "Fácil",
    temTexto: true,
    texto:
      "Colaborador da empresa que foi inscrito em um treinamento de processo no TalkProcess learn.",
    answerOptions: [
      { answerText: "Funcionário da empresa", isCorrect: false },
      { answerText: "Tutor de um treinamento de processo", isCorrect: false },
      { answerText: "Aluno de um treinamento de processo", isCorrect: true },
    ],
    optionCorrect: "Aluno de um treinamento de processo",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 3,
    questionText: "O texto mais abaixo define qual dessas opções?",
    nivelQuestion: "Fácil",
    temTexto: true,
    texto:
      "Pessoa responsável por apoiar os alunos em um treinamento, respondendo suas dúvidas sobre o conteúdo teórico do treinamento.",
    answerOptions: [
      { answerText: "Tutor de um treinamento de processo", isCorrect: true },
      { answerText: "Chefe de departamento", isCorrect: false },
      { answerText: "Aluno de um treinamento de processo", isCorrect: false },
    ],
    optionCorrect: "Tutor de um treinamento de processo",
    respondeu: false,
    perdeuOTempo: false,
  },
  {
    id: 4,
    questionText: "Qual das opções abaixo define um “Treinamento de processo”?",
    nivelQuestion: "Médio",
    temTexto: false,
    texto: "",
    answerOptions: [
      {
        answerText:
          "Colaborador da empresa que foi inscrito em um treinamento de processo no TalkProcess learn.",
        isCorrect: false,
      },
      {
        answerText:
          "Recurso do TalkProcess que possibilita que um ou mais colaboradores sejam treinados em um processo de negócio.",
        isCorrect: true,
      },
    ],
    optionCorrect:
      "Recurso do TalkProcess que possibilita que um ou mais colaboradores sejam treinados em um processo de negócio.",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 5,
    questionText: "Qual das opções abaixo define um “Treinamento de processo”?",
    nivelQuestion: "Médio",
    temTexto: false,
    texto: "",
    answerOptions: [
      {
        answerText:
          "Colaborador da empresa que foi inscrito em um treinamento de processo no TalkProcess learn.",
        isCorrect: false,
      },
      {
        answerText:
          "Recurso do TalkProcess que possibilita que um ou mais colaboradores sejam treinados em um processo de negócio.",
        isCorrect: true,
      },
    ],
    optionCorrect:
      "Recurso do TalkProcess que possibilita que um ou mais colaboradores sejam treinados em um processo de negócio.",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 6,
    questionText:
      "Qual das opções abaixo define um “Tutor” de um treinamento de processo?",
    nivelQuestion: "Médio",
    temTexto: false,
    texto: "",
    answerOptions: [
      {
        answerText:
          "Colaborador da empresa que foi inscrito em um treinamento de processo no TalkProcess learn",
        isCorrect: false,
      },
      {
        answerText:
          "Pessoa responsável por apoiar os alunos em um treinamento, respondendo suas dúvidas sobre o conteúdo teórico do treinamento.",
        isCorrect: true,
      },
    ],
    optionCorrect:
      "Pessoa responsável por apoiar os alunos em um treinamento, respondendo suas dúvidas sobre o conteúdo teórico do treinamento.",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 7,
    questionText: "A afirmação abaixo é:",
    nivelQuestion: "Alto",
    temTexto: true,
    texto:
      "Um treinamento é dividido em capítulos e um aluno evolui nesses capítulos, realizando uma sequência de passos",
    answerOptions: [
      {
        answerText: "Falsa",
        isCorrect: false,
      },
      {
        answerText: "Verdadeira",
        isCorrect: true,
      },
    ],
    optionCorrect: "Verdadeira",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 8,
    questionText: "A afirmação abaixo é:",
    nivelQuestion: "Alto",
    temTexto: true,
    texto:
      "Caso um aluno não entenda o que deve ser feito em um passo do treinamento, ele poderá postar uma dúvida.",
    answerOptions: [
      {
        answerText: "Falsa",
        isCorrect: false,
      },
      {
        answerText: "Verdadeira",
        isCorrect: true,
      },
    ],
    optionCorrect: "Verdadeira",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 9,
    questionText: "A afirmação abaixo é:",
    nivelQuestion: "Alto",
    temTexto: true,
    texto:
      "Um treinamento é composto por capítulos, onde cada aluno tem acesso a conteúdo teórico, seguido de uma lista de exercícios.",
    answerOptions: [
      {
        answerText: "Falsa",
        isCorrect: false,
      },
      {
        answerText: "Verdadeira",
        isCorrect: true,
      },
    ],
    optionCorrect: "Verdadeira",
    respondeu: false,
    perdeuOTempo: false,
  },

  {
    id: 10,
    questionText: "Qual das opções abaixo define um “Exercício?",
    nivelQuestion: "Alto",
    temTexto: false,
    texto: "",
    answerOptions: [
      {
        answerText:
          "Trata-se de uma pergunta relacionada a algum ponto do conteúdo teórico do treinamento. ***** possibilitam que um aluno possa avaliar o seu entendimento.",
        isCorrect: true,
      },
      {
        answerText:
          "Cada capítulo de um treinamento apresenta um(a) ***** que deve ser respondida pelos alunos. Trata-se de um conjunto de exercícios ligados ao conteúdo teórico do capítulo.",
        isCorrect: false,
      },

      {
        answerText: "Nenhuma das anteriores.",
        isCorrect: false,
      },
    ],
    optionCorrect:
      "Trata-se de uma pergunta relacionada a algum ponto do conteúdo teórico do treinamento. ***** possibilitam que um aluno possa avaliar o seu entendimento.",
    respondeu: false,
    perdeuOTempo: false,
  },
];

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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
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
