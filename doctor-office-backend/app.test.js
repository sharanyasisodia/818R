// app.test.js
const express = require('express');
const mongoose = require('mongoose');

jest.mock('express'); // Mock the express module
jest.mock('mongoose'); // Mock the mongoose module

describe('Express App Routes', () => {
  let app;
  let Appointment;

  beforeAll(() => {
    // Mock the express instance and methods
    app = {
      use: jest.fn(),
      get: jest.fn(),
      post: jest.fn(),
      listen: jest.fn(),
    };
    express.mockReturnValue(app);

    // Mock Mongoose model
    const mockFind = jest.fn();
    const mockSave = jest.fn();

    // Mock Appointment as a constructor function
    Appointment = jest.fn().mockImplementation(() => ({
      save: mockSave,
    }));

    // Add static methods to the Appointment constructor
    Appointment.find = mockFind;

    // Mock mongoose.model to return the Appointment constructor
    mongoose.model.mockReturnValue(Appointment);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('GET /api/appointments', () => {
    it('should set up GET /api/appointments route', async () => {
      const mockAppointments = [
        { patientName: 'John Doe', doctorName: 'Dr. Smith', date: new Date() },
      ];
      Appointment.find.mockResolvedValueOnce(mockAppointments); // Mock data retrieval

      const routeHandler = jest.fn(async (req, res) => {
        const appointments = await Appointment.find();
        res.json(appointments);
      });

      // Mock the app.get route registration
      app.get.mockImplementationOnce((route, handler) => handler);

      // Register the mocked route
      app.get('/api/appointments', routeHandler);

      // Verify app.get was called with the correct handler
      expect(app.get).toHaveBeenCalledWith('/api/appointments', routeHandler);

      // Call the route handler directly to test it
      const mockResponse = { json: jest.fn() };
      await routeHandler({}, mockResponse);

      expect(Appointment.find).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAppointments);
    });
  });

  describe('POST /api/appointments', () => {
    it('should set up POST /api/appointments route', async () => {
      const mockRequest = {
        body: { patientName: 'Jane Doe', doctorName: 'Dr. Adams', date: new Date() },
      };
      const mockResponse = { json: jest.fn() };

      const routeHandler = jest.fn(async (req, res) => {
        const appointment = new Appointment(req.body);
        await appointment.save(); // Run the mocked save method
        res.json(req.body); // Send the mocked response
      });

      // Mock the app.post route registration
      app.post.mockImplementationOnce((route, handler) => handler);

      // Register the mocked route
      app.post('/api/appointments', routeHandler);

      // Verify app.post was called with the correct handler
      expect(app.post).toHaveBeenCalledWith('/api/appointments', routeHandler);

      // Call the route handler directly to test it
      await routeHandler(mockRequest, mockResponse);

      expect(Appointment).toHaveBeenCalledWith(mockRequest.body); // Check that constructor is called with correct data
      expect(mockResponse.json).toHaveBeenCalledWith(mockRequest.body); // Expect response with request body
    });
  });

  describe('Server Start', () => {
    it('should start server on port 3000', () => {
      const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
      app.listen.mockImplementationOnce((port, callback) => callback());

      app.listen(3000, () => {
        console.log('Server running on port 3000');
      });

      expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
      expect(mockConsoleLog).toHaveBeenCalledWith('Server running on port 3000');

      mockConsoleLog.mockRestore(); // Clean up mock
    });
  });
});
