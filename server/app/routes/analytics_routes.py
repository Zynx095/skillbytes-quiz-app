from fastapi import APIRouter
from app.database.db import db
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/analytics/dau")
async def daily_active_users():

    today = datetime.now() - timedelta(days=1)

    sessions = await db.quiz_sessions.count_documents({
        "started_at": {
            "$gte": today
        }
    })

    return {
        "daily_active_users": sessions
    }

@router.get("/analytics/wau")
async def weekly_active_users():

    week = datetime.now() - timedelta(days=7)

    sessions = await db.quiz_sessions.count_documents({
        "started_at": {
            "$gte": week
        }
    })

    return {
        "weekly_active_users": sessions
    }
@router.get("/analytics/questions-answered")
async def questions_answered():

    count = await db.question_attempts.count_documents({})

    return {
        "questions_answered": count
    }
@router.get("/analytics/average-response-time")
async def average_response_time():

    pipeline = [

        {
            "$group": {

                "_id": None,

                "average_time": {
                    "$avg": "$response_time"
                }
            }
        }
    ]

    result = await db.question_attempts.aggregate(
        pipeline
    ).to_list(1)

    average = 0

    if result:

        average = result[0]["average_time"]

    return {
        "average_response_time": average
    }
@router.get("/analytics/completion-rate")
async def completion_rate():

    total_sessions =await db.quiz_sessions.count_documents({})

    completed_sessions =await db.question_attempts.distinct(
            "session_id"
        )

    completion = 0

    if total_sessions > 0:

        completion = (
            len(completed_sessions)
            /
            total_sessions
        ) * 100

    return {
        "completion_rate": completion
    }
@router.get("/analytics/peak-hours")
async def peak_hours():

    pipeline = [

        {
            "$group": {

                "_id": {
                    "$hour": "$answered_at"
                },

                "count": {
                    "$sum": 1
                }
            }
        },

        {
            "$sort": {
                "count": -1
            }
        }
    ]

    result =await db.question_attempts.aggregate(
            pipeline
        ).to_list(None)

    return result
@router.get("/analytics/dropoff")
async def dropoff_analysis():

    pipeline = [

        {
            "$group": {

                "_id": "$question_id",

                "attempts": {
                    "$sum": 1
                }
            }
        },

        {
            "$sort": {
                "attempts": 1
            }
        }
    ]

    result =  await db.question_attempts.aggregate(
            pipeline
        ).to_list(None)

    return result
@router.get("/analytics/questions-served")
async def questions_served():

    count = await db.question_attempts.count_documents({})

    return {
        "questions_served": count
    }