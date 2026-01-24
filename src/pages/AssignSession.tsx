import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../layout/BottomNavbar';

interface Counselor {
  id: string;
  name: string;
  specialization: string[];
  location: ('online' | 'offline')[];
  busySchedules: {
    date: string;
    timeSlots: string[];
  }[];
}

// Dummy counselor data
const COUNSELORS: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: ['Academic Stress', 'Anxiety', 'Time Management'],
    location: ['online', 'offline'],
    busySchedules: [
      {
        date: '2026-01-25',
        timeSlots: ['09:00', '10:00', '14:00']
      },
      {
        date: '2026-01-26',
        timeSlots: ['11:00', '15:00']
      }
    ]
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    specialization: ['Career Planning', 'Personal Development'],
    location: ['online'],
    busySchedules: [
      {
        date: '2026-01-25',
        timeSlots: ['10:00', '13:00']
      }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Roberts',
    specialization: ['Depression', 'Relationship Issues', 'Self-Esteem'],
    location: ['offline'],
    busySchedules: [
      {
        date: '2026-01-25',
        timeSlots: ['09:00', '11:00', '16:00']
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: ['Academic Stress', 'Career Planning', 'Study Skills'],
    location: ['online', 'offline'],
    busySchedules: [
      {
        date: '2026-01-26',
        timeSlots: ['09:00', '10:00', '14:00', '15:00']
      }
    ]
  }
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export default function AssignSession() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    topic: '',
    location: '' as 'online' | 'offline' | ''
  });
  const [availableCounselors, setAvailableCounselors] = useState<Counselor[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    document.body.classList.remove('menu-open');
  }, []);

  const findAvailableCounselors = () => {
    if (!formData.date || !formData.time || !formData.location) {
      return;
    }

    // Guard: skip filtering if location is not selected
    if (formData.location === '') {
      setAvailableCounselors([]);
      setShowResults(true);
      return;
    }

    const available = COUNSELORS.filter(counselor => {
      // Check if counselor supports the selected location
      if (!counselor.location.includes(formData.location as 'online' | 'offline')) {
        return false;
      }

      // Check if counselor is busy at the selected date and time
      const busySchedule = counselor.busySchedules.find(
        schedule => schedule.date === formData.date
      );

      if (busySchedule && busySchedule.timeSlots.includes(formData.time)) {
        return false;
      }

      return true;
    });

    setAvailableCounselors(available);
    setShowResults(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    findAvailableCounselors();
  };

  const handleBooking = (counselorId: string) => {
    // Handle booking logic here
    alert(`Booking confirmed with counselor ID: ${counselorId}`);
    navigate('/home');
  };

  return (
    <div className="assign-session">
      <div className="assign-header">
        <h1 className="assign-title">Counseling Session</h1>
        <p className="assign-subtitle">Fill in the details to find available counselors</p>
      </div>

      <div className="assign-container">
        <form className="assign-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            >
              <option value="">Select time...</option>
              {TIME_SLOTS.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Topic</label>
            <textarea
              placeholder="Describe your counseling topic..."
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
              className="border-2 p-2 rounded-md border-primary/20 focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div className="form-group">
            <label>Counseling Location</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="location"
                  value="online"
                  checked={formData.location === 'online'}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value as 'online' })}
                  required
                />
                <span>Online</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="location"
                  value="offline"
                  checked={formData.location === 'offline'}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value as 'offline' })}
                  required
                />
                <span>Offline</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">Find Available Counselors</button>
        </form>

        {showResults && (
          <div className="counselors-results">
            <h2 className="results-title">
              {availableCounselors.length > 0 
                ? `Found ${availableCounselors.length} Available Counselor${availableCounselors.length > 1 ? 's' : ''}`
                : 'No Available Counselors'}
            </h2>
            
            {availableCounselors.length > 0 ? (
              <div className="counselors-list">
                {availableCounselors.map(counselor => (
                  <div key={counselor.id} className="counselor-card">
                    <h3 className="counselor-name">{counselor.name}</h3>
                    <div className="counselor-specs">
                      <span className="spec-label">Specializations:</span>
                      <div className="spec-tags">
                        {counselor.specialization.map((spec, idx) => (
                          <span key={idx} className="spec-tag">{spec}</span>
                        ))}
                      </div>
                    </div>
                    <div className="counselor-location">
                      <span className="spec-label">Available:</span>
                      <span className="location-badge">{counselor.location.join(', ')}</span>
                    </div>
                    <button 
                      className="book-btn" 
                      onClick={() => handleBooking(counselor.id)}
                    >
                      Book Session
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">
                No counselors available at the selected date and time. Please try a different time slot.
              </p>
            )}
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}
