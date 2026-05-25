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

    async function handleNext() {

        if (!selectedOption) {

            alert("Please select an option");

            return;
        }

        const currentQuestion =
            questions[currentIndex];

        await axios.post("/quiz/answer", {

            session_id: sessionId,

            question_id: currentQuestion._id,

            selected_option: selectedOption,

            shown_at: shownAt
        });

        setSelectedOption("");

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

        setCurrentIndex(
            currentIndex + 1
        );
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
                backgroundColor: "#ece5dd",
                padding: "20px"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    backgroundColor: "#075E54",
                    color: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "20px"
                }}
            >

                <h2>
                    SkillBytes Quiz
                </h2>

            </div>

            {/* QUESTION COUNT */}

            <h3>
                Question {currentIndex + 1}
                {" / "}
                {questions.length}
            </h3>

            {/* SUBJECT */}

            <h4>
                Subject:
                {" "}
                {currentQuestion.subject}
            </h4>

            {/* CHAPTER */}

            <h4>
                Chapter:
                {" "}
                {currentQuestion.chapter}
            </h4>

            {/* QUESTION BOX */}

            <div
                style={{
                    backgroundColor: "#DCF8C6",
                    padding: "20px",
                    borderRadius: "15px",
                    maxWidth: "500px",
                    marginTop: "20px",
                    marginBottom: "20px"
                }}
            >

                <h2>
                    {currentQuestion.question}
                </h2>

            </div>

            {/* OPTIONS */}

            {

                currentQuestion.options.map(
                    (option) => (

                        <button

                            key={option}

                            onClick={() =>
                                setSelectedOption(option)
                            }

                            style={{
                                display: "block",
                                width: "300px",
                                marginTop: "10px",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "none",
                                cursor: "pointer",

                                backgroundColor:

                                    selectedOption === option

                                        ? "#25D366"

                                        : "white",

                                color:

                                    selectedOption === option

                                        ? "white"

                                        : "black"
                            }}
                        >

                            {option}

                        </button>
                    )
                )
            }

            {/* NEXT BUTTON */}

            <button

                onClick={handleNext}

                style={{
                    marginTop: "30px",
                    padding: "12px 25px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#25D366",
                    color: "white",
                    cursor: "pointer"
                }}
            >

                Next

            </button>

        </div>
    );
}

export default QuizPage;