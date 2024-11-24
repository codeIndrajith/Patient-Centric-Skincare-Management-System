import React, { useState } from 'react';
import '../CSS/ReviewDoctor.css';
import { toast } from 'react-hot-toast';

function ReviewDoctor({ name }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleAddReview = () => {
    if (comment === '') {
      toast.error('Please add a comment');
    } else {
      // Send rating and comment to the backend
      console.log('Rating:', rating, 'Comment:', comment);
      toast.success('Thank you for your review!');
      setRating(5); 
      setComment(''); 
    }
  };

  return (
    <div className="review-container">
      <button className="review-btn" onClick={() => setShowForm(true)}>
        Leave a Review
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Leave a Review</h2>
              <button className="close-button" onClick={() => setShowForm(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="rating-container">
                <span className="rating-title">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? 'filled' : ''}`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-value">{rating} stars</span>
              </div>
              <div className="comment-container">
                <label htmlFor="comment">Your Comment:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="comment-box"
                  placeholder="Enter your review here..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={handleAddReview}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewDoctor;
