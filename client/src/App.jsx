import { BrowserRouter, Routes, Route } from "react-router-dom";

import ExamPage from "./pages/ExamPage";
import SubjectPage from "./pages/SubjectPage";
import ChapterPage from "./pages/ChapterPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<ExamPage />}
        />

        <Route
          path="/subject"
          element={<SubjectPage />}
        />

        <Route
          path="/chapter"
          element={<ChapterPage />}
        />

        <Route
          path="/quiz"
          element={<QuizPage />}
        />

        <Route
          path="/result"
          element={<ResultPage />}
        />
        <Route
          path="/analytics"
          element={<AnalyticsPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;