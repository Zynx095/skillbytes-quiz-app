from fastapi import APIRouter
from app.database.db import db
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/quiz/start")
async def start_quiz():

    session = {

        "started_at": datetime.utcnow(),
        "completed": False
    }

    result = await db.quiz_sessions.insert_one(session)

    questions = []

    async for question in db.questions.find():

        question["_id"] = str(question["_id"])

        questions.append(question)

    return {
        "session_id": str(result.inserted_id),
        "questions": questions
    }
@router.post("/quiz/answer")
async def submit_answer(data: dict):

    question = await db.questions.find_one({
        "_id": ObjectId(data["question_id"])
    })

    answered_at = datetime.now()

    shown_at = datetime.fromisoformat(
        data["shown_at"].replace("Z", "")
    )

    response_time = (
        answered_at - shown_at
    ).total_seconds()

    attempt = {

        "session_id": data["session_id"],

        "question_id": data["question_id"],

        "selected_option": data["selected_option"],

        "correct_answer": question["correct_answer"],

        "is_correct":
            data["selected_option"]
            ==
            question["correct_answer"],

        "shown_at": shown_at,

        "answered_at": answered_at,

        "response_time": response_time
    }

    await db.question_attempts.insert_one(attempt)

    return {
        "message": "Answer submitted successfully"
    }
@router.get("/quiz/result/{session_id}")
async def get_result(session_id: str):

    attempts = []

    async for attempt in db.question_attempts.find({
        "session_id": session_id
    }):

        attempts.append(attempt)

    total_questions = len(attempts)

    correct_answers = len([
        a for a in attempts
        if a["is_correct"]
    ])

    score_percentage = 0

    if total_questions > 0:

        score_percentage = (
            correct_answers / total_questions
        ) * 100

    return {

        "total_questions": total_questions,

        "correct_answers": correct_answers,

        "score_percentage": score_percentage
    }