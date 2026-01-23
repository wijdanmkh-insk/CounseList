import { useEffect } from 'react';
import BottomNavbar from '../layout/BottomNavbar';

interface Schedule {
  id: string;
  date: string;
  time: string;
  counselor: string;
  topic: string;
  status: 'upcoming' | 'cancelled' | 'ended';
}

export default function HomePage() {
  useEffect(() => {
    document.body.classList.remove('menu-open');
  }, []);

  const schedules: Schedule[] = [
    {
      id: '1',
      date: '2026-01-25',
      time: '14:00',
      counselor: 'Dr. Sarah Johnson',
      topic: 'Academic Stress Management',
      status: 'upcoming'
    },
    {
      id: '2',
      date: '2026-01-23',
      time: '10:30',
      counselor: 'Prof. Michael Chen',
      topic: 'Career Planning',
      status: 'cancelled'
    },
    {
      id: '3',
      date: '2026-01-22',
      time: '16:00',
      counselor: 'Dr. Emily Roberts',
      topic: 'Personal Development',
      status: 'ended'
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

  return (
    <div className="homepage">
      <div className="homepage-header">
        <h1 className="homepage-title">My Schedules</h1>
        <p className="homepage-subtitle">Your upcoming counseling sessions</p>
      </div>

      <div className="schedules-container">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`schedule-card schedule-${schedule.status}`}
            >
              <div className="schedule-header">
                <div className="schedule-date">
                  <span className="date-label">Date</span>
                  <span className="date-value">{formatDate(schedule.date)}</span>
                </div>
                <div className="schedule-time">
                  <span className="time-label">Time</span>
                  <span className="time-value">{schedule.time}</span>
                </div>
              </div>
              
              <div className="schedule-body">
                <div className="schedule-info">
                  <span className="info-label">Counselor</span>
                  <span className="info-value">{schedule.counselor}</span>
                </div>
                
                <div className="schedule-info">
                  <span className="info-label">Topic</span>
                  <span className="info-value">{schedule.topic}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-schedules">
            <p>No schedules yet. Book your first counseling session!</p>
          </div>
        )}
      </div>
        <BottomNavbar />
    </div>
  );
}
