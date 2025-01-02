import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StartTest = () => {
  const { subjectCode } = useParams();
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // Fetch the test details and questions from the backend
    fetch(`http://localhost:5000/gettest/${subjectCode}`)
      .then((response) => response.json())
      .then((data) => {
        setTestDetails(data);
        setTimeLeft(data.duration * 60); // duration in minutes * 60 = seconds
      })
      .catch((error) => console.error("Error fetching test details:", error));
  }, [subjectCode]);

  useEffect(() => {
    let interval;
    if (isTestStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit(); // Automatically submit when time is up
    }
    return () => clearInterval(interval);
  }, [isTestStarted, timeLeft]);

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < testDetails.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    // Handle submission logic, for example send the answers to the backend
    console.log("Test submitted", selectedAnswers);

    // You can also send a request to mark the test as completed in the backend here.
    // After submission, you can redirect to a result page or a summary page
    navigate("/userdashboard");  // You can change this route as needed
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!testDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Loading test details...</p>
      </div>
    );
  }

  if (!isTestStarted) {
    // Display the instructions and the "Start Test" button before the test starts
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{testDetails.subject}</h1>
        <div className="bg-white p-6 rounded shadow-md w-96">
          <p className="text-lg font-semibold text-gray-800">Instructions:</p>
          <ul className="list-disc pl-5 mt-4 text-gray-600">
            <li>No malpractice is allowed.</li>
            <li>Read each question carefully before answering.</li>
            <li>Ensure that your internet connection is stable.</li>
            <li>The test will have a time limit of {testDetails.duration} minutes.</li>
            <li>Passing Criteria: {testDetails.passingCriteria}</li>
          </ul>
          <button
            onClick={handleStartTest}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-6"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = testDetails.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Timer */}
      <div className="absolute top-4 right-4 text-xl font-bold text-red-600">
        {formatTime(timeLeft)}
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">{testDetails.subject}</h1>
      <div className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1}/{testDetails.questions.length}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">{currentQuestion.questionText}</p>
          <div className="mt-4">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`option${index}`}
                  name={`question${currentQuestionIndex}`}
                  value={option}
                  checked={selectedAnswers[currentQuestionIndex] === option}
                  onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                  className="mr-2"
                />
                <label htmlFor={`option${index}`} className="text-gray-600">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Previous
          </button>

          {currentQuestionIndex === testDetails.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartTest;
