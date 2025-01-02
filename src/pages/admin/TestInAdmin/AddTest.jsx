import React, { useState } from "react";
import axios from "axios";

const AddTest = () => {
  const [testDetails, setTestDetails] = useState({
    subject: "",
    subjectCode: "",
    duration: "",
    passingCriteria: "",
  });

  const [questions, setQuestions] = useState([]);

  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    marks: "",
  });

  const subjects = ["English", "Maths", "Science", "History", "Geography", "Physics", "Chemistry", "Biology"];
  const passingCriteriaOptions = ["40", "50", "60", "70", "80", "90"];

  const handleTestDetailsChange = (e) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleEditQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const toggleEdit = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isEditing = !updatedQuestions[index].isEditing;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...newQuestion, isEditing: false }]);
    setNewQuestion({
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      marks: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...testDetails,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        options: [
          q.option1,
          q.option2,
          q.option3,
          q.option4
        ],
        correctAnswer: q.correctAnswer,
        marks: parseInt(q.marks),
      })),
    };
    //const questions = [];
// for (let i = 0; i < questionsInput.length; i++) {
//   const question = questionsInput[i];
//   questions.push({
//     questionText: question.questionText,
//     options: question.options.map((o) => o.option), // Extract options
//     correctAnswer: question.correctAnswer,
//     marks: question.marks,
//   });
// }

// const payload = {
//   ...testDetails,
//   questions,
// };

    try {
      const response = await axios.post("http://localhost:5000/addnewtest", payload);
      console.log("Response:", response.data);
      alert("Test saved successfully!");
      // Clear the form after a successful submission
      setTestDetails({
        subject: "",
        subjectCode: "",
        duration: "",
        passingCriteria: "",
      });
      setQuestions([]);
    } catch (error) {
      console.error("Error submitting test:", error.response?.data || error.message);
      alert("Failed to save the test. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Test</h1>

      {/* Test Details Form */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Test Details</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <select
              name="subject"
              value={testDetails.subject}
              onChange={handleTestDetailsChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="subjectCode"
              value={testDetails.subjectCode}
              onChange={handleTestDetailsChange}
              placeholder="Subject Code"
              className="p-2 border rounded"
              required
            />

            <input
              type="number"
              name="duration"
              value={testDetails.duration}
              onChange={handleTestDetailsChange}
              placeholder="Duration (in minutes)"
              className="p-2 border rounded"
              required
            />

            <select
              name="passingCriteria"
              value={testDetails.passingCriteria}
              onChange={handleTestDetailsChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Passing Criteria</option>
              {passingCriteriaOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Add Question Form */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="questionText"
          value={newQuestion.questionText}
          onChange={handleQuestionChange}
          placeholder="Question Text"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option1"
          value={newQuestion.option1}
          onChange={handleQuestionChange}
          placeholder="Option 1"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option2"
          value={newQuestion.option2}
          onChange={handleQuestionChange}
          placeholder="Option 2"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option3"
          value={newQuestion.option3}
          onChange={handleQuestionChange}
          placeholder="Option 3"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="option4"
          value={newQuestion.option4}
          onChange={handleQuestionChange}
          placeholder="Option 4"
          className="p-2 border rounded"
          required
        />
        <select
          name="correctAnswer"
          value={newQuestion.correctAnswer}
          onChange={handleQuestionChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Correct Answer</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <input
          type="number"
          name="marks"
          value={newQuestion.marks}
          onChange={handleQuestionChange}
          placeholder="Marks"
          className="p-2 border rounded"
          required
        />
      </div>
      <button
        type="button"
        onClick={addQuestion}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add Question
      </button>

      {/* Questions Table */}
      <div className="mt-8">
        {questions.length > 0 && (
          <table className="w-full border-collapse border border-gray-300 mb-4 table-auto">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Question</th>
                <th className="border border-gray-300 p-2">Options</th>
                <th className="border border-gray-300 p-2">Correct Answer</th>
                <th className="border border-gray-300 p-2">Marks</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{question.questionText}</td>
                  <td className="border border-gray-300 p-2">
                    {`${question.option1}, ${question.option2}, ${question.option3}, ${question.option4}`}
                  </td>
                  <td className="border border-gray-300 p-2">{question.correctAnswer}</td>
                  <td className="border border-gray-300 p-2">{question.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mt-6"
      >
        Save Test
      </button>
    </div>
  );
};

export default AddTest;
