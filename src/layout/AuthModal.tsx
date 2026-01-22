import { useState } from 'react';
import PopUp from './PopUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<'signin' | 'signup'>('signin');
  const [signupStep, setSignupStep] = useState(1);

  const handleSignupNext = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupStep(2);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <PopUp isOpen={isOpen} onClose={onClose}>
      {view === 'signin' && (
        <div className="signin-form">
          <h2 className="popup-title">Sign In</h2>
          <p className="popup-subtitle">Welcome back!</p>
          
          <form className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter username" required />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>
            
            <button type="submit" className="submit-btn">Sign In</button>
          </form>
        </div>
      )}

      {view === 'signup' && (
        <div className="signup-form">
          <h2 className="popup-title">Sign Up</h2>
          <p className="popup-subtitle">
            {signupStep === 1 ? 'Create your account' : 'Additional information'}
          </p>
          
          {signupStep === 1 ? (
            <form className="auth-form" onSubmit={handleSignupNext}>
              <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="Enter username" required />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email" required />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter password" required />
              </div>
              
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm password" required />
              </div>
              
              <button type="submit" className="submit-btn">Next</button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter full name" required />
                </div>

              <div className="form-group">
                <label>Nickname</label>
                <input type="text" placeholder="Enter nickname" required />
              </div>
              
              <div className="form-group">
                <label>Sex</label>
                <select required>
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" required />
              </div>
              
              <div className="form-navigation">
                <button type="button" className="back-btn" onClick={() => setSignupStep(1)}>
                  Back
                </button>
                <button type="submit" className="submit-btn">Create Account</button>
              </div>
            </form>
          )}
        </div>
      )}
    </PopUp>
  );
}
