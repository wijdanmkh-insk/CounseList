import React, { useState } from 'react';
import PopUp from '../layout/PopUp';

// Mock data for session requests
const mockRequests = [
  {
    id: 1,
    user: 'John Doe',
    requestedTime: '2026-01-25 14:00',
    status: 'pending',
  },
  {
    id: 2,
    user: 'Jane Smith',
    requestedTime: '2026-01-26 10:00',
    status: 'pending',
  },
];

const ManagementDashboard: React.FC = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [newTime, setNewTime] = useState('');

  const handleUnavailable = (request: any) => {
    setSelectedRequest(request);
    setShowPopUp(true);
  };

  const handleOfferNewTime = () => {
    // Here you would update the backend or state with the new time offer
    setShowPopUp(false);
    setNewTime('');
    alert(`New time offered to ${selectedRequest.user}: ${newTime}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Management Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Requested Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.user}</td>
              <td>{req.requestedTime}</td>
              <td>{req.status}</td>
              <td>
                <button onClick={() => handleUnavailable(req)}>
                  Mark Unavailable & Offer New Time
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PopUp isOpen={showPopUp} onClose={() => setShowPopUp(false)}>
          <h3>Counselor Not Available</h3>
          <p>
            The counselor is not available at the requested time for {selectedRequest.user}.
          </p>
          <label>
            Offer New Time:
            <input
              type="datetime-local"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleOfferNewTime}>Send Offer</button>
        </PopUp>
    </div>
  );
};

export default ManagementDashboard;
