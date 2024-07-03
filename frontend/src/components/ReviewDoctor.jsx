import React, { useState } from 'react';
import '../CSS/ReviewDoctor.css';
import { toast } from 'react-hot-toast';

function ReviewDoctor({ treatmentId }) {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([
    { user: 'John Doe', rating: 5, review: 'Great Doctor!' },
    { user: 'Jane Smith', rating: 4, review: 'Good but a bit expensive.' },
    // Add more sample reviews if needed for testing scroll
    { user: 'Alice', rating: 3, review: 'It was okay.' },
    { user: 'Bob', rating: 2, review: 'Not satisfied.' },
    { user: 'Charlie', rating: 5, review: 'Excellent!' },
    { user: 'David', rating: 4, review: ' good.' },
    { user: 'Eve', rating: 3, review: 'Average.' },
    { user: 'Frank', rating: 1, review: 'Terrible experience.' },
    { user: 'Grace', rating: 5, review: 'Not good it!' },
    { user: 'Hank', rating: 4, review: 'Good service.' },
  ]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddReview = () => {
    if (newReview === '') {
      toast.error('Add review');
    } else {
      setReviews([
        ...reviews,
        { user: 'New User', rating: newRating, review: newReview },
      ]);
      setNewReview('');
      setNewRating(5);
      toast.success('Thank You!');
    }
  };

  return (
    <>
      <button className="btn-primary" onClick={handleShow}>
        Review Doctor
      </button>

      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Review Doctor</h2>
              <button className="close-button" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="table-container">
                <table className="review-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Rating</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review, index) => (
                      <tr key={index}>
                        <td>{review.user}</td>
                        <td>{review.rating}</td>
                        <td>{review.review}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="form-group">
                <label>Review</label>
                <textarea
                  rows="3"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="form-control"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button className="btn-primary" onClick={handleAddReview}>
                Add Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewDoctor;
