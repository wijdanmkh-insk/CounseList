import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPlus, faCommentDots, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('schedules');

  useEffect(() => {
    // Update active tab based on current route
    if (location.pathname === '/home') {
      setActiveTab('schedules');
    } else if (location.pathname === '/assign') {
      setActiveTab('assign');
    }
  }, [location]);

  const NAV_ITEMS = [
    { id: 'schedules', icon: faCalendarDays, label: 'Schedules', path: '/home' },
    { id: 'assign', icon: faPlus, label: 'Assign Session', path: '/assign' },
    { id: 'feedback', icon: faCommentDots, label: 'Feedback', path: '/feedback' },
    { id: 'logout', icon: faRightFromBracket, label: 'Logout', path: '/' }
  ];

  const handleNavigation = (item: typeof NAV_ITEMS[0]) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <nav className="bottom-navbar">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-btn ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => handleNavigation(item)}
          title={item.label}
        >
          <FontAwesomeIcon icon={item.icon} size="xs" />
        </button>
      ))}
    </nav>
  );
}
