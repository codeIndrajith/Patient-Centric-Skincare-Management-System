import React, { useState } from 'react';
import '../CSS/ReviewTreatment.css';
import { toast } from 'react-hot-toast';

function ReviewTreatment({ treatmentId, name }) {
  const [show, setShow] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState([]); // We'll store reviews here (to send to backend)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddReview = () => {
    if (newReview === '') {
      toast.error('Please add a review');
    } else {
      // Store the review in the state (you can send this data to the backend)
      setReviews([...reviews, { user: name, rating: newRating, review: newReview }]);
      setNewReview('');
      setNewRating(5);
      toast.success('Thank you for your feedback!');
    }
  };

  return (
    <div>
      <button className="btn-primary" onClick={handleShow}>
        Review Treatment
      </button>

      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Leave a Review</h2>
              <button className="close-button" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {/* Rating system (5 stars) */}
              <div className="rating-container">
                <label>Rating</label>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${newRating >= star ? 'filled' : ''}`}
                      onClick={() => setNewRating(star)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              {/* Comment box */}
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  rows="3"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="form-control"
                  placeholder="Write your feedback here..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleClose}>
                Close
              </button>
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

export default ReviewTreatment;
