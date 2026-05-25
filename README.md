#  SkillBytes Quiz App

Welcome to **SkillBytes**—a modern, lightweight quiz application designed to feel exactly like texting a chatbot on WhatsApp! 

Instead of boring, traditional exam interfaces, SkillBytes engages users with a familiar, conversational UI. Built with a React frontend and a blazing-fast FastAPI backend, it tracks deep analytics behind the scenes without ever requiring the user to create an account or log in.

---

##  Features

**For the User (The Chat Experience):**
* **WhatsApp-Style UI:** Clean, conversational interface with familiar message bubbles, timestamps, and read receipts.
* **Frictionless Entry:** Absolutely zero sign-ups or logins required. Just start chatting and learning.
* **Structured Learning Path:** Seamlessly navigate through `Exam` -> `Subject` ->  `Chapter`.
* **Focused Quizzing:** Questions are served one at a time (Multiple Choice, single correct answer) to keep cognitive load low.
* **Instant Results:** Immediate feedback at the end of the quiz session.

**Under the Hood (Analytics Engine):**
* **Session Tracking:** Generates unique session IDs for every user to track their journey.
* **Response Time:** Measures exactly how long it takes a user to answer a specific question.
* **Rich Analytics APIs Included:**
  **DAU & WAU:** Daily and Weekly Active Users.
    **Completion Rate:** How many users finish the quiz vs. drop off.
     **Average Response Time:** Identifies which questions are taking the longest.
     **Drop-off Analysis:** Pinpoints exactly where users are abandoning the quiz.
     **Volume Metrics:** Total questions served vs. total questions answered.
     **Peak Activity:** Finds the most active hours of the day.

---

##  Tech Stack

**Frontend:**
* [React.js](https://reactjs.org/) - UI Library
* [Vite](https://vitejs.dev/) - Lightning-fast build tool
* [Axios](https://axios-http.com/) - API requests

**Backend:**
* [FastAPI](https://fastapi.tiangolo.com/) - High-performance Python web framework
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud NoSQL Database
* [PyMongo](https://pymongo.readthedocs.io/) - Python driver for MongoDB

---

##  Getting Started (Local Development)

Want to run this locally? It's super easy. Follow these steps to get both the frontend and backend up and running.

### Prerequisites
Make sure you have the following installed on your machine:
* **Node.js** (v16 or higher)
* **Python** (v3.9 or higher)
* A **MongoDB Atlas** account (or local MongoDB server)

### 1. Database Setup
1. Create a new cluster on MongoDB Atlas.
2. Get your connection string (it looks like `mongodb+srv://<username>:<password>@cluster...`).
3. Inside the `server/` directory, create a new file named `.env`.
4. Add your database credentials to the `.env` file like this:

```env
MONGO_URL=your_mongodb_connection_string_here
DB_NAME=skillbytes
