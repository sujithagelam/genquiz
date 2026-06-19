import React, { useRef } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";
import { useState } from "react";
import { useEffect } from "react";
const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setlock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let optionArray = [option1, option2, option3, option4];
  const [timeLeft, setTimeLeft] = useState(10);
  const timerRef = useRef(null);
  const [darkTheme, setDarkTheme] = useState(false);

  const checkAns = (e, ans) => {
    if (lock == false) {
      if (question.ans == ans) {
        e.target.classList.add("correct");
        setlock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setlock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  const next = () => {
    if (index === data.length - 1) {
      setResult(true);
      return;
    }

    const nextIndex = index + 1;

    setIndex(nextIndex);

    setQuestion(data[nextIndex]);

    setlock(false);

    setTimeLeft(10);

    optionArray.forEach((option) => {
      option.current.classList.remove("wrong");
      option.current.classList.remove("correct");
    });
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setlock(false);
    setResult(false);
  };
  useEffect(() => {
    if (result) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          next();
          return 10;
        }

        return prev - 1;
      });
    }, 1500);

    return () => clearInterval(timerRef.current);
  }, [index, result]);
  return (
    <div className={`container ${darkTheme ? "dark" : ""}`}>
      {" "}
      <div className="header">
        <h1>⚡🧠 GenQuiz</h1>

        <button className="theme-btn" onClick={() => setDarkTheme(!darkTheme)}>
          {darkTheme ? "☀" : "🌙"}
        </button>
      </div>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h3 className="time">⏳ Time Left: {timeLeft}s</h3>
          <h2>
            {index + 1}.{question.question}
          </h2>
          <ul className="ul-list">
            <li
              ref={option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            you scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
