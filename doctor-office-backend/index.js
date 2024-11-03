const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  date: Date,
});


const Appointment = mongoose.model('Appointment', AppointmentSchema);



app.get('/api/appointments', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});


app.post('/api/appointments', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.json(appointment);
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});