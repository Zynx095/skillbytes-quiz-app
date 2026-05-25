import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "../api/axios";

function QuizPage() {

    const [questions, setQuestions] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [selectedOption, setSelectedOption] = useState("");

    const [sessionId, setSessionId] = useState("");

    const [shownAt, setShownAt] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        startQuiz();

    }, []);

    async function startQuiz() {

        const response = await axios.post(
            "/quiz/start"
        );

        setQuestions(response.data.questions);

        setSessionId(response.data.session_id);

        setShownAt(
            new Date().toISOString()
        );
    }

    async function handleOptionClick(option) {

        setSelectedOption(option);

        const currentQuestion =
            questions[currentIndex];

        await axios.post("/quiz/answer", {

            session_id: sessionId,

            question_id: currentQuestion._id,

            selected_option: option,

            shown_at: shownAt
        });

        setTimeout(() => {

            if (
                currentIndex + 1 >= questions.length
            ) {

                navigate(
                    `/result?session_id=${sessionId}`
                );

                return;
            }

            setShownAt(
                new Date().toISOString()
            );

            setSelectedOption("");

            setCurrentIndex(
                currentIndex + 1
            );

        }, 1000);
    }

    if (questions.length === 0) {

        return <h1>Loading...</h1>;
    }

    const currentQuestion =
        questions[currentIndex];

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundImage:

                    "url('https://imgs.search.brave.com/KsIfgGDCH2ue3e1kKHnL_8AMTbnCi4HcdGUpUmz8nsc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzk3/NjE3NS5qcGc')",

                backgroundSize: "cover",

                padding: "20px",

                fontFamily: "Arial"
            }}
        >

            {/* TOP BAR */}

            <div
                style={{
                    backgroundColor: "#075E54",
                    color: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >

                <div
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "white"
                    }}
                />

                <div>

                    <h3
                        style={{
                            margin: 0
                        }}
                    >
                        SkillBytes
                    </h3>

                    <small>
                        Quiz Bot
                    </small>

                </div>

            </div>

            {/* SUBJECT */}

            <div
                style={{
                    backgroundColor: "white",
                    padding: "12px",
                    borderRadius: "12px",
                    maxWidth: "350px",
                    marginBottom: "10px"
                }}
            >

                <strong>
                    Subject:
                </strong>

                {" "}

                {currentQuestion.subject}

                <br />

                <strong>
                    Chapter:
                </strong>

                {" "}

                {currentQuestion.chapter}

            </div>

            {/* BOT QUESTION */}

            <div
                style={{
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "12px",
                    maxWidth: "350px",
                    marginBottom: "20px"
                }}
            >

                <h3>
                    {currentQuestion.question}
                </h3>

            </div>

            {/* USER SELECTED MESSAGE */}

            {

                selectedOption && (

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >

                        <div
                            style={{
                                backgroundColor: "#DCF8C6",
                                padding: "12px",
                                borderRadius: "12px",
                                maxWidth: "250px",
                                marginBottom: "20px"
                            }}
                        >

                            {selectedOption}

                        </div>

                    </div>
                )
            }

            {/* OPTIONS */}

            {

                !selectedOption && (

                    currentQuestion.options.map(
                        (option) => (

                            <button

                                key={option}

                                onClick={() =>
                                    handleOptionClick(option)
                                }

                                style={{
                                    display: "block",

                                    width: "100%",

                                    maxWidth: "350px",

                                    padding: "12px",

                                    marginBottom: "10px",

                                    borderRadius: "12px",

                                    border: "none",

                                    cursor: "pointer",

                                    backgroundColor: "white",

                                    textAlign: "left"
                                }}
                            >

                                {option}

                            </button>
                        )
                    )
                )
            }

        </div>
    );
}

export default QuizPage;
