// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

// Mock axios to avoid real API calls during tests
jest.mock('axios');

describe('Login Component', () => {
  test('renders the login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if email and password input fields are present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Check if the submit button is present
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows error message on login failure', async () => {
    // Mock a rejected login response
    axios.post.mockRejectedValueOnce(new Error('Login failed'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for error message to appear
    const errorMessage = await screen.findByText(/An error occurred. Please try again../i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('navigates to food list on successful login', async () => {
    // Mock a successful login response
    axios.post.mockResolvedValueOnce({ data: { message: 'login successfully' } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Expect the navigate function to be called with the correct route
    expect(window.location.pathname).toBe('/foodlist');
  });
});
