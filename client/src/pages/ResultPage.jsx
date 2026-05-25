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
                padding: "40px"
            }}
        >

            <h1>
                Quiz Finished
            </h1>

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
                {result.score_percentage}%
            </h2>

        </div>
    );
}

export default ResultPage;