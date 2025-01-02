import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all tests from the backend API
    fetch("http://localhost:5000/alltests")
      .then((response) => response.json())
      .then((data) => setTests(data))
      .catch((error) => console.error("Error fetching tests:", error));
  }, []);

  const handleTestClick = (subjectCode, isSubmitted) => {
    if (!isSubmitted) {
      navigate(`/starttest/${subjectCode}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Tests</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {tests.length === 0 ? (
          <p className="text-gray-500">No tests available at the moment.</p>
        ) : (
          tests.map((test) => (
            <div
              key={test.subjectCode}
              className={`bg-white p-4 rounded shadow-md w-64 cursor-pointer hover:shadow-lg ${test.isSubmitted ? "bg-red-500" : ""}`}
              onClick={() => handleTestClick(test.subjectCode, test.isSubmitted)}
              style={{
                pointerEvents: test.isSubmitted ? "none" : "auto",
                opacity: test.isSubmitted ? 0.5 : 1,
              }}
            >
              <h2 className="text-xl font-semibold text-gray-800">{test.subject}</h2>
              <p className="text-gray-600">Subject Code: {test.subjectCode}</p>
              <p className="text-gray-500">Duration: {test.duration} mins</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
