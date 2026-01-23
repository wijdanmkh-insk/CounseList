interface SignInFormProps {
  onToggleToSignUp: () => void;
}

export default function SignInForm({ onToggleToSignUp }: SignInFormProps) {
  return (
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

        <p className="toggle-text">
          Don't have an account? 
          <span onClick={onToggleToSignUp}> Sign Up</span>
        </p>
        
        <button type="submit" className="submit-btn">Sign In</button>
      </form>
    </div>
  );
}
