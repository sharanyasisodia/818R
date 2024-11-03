import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '' });

  useEffect(() => {
    fetch(window.location.origin + '/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(window.location.origin + '/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(res => res.json())
      .then(newAppointment => setAppointments([...appointments, newAppointment]));
  };

  return (
    <div className="App">
      <div className="logo-header">
        <svg
          className="app-logo-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 100"
          width="100%"
          height="100%"
        >
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
            Doctor's Office Appointments
          </text>
        </svg>
      </div>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={(e) => setForm({ ...form, patientName: e.target.value })}
        />
        <input
          className="form-input"
          placeholder="Doctor Name"
          value={form.doctorName}
          onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
        />
        <input
          className="form-input"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <button className="submit-button" type="submit">Book Appointment</button>
      </form>

      <ul className="appointments-list">
        {appointments.map((appt) => (
          <li className="appointment-item" key={appt._id}>
            <strong>{appt.patientName}</strong> with Dr. <strong>{appt.doctorName}</strong> on <strong>{new Date(appt.date).toLocaleDateString()}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
