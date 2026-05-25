import { useEffect, useState } from "react";

import axios from "../api/axios";

function AnalyticsPage() {

    const [analytics, setAnalytics] =
        useState(null);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    async function fetchAnalytics() {

        const dau =
            await axios.get(
                "/analytics/dau"
            );

        const wau =
            await axios.get(
                "/analytics/wau"
            );

        const answered =
            await axios.get(
                "/analytics/questions-answered"
            );

        const served =
            await axios.get(
                "/analytics/questions-served"
            );

        const avgTime =
            await axios.get(
                "/analytics/average-response-time"
            );

        const completion =
            await axios.get(
                "/analytics/completion-rate"
            );

        setAnalytics({

            dau:
                dau.data.daily_active_users,

            wau:
                wau.data.weekly_active_users,

            answered:
                answered.data.questions_answered,

            served:
                served.data.questions_served,

            avgTime:
                avgTime.data.average_response_time,

            completion:
                completion.data.completion_rate
        });
    }

    if (!analytics) {

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

                <h1>
                    Analytics Dashboard
                </h1>

            </div>

            <div style={cardStyle}>

                <h2>
                    Daily Active Users
                </h2>

                <h1>
                    {analytics.dau}
                </h1>

            </div>

            <div style={cardStyle}>

                <h2>
                    Weekly Active Users
                </h2>

                <h1>
                    {analytics.wau}
                </h1>

            </div>

            <div style={cardStyle}>

                <h2>
                    Questions Answered
                </h2>

                <h1>
                    {analytics.answered}
                </h1>

            </div>

            <div style={cardStyle}>

                <h2>
                    Questions Served
                </h2>

                <h1>
                    {analytics.served}
                </h1>

            </div>

            <div style={cardStyle}>

                <h2>
                    Average Response Time
                </h2>

                <h1>
                    {analytics.avgTime.toFixed(2)}
                    s
                </h1>

            </div>

            <div style={cardStyle}>

                <h2>
                    Completion Rate
                </h2>

                <h1>
                    {analytics.completion.toFixed(2)}
                    %
                </h1>

            </div>

        </div>
    );
}

const cardStyle = {

    backgroundColor: "white",

    padding: "20px",

    borderRadius: "12px",

    marginBottom: "15px"
};

export default AnalyticsPage;