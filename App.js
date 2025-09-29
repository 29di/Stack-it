import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AskQuestion from './pages/AskQuestion'; // ✅ check path: likely in /pages
import QuestionDetails from './pages/QuestionDetails'; // ✅ check path: likely in /pages
import { ToastProvider } from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Navbar />
        <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-gray-100 transition-colors">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/question/:id" element={<QuestionDetails />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;