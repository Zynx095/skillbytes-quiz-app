import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import axios from "../api/axios";

function ResultPage() {

    const [searchParams] =
        useSearchParams();

    const sessionId =
        searchParams.get("session_id");

    const [result, setResult] =
        useState(null);

    useEffect(() => {

        fetchResult();

    }, []);

    async function fetchResult() {

        const response = await axios.get(
            `/quiz/result/${sessionId}`
        );

        setResult(response.data);
    }

    if (!result) {

        return <h1>Loading...</h1>;
    }

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#ece5dd",
                padding: "20px"
            }}
        >

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
                    Quiz Results
                </h2>

            </div>

            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "12px"
                }}
            >

                <h2>
                    Correct Answers:
                    {" "}
                    {result.correct_answers}
                </h2>

                <h2>
                    Total Questions:
                    {" "}
                    {result.total_questions}
                </h2>

                <h2>
                    Score:
                    {" "}
                    {result.score_percentage.toFixed(2)}%
                </h2>

            </div>

        </div>
    );
}

export default ResultPage;