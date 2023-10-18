import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";

function ReviewSection({ reviews, handleReview }) {
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const submitReview = () => {
    handleReview(userRating, userReview);
  };

  return (
    <div className="review-section">
      <h2 className="review-title">User Reviews</h2>
      <div className="creative-review-input">
        <div className="creative-review-form">
          <h3 className="creative-review-title">Share Your Thoughts</h3>
          <div className="creative-rating">
            <div className="star-rating mb-2 ">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  onClick={() => handleRatingClick(rating)}
                  className={`star ${userRating >= rating ? "filled" : ""}`}
                >
                  <FontAwesomeIcon icon={SolidIcons.faStar} />
                </span>
              ))}
            </div>
          </div>
          <div className="creative-textarea-container">
            <Form.Control
              as="textarea"
              rows={5}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder="Write your review here..."
              className="creative-review-textarea"
            />
          </div>
          <Button
            variant="primary"
            onClick={submitReview}
            className="creative-submit-button"
          >
            Submit Review
          </Button>
        </div>
      </div>

      <hr className="my-4" />

      <h3 className="reviews-title">User Reviews</h3>
      <ListGroup className="reviews-list">
        {reviews.length === 0 ? (
          <ListGroup.Item className="mb-4">
            <p className="text-muted">No reviews available.</p>
          </ListGroup.Item>
        ) : (
          reviews.map((review, index) => (
            <ListGroup.Item key={index} className="mb-4 review-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{review.attendeeId.fullName}</h5>
                  <small className="text-muted">
                    {review.feedbackTime
                      ? new Date(review.feedbackTime).toLocaleDateString()
                      : "N/A"}
                  </small>
                </div>
                <div className="star-rating">
                  {Array(review.rating)
                    .fill()
                    .map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className="star"
                        role="img"
                        aria-label="star"
                      >
                        ⭐
                      </span>
                    ))}
                </div>
              </div>
              <p className="review-text">{review.comment}</p>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
}

export default ReviewSection;
