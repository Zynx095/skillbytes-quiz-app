import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >

            <h1>SkillBytes Quiz</h1>

            <button
                onClick={() => navigate("/quiz")}
            >
                Start Quiz
            </button>

        </div>
    );
}

export default HomePage;