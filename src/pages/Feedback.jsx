import React, { useState } from 'react';

const ReviewPage = () => {
  const [review, setReview] = useState({
    rating: 0,
    comments: ''
  });

  const handleRatingChange = (e) => {
    setReview({ ...review, rating: e.target.value });
  };

  const handleCommentsChange = (e) => {
    setReview({ ...review, comments: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Review Submitted:', review);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Review</h1>
        
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-6">
          <p className="text-lg text-gray-800 mb-2">Review Overview</p>
          <p className="text-gray-700">
            Provide your feedback on the employee's performance. Your comments and rating will help in their professional development.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">Rating:</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => setReview({ ...review, rating: star })}
                >
                  <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">Comments:</label>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={review.comments}
              onChange={handleCommentsChange}
              placeholder="Write your comments here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
