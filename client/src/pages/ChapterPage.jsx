import { useNavigate } from "react-router-dom";

function ChapterPage() {

    const navigate = useNavigate();

    return (

        <div style={styles.container}>

            <h1>Select Chapter</h1>

            <button
                style={styles.button}
                onClick={() => navigate("/quiz")}
            >
                FastAPI Basics
            </button>

        </div>
    );
}

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ece5dd"
    },

    button: {
        padding: "15px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#25D366",
        color: "white",
        marginTop: "20px",
        cursor: "pointer"
    }
};

export default ChapterPage;