from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.routes.quiz_routes import router

from app.routes.analytics_routes import router as analytics_router

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "https://skillbytes-quiz-app.vercel.app/"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

app.include_router(router)

app.include_router(analytics_router)