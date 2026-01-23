import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from './PopUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const [view, setView] = useState<'signin' | 'signup'>('signin');
  const [signupStep, setSignupStep] = useState(1);

  const handleSignupNext = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupStep(2);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/home');
  };

  const handleSigninSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic
    navigate('/home');
  };

  return (
    <PopUp isOpen={isOpen} onClose={onClose}>
      {view === 'signin' && (
        <div className="signin-form">
          <h2 className="popup-title">Sign In</h2>
          <p className="popup-subtitle">Welcome back!</p>
          
          <form className="auth-form" onSubmit={handleSigninSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter username" required />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" required />
            </div>
            
            <button type="submit" className="submit-btn">Sign In</button>
            
            <p className="toggle-text">
              Don't have an account? 
              <span onClick={() => setView('signup')}> Sign Up!</span>
            </p>
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
                <input type="text" name="username" placeholder="Enter username" autoComplete="username" required />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter email" autoComplete="email" required />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter password" autoComplete="new-password" required />
              </div>
              
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm password" autoComplete="new-password" required />
              </div>

              <button type="submit" className="submit-btn">Next</button>

              <p className="toggle-text">
                Already have an account? 
                <span onClick={() => setView('signin')}> Sign In!</span>
              </p>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="fullName" placeholder="Enter full name" autoComplete="name" required />
                </div>

              <div className="form-group">
                <label>Nickname</label>
                <input type="text" name="nickname" placeholder="Enter nickname" autoComplete="off" required />
              </div>
              
              <div className="form-group">
                <label>Sex</label>
                <select name="sex" autoComplete="sex" required>
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" autoComplete="bday" required />
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
