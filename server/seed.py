from pymongo import MongoClient

from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)

db = client["skillbytes"]

db.questions.delete_many({})

db.users.delete_many({})

db.users.insert_many([

    {
        "name": "Guest User 1"
    },

    {
        "name": "Guest User 2"
    },

    {
        "name": "Guest User 3"
    }

])

db.questions.insert_many([

    # REACT QUESTIONS

    {
        "subject": "Frontend Development",
        "chapter": "React Basics",
        "question": "What is React?",
        "options": [
            "Library",
            "Framework",
            "Database",
            "Language"
        ],
        "correct_answer": "Library"
    },

    {
        "subject": "Frontend Development",
        "chapter": "React Basics",
        "question": "Which hook manages state?",
        "options": [
            "useFetch",
            "useState",
            "useLoop",
            "useData"
        ],
        "correct_answer": "useState"
    },

    {
        "subject": "Frontend Development",
        "chapter": "React Basics",
        "question": "React is mainly used for?",
        "options": [
            "Backend",
            "Frontend UI",
            "Database",
            "Hosting"
        ],
        "correct_answer": "Frontend UI"
    },

    # FASTAPI QUESTIONS

    {
        "subject": "Backend Development",
        "chapter": "FastAPI Basics",
        "question": "FastAPI is used for?",
        "options": [
            "Frontend",
            "Backend APIs",
            "Database",
            "Hosting"
        ],
        "correct_answer": "Backend APIs"
    },

    {
        "subject": "Backend Development",
        "chapter": "FastAPI Basics",
        "question": "Which language is used with FastAPI?",
        "options": [
            "Java",
            "Python",
            "C++",
            "Go"
        ],
        "correct_answer": "Python"
    },

    {
        "subject": "Backend Development",
        "chapter": "FastAPI Basics",
        "question": "FastAPI automatically provides?",
        "options": [
            "Swagger Docs",
            "Game Engine",
            "Compiler",
            "Database"
        ],
        "correct_answer": "Swagger Docs"
    },

    # MONGODB QUESTIONS

    {
        "subject": "Database Systems",
        "chapter": "MongoDB Basics",
        "question": "MongoDB is a?",
        "options": [
            "SQL Database",
            "NoSQL Database",
            "Framework",
            "Language"
        ],
        "correct_answer": "NoSQL Database"
    },

    {
        "subject": "Database Systems",
        "chapter": "MongoDB Basics",
        "question": "MongoDB stores data in?",
        "options": [
            "Tables",
            "Documents",
            "Arrays",
            "Functions"
        ],
        "correct_answer": "Documents"
    },

    {
        "subject": "Database Systems",
        "chapter": "MongoDB Basics",
        "question": "MongoDB Atlas is?",
        "options": [
            "Cloud Database Service",
            "Compiler",
            "Frontend Tool",
            "Programming Language"
        ],
        "correct_answer": "Cloud Database Service"
    }

])

print("Questions inserted successfully")