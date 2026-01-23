import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import BottomNavbar from '../layout/BottomNavbar';

interface CompletedSession {
  id: string;
  date: string;
  time: string;
  counselor: string;
  topic: string;
  hasFeedback: boolean;
}

export default function Feedback() {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    document.body.classList.remove('menu-open');
  }, []);

  // Dummy completed sessions
  const completedSessions: CompletedSession[] = [
    {
      id: '1',
      date: '2026-01-20',
      time: '14:00',
      counselor: 'Dr. Sarah Johnson',
      topic: 'Academic Stress Management',
      hasFeedback: false
    },
    {
      id: '2',
      date: '2026-01-18',
      time: '10:30',
      counselor: 'Prof. Michael Chen',
      topic: 'Career Planning',
      hasFeedback: true
    },
    {
      id: '3',
      date: '2026-01-15',
      time: '16:00',
      counselor: 'Dr. Emily Roberts',
      topic: 'Personal Development',
      hasFeedback: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    // Handle feedback submission
    alert(`Feedback submitted!\nRating: ${rating} stars\nComment: ${comment}`);
    setSelectedSession(null);
    setRating(0);
    setComment('');
  };

  const handleCancelFeedback = () => {
    setSelectedSession(null);
    setRating(0);
    setComment('');
  };

  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <h1 className="feedback-title">Session Feedback</h1>
        <p className="feedback-subtitle">Share your experience with completed sessions</p>
      </div>

      <div className="feedback-container">
        {selectedSession ? (
          <div className="feedback-form-wrapper">
            <h2 className="feedback-form-title">Rate Your Session</h2>
            <p className="feedback-session-info">
              {completedSessions.find(s => s.id === selectedSession)?.counselor} - {' '}
              {completedSessions.find(s => s.id === selectedSession)?.topic}
            </p>

            <form className="feedback-form" onSubmit={handleSubmitFeedback}>
              <div className="form-group">
                <label>Rating</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                      />
                    </button>
                  ))}
                </div>
                <span className="rating-text">
                  {rating > 0 && `${rating} out of 5 stars`}
                </span>
              </div>

              <div className="form-group">
                <label>Your Feedback</label>
                <textarea
                  placeholder="Share your thoughts about the session..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              <div className="form-navigation">
                <button type="button" className="back-btn" onClick={handleCancelFeedback}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">Submit Feedback</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="sessions-list">
            {completedSessions.filter(s => !s.hasFeedback).length > 0 ? (
              <>
                {completedSessions
                  .filter(s => !s.hasFeedback)
                  .map((session) => (
                    <div key={session.id} className="session-card">
                      <div className="session-header">
                        <div className="session-date">
                          <span className="date-label">Date</span>
                          <span className="date-value">{formatDate(session.date)}</span>
                        </div>
                        <div className="session-time">
                          <span className="time-label">Time</span>
                          <span className="time-value">{session.time}</span>
                        </div>
                      </div>
                      
                      <div className="session-body">
                        <div className="session-info">
                          <span className="info-label">Counselor</span>
                          <span className="info-value">{session.counselor}</span>
                        </div>
                        
                        <div className="session-info">
                          <span className="info-label">Topic</span>
                          <span className="info-value">{session.topic}</span>
                        </div>
                      </div>

                      <button 
                        className="feedback-btn"
                        onClick={() => setSelectedSession(session.id)}
                      >
                        Give Feedback
                      </button>
                    </div>
                  ))}
              </>
            ) : (
              <div className="no-sessions">
                <p>No sessions awaiting feedback. All caught up!</p>
              </div>
            )}

            
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}
