import React, { useState, useEffect } from "react";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    correct: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Syntax",
      "Computer Styled Section",
      "Central Style Sheet",
    ],
    correct: "Cascading Style Sheets",
  },
  {
    question: "What year was React released?",
    options: ["2010", "2013", "2015", "2017"],
    correct: "2013",
  },
  {
    question: "What is used to manage state in React?",
    options: ["useState", "useEffect", "useMap", "useClass"],
    correct: "useState",
  },
];
const QuizApp = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [history, setHistory] = useState([]);
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setTimeLeft(15);
  }, [currentQ]);

  useEffect(() => {
    if (isQuizOver) return;
    if (selected) return;
    if (timeLeft <= 0) {
      const timeTaken = 15;
      setScore((prev) => prev - 1);
      setHistory((prev) => [
        ...prev,
        {
          question: questions[currentQ].question,
          selected: "Time Up",
          correct: questions[currentQ].correct,
          status: "Skipped",
          timeTaken,
        },
      ]);
      if (currentQ + 1 < questions.length) setCurrentQ((prev) => prev + 1);
      else setIsQuizOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, selected, currentQ, isQuizOver]);

  const handleAnswer = (opt) => {
    if (selected) return;
    setSelected(opt);
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = opt === questions[currentQ].correct;
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect ? "✅ Correct!" : "❌ Wrong!");
    setHistory((prev) => [
      ...prev,
      {
        question: questions[currentQ].question,
        selected: opt,
        correct: questions[currentQ].correct,
        status: isCorrect ? "Correct" : "Wrong",
        timeTaken,
      },
    ]);
    setTimeout(() => {
      setSelected("");
      setFeedback("");
      if (currentQ + 1 < questions.length) setCurrentQ((prev) => prev + 1);
      else setIsQuizOver(true);
    }, 2000);
  };

  const handleSkip = () => {
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    setScore((prev) => prev - 1);
    setHistory((prev) => [
      ...prev,
      {
        question: questions[currentQ].question,
        selected: "Skipped",
        correct: questions[currentQ].correct,
        status: "Skipped",
        timeTaken,
      },
    ]);
    if (currentQ + 1 < questions.length) setCurrentQ((prev) => prev + 1);
    else setIsQuizOver(true);
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelected("");
    setFeedback("");
    setScore(0);
    setTimeLeft(15);
    setQuestionStartTime(Date.now());
    setHistory([]);
    setIsQuizOver(false);
  };

  const correctCount = history.filter((h) => h.status === "Correct").length;
  const wrongCount = history.filter((h) => h.status === "Wrong").length;
  const skippedCount = history.filter((h) => h.status === "Skipped").length;
  const longestTime = history.length
    ? Math.max(...history.map((h) => h.timeTaken))
    : 0;

  if (isQuizOver) {
    return (
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <h1>Quiz Over</h1>
        <h2>Total Score: {score}</h2>
        <p>
          Correct: {correctCount} | Wrong: {wrongCount} | Skipped:{" "}
          {skippedCount}
        </p>
        <p>Longest time for one question: {longestTime}s</p>

        <h3>History (all questions)</h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          {history.map((h, i) => (
            <li
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                margin: 8,
                borderWidth: h.timeTaken === longestTime ? 2 : 1,
              }}
            >
              <strong>{h.question}</strong>
              <div>
                Your: {h.selected} | Correct: {h.correct} | Status: {h.status} |
                Time: {h.timeTaken}s
              </div>
            </li>
          ))}
        </ul>

        <button onClick={restartQuiz} style={{ marginTop: 12 }}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const progressPercent =
    ((history.length + (selected ? 1 : 0)) / questions.length) * 100;

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h1>React Quiz (Step 5)</h1>
      <h3>
        Question {currentQ + 1} of {questions.length}
      </h3>

      <div
        style={{
          width: "80%",
          height: 12,
          background: "#eee",
          margin: "10px auto",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            background: "#4caf50",
            borderRadius: 6,
          }}
        />
      </div>

      <h3>{questions[currentQ].question}</h3>
      <p>Time left: {timeLeft}s</p>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {questions[currentQ].options.map((opt) => {
          const baseStyle = {
            margin: 8,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            cursor: selected ? "not-allowed" : "pointer",
          };
          let style = { ...baseStyle };
          if (selected) {
            if (opt === questions[currentQ].correct)
              style.backgroundColor = "#d4edda";
            else if (opt === selected && opt !== questions[currentQ].correct)
              style.backgroundColor = "#f8d7da";
          }
          return (
            <div key={opt} style={style} onClick={() => handleAnswer(opt)}>
              {opt}
            </div>
          );
        })}
      </div>

      {feedback && <h3>{feedback}</h3>}
      {!selected && (
        <button onClick={handleSkip} style={{ marginTop: 12 }}>
          Skip Question (-1)
        </button>
      )}

      <p style={{ marginTop: 12 }}>Score: {score}</p>
    </div>
  );
};

export default QuizApp;
