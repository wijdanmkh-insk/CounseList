import { db } from '../firebase/firebase';
import { ref, set, get} from 'firebase/database';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp from './PopUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  nickname: string;
  sex: string;
  dateOfBirth: string;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const [view, setView] = useState<'signin' | 'signup'>('signin');
  const [signupStep, setSignupStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [signupData, setSignupData] = useState<SignupData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    nickname: '',
    sex: '',
    dateOfBirth: ''
  });

  const [signinData, setSigninData] = useState({
    username: '',
    password: ''
  });

  // Generate unique user ID
  const generateUID = (): string => {
    return 'uid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Check if username already exists
  const checkUsernameExists = async (username: string): Promise<boolean> => {
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        return Object.values(users).some((user: any) => user.username === username);
      }
      return false;
    } catch (error) {
      console.error('Error checking username:', error);
      throw error;
    }
  };

  // Check if email already exists
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        return Object.values(users).some((user: any) => user.email === email);
      }
      return false;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  };

  const handleSignupNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (signupData.password !== signupData.confirmPassword) {
        setError('Passwords do not match!');
        setLoading(false);
        return;
      }

      if (signupData.password.length < 6) {
        setError('Password must be at least 6 characters!');
        setLoading(false);
        return;
      }

      // Check if username or email already exists
      const usernameExists = await checkUsernameExists(signupData.username);
      if (usernameExists) {
        setError('Username already exists!');
        setLoading(false);
        return;
      }

      const emailExists = await checkEmailExists(signupData.email);
      if (emailExists) {
        setError('Email already registered!');
        setLoading(false);
        return;
      }

      setSignupStep(2);
      setLoading(false);
    } catch (error) {
      console.error('Error in signup validation:', error);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const uid = generateUID();

      const userData = {
        fullName: signupData.fullName,
        nickname: signupData.nickname,
        email: signupData.email,
        username: signupData.username,
        password: signupData.password, // Plain text untuk testing
        sex: signupData.sex,
        dateOfBirth: signupData.dateOfBirth,
        role: 'common'
      };

      // Save to Firebase
      await set(ref(db, `users/${uid}`), userData);

      // Store user session (simplified - in production use proper auth)
      localStorage.setItem('currentUser', JSON.stringify({ uid, ...userData }));

      alert('Account created successfully!');
      setLoading(false);
      onClose();
      navigate('/home');
    } catch (error) {
      console.error('Error creating account:', error);
      setError('Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);

      if (!snapshot.exists()) {
        setError('No users found in database!');
        setLoading(false);
        return;
      }

      const users = snapshot.val();

      // Find user with matching username and password (plain text)
      let foundUser = null;
      let foundUID = null;

      for (const [uid, user] of Object.entries(users)) {
        const userData = user as any;
        if (userData.username === signinData.username && userData.password === signinData.password) {
          foundUser = userData;
          foundUID = uid;
          break;
        }
      }

      if (!foundUser) {
        setError('Invalid username or password!');
        setLoading(false);
        return;
      }

      // Store user session
      localStorage.setItem('currentUser', JSON.stringify({ uid: foundUID, ...foundUser }));

      alert(`Welcome back, ${foundUser.nickname}!`);
      setLoading(false);
      onClose();
      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please try again.');
      setLoading(false);
    }
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleSigninInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PopUp isOpen={isOpen} onClose={onClose}>
      {view === 'signin' && (
        <div className="signin-form">
          <h2 className="popup-title">Sign In</h2>
          <p className="popup-subtitle">Welcome back!</p>
          
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          
          <form className="auth-form" onSubmit={handleSigninSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                name="username"
                placeholder="Enter username" 
                value={signinData.username}
                onChange={handleSigninInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="Enter password" 
                value={signinData.password}
                onChange={handleSigninInputChange}
                required 
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <p className="toggle-text">
              Don't have an account? 
              <span onClick={() => { setView('signup'); setError(''); }}> Sign Up!</span>
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
          
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          
          {signupStep === 1 ? (
            <form className="auth-form" onSubmit={handleSignupNext}>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Enter username" 
                  autoComplete="username"
                  value={signupData.username}
                  onChange={handleSignupInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter email" 
                  autoComplete="email"
                  value={signupData.email}
                  onChange={handleSignupInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Enter password" 
                  autoComplete="new-password"
                  value={signupData.password}
                  onChange={handleSignupInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm password" 
                  autoComplete="new-password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupInputChange}
                  required 
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Checking...' : 'Next'}
              </button>

              <p className="toggle-text">
                Already have an account? 
                <span onClick={() => { setView('signin'); setError(''); setSignupStep(1); }}> Sign In!</span>
              </p>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder="Enter full name" 
                  autoComplete="name"
                  value={signupData.fullName}
                  onChange={handleSignupInputChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Nickname</label>
                <input 
                  type="text" 
                  name="nickname" 
                  placeholder="Enter nickname" 
                  autoComplete="off"
                  value={signupData.nickname}
                  onChange={handleSignupInputChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Sex</label>
                <select 
                  name="sex" 
                  autoComplete="sex"
                  value={signupData.sex}
                  onChange={handleSignupInputChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Date of Birth</label>
                <input 
                  type="date" 
                  name="dateOfBirth" 
                  autoComplete="bday"
                  value={signupData.dateOfBirth}
                  onChange={handleSignupInputChange}
                  required 
                />
              </div>
              
              <div className="form-navigation">
                <button 
                  type="button" 
                  className="back-btn" 
                  onClick={() => { setSignupStep(1); setError(''); }}
                >
                  Back
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </PopUp>
  );
}