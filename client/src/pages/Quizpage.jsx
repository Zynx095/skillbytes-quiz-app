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

    // Helper to show the current time in WhatsApp format (e.g., "10:42 AM")
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    useEffect(() => {
        startQuiz();
    }, []);

    async function startQuiz() {
        const response = await axios.post("/quiz/start");
        setQuestions(response.data.questions);
        setSessionId(response.data.session_id);
        setShownAt(new Date().toISOString());
    }

    async function handleOptionClick(option) {
        setSelectedOption(option);
        const currentQuestion = questions[currentIndex];

        await axios.post("/quiz/answer", {
            session_id: sessionId,
            question_id: currentQuestion._id,
            selected_option: option,
            shown_at: shownAt
        });

        setTimeout(() => {
            if (currentIndex + 1 >= questions.length) {
                navigate(`/result?session_id=${sessionId}`);
                return;
            }
            setShownAt(new Date().toISOString());
            setSelectedOption("");
            setCurrentIndex(currentIndex + 1);
        }, 1000); // 1 second delay to feel like a real chat response
    }

    if (questions.length === 0) {
        return <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>Loading chat...</div>;
    }

    const currentQuestion = questions[currentIndex];

    return (
        /* OUTER CONTAINER: Centers the app on desktop, full screen on mobile */
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#d1d7db", // Darker gray behind the "phone" screen
            display: "flex",
            justifyContent: "center",
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
        }}>
            
            /* INNER MOBILE FRAME: The actual WhatsApp Screen */
            <div style={{
                width: "100%",
                maxWidth: "600px", // Keeps it looking like a phone on big monitors
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#e5ddd5",
                backgroundImage: "url('/whatsapp-bg.jpg')", // Make sure this is in your public folder!
                backgroundRepeat: "repeat",
                backgroundSize: "300px",
                boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                position: "relative"
            }}>

                {/* 1. WHATSAPP HEADER */}
                <div style={{
                    backgroundColor: "#075E54",
                    color: "white",
                    padding: "10px 15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    zIndex: 10,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                }}>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                        backgroundImage: "url('https://api.dicebear.com/7.x/bottts/svg?seed=QuizBot')", // Fun default bot avatar
                        backgroundSize: "cover"
                    }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>SkillBytes Bot</h3>
                        <small style={{ color: "#d9d9d9", fontSize: "12px" }}>online</small>
                    </div>
                </div>

                {/* 2. CHAT AREA (Scrollable) */}
                <div style={{
                    flex: 1,
                    padding: "20px 15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    overflowY: "auto"
                }}>

                    {/* SYSTEM MESSAGE: Subject / Chapter (Looks like the yellow date stamps) */}
                    <div style={{
                        alignSelf: "center",
                        backgroundColor: "#FFF3C2",
                        color: "rgba(0,0,0,0.8)",
                        padding: "5px 12px",
                        borderRadius: "10px",
                        fontSize: "12px",
                        boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                        textAlign: "center",
                        marginBottom: "10px"
                    }}>
                        <strong>{currentQuestion.subject}</strong> • {currentQuestion.chapter}
                    </div>

                    {/* BOT MESSAGE: The Question */}
                    <div style={{
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: "8px 10px",
                        borderRadius: "0px 8px 8px 8px", // WhatsApp left-tail effect
                        maxWidth: "85%",
                        boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                        position: "relative"
                    }}>
                        <span style={{ fontSize: "15px", lineHeight: "1.4", color: "#111" }}>
                            {currentQuestion.question}
                        </span>
                        <span style={{
                            float: "right",
                            fontSize: "11px",
                            color: "#999",
                            marginTop: "8px",
                            marginLeft: "15px"
                        }}>
                            {currentTime}
                        </span>
                    </div>

                    {/* BOT MESSAGE OPTIONS: Interactive Buttons */}
                    {!selectedOption && (
                        <div style={{
                            alignSelf: "flex-start",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            maxWidth: "85%",
                            width: "100%"
                        }}>
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionClick(option)}
                                    style={{
                                        backgroundColor: "#f0f2f5",
                                        color: "#00a884",
                                        border: "1px solid #d1d7db",
                                        padding: "10px 15px",
                                        borderRadius: "20px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        transition: "background-color 0.2s"
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = "#e4e6eb"}
                                    onMouseOut={(e) => e.target.style.backgroundColor = "#f0f2f5"}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* USER MESSAGE: The Selected Answer */}
                    {selectedOption && (
                        <div style={{
                            alignSelf: "flex-end",
                            backgroundColor: "#DCF8C6", // WhatsApp Green
                            padding: "8px 10px",
                            borderRadius: "8px 0px 8px 8px", // WhatsApp right-tail effect
                            maxWidth: "85%",
                            boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                            position: "relative"
                        }}>
                            <span style={{ fontSize: "15px", lineHeight: "1.4", color: "#111" }}>
                                {selectedOption}
                            </span>
                            <span style={{
                                float: "right",
                                fontSize: "11px",
                                color: "#54b82a", // Darker green for read receipt feel
                                marginTop: "8px",
                                marginLeft: "15px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px"
                            }}>
                                {currentTime} ✓✓
                            </span>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default QuizPage;