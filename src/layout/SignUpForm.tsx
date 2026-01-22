import { useState } from 'react';

interface SignUpFormProps {
  onToggleToSignIn: () => void;
}

export default function SignUpForm({ onToggleToSignIn }: SignUpFormProps) {
  const [step, setStep] = useState(1);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="signup-form">
      <h2 className="popup-title">Sign Up</h2>
      <p className="popup-subtitle">
        {step === 1 ? 'Create your account' : 'Additional information'}
      </p>
      
      {step === 1 ? (
        <form className="auth-form" onSubmit={handleNextStep}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter username" required />
          </div>
          
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name" required />
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
          
          <p className="toggle-text">
            Already have an account? 
            <span onClick={onToggleToSignIn}> Sign In</span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
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
            <button type="button" className="back-btn" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="submit-btn">Create Account</button>
          </div>
        </form>
      )}
    </div>
  );
}
