import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthProvider, useAuth } from '../AuthContext.jsx';
import mockFakeAuthService from '@/services/fakeAuthService'; // Correctly import the default mock

// Mock the service
vi.mock('@/services/fakeAuthService');

// Helper component to consume the context
const AuthConsumer = () => {
  const auth = useAuth();
  if (auth.isLoading) {
    // This text is rendered by AuthConsumer if auth.isLoading is true.
    // The AuthProvider itself renders "Cargando..." when its internal isLoading is true.
    // The tests for initial state check the AuthProvider's direct rendering.
    return <div>Loading by AuthConsumer...</div>; 
  }
  return (
    <div>
      <div data-testid="isAuthenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="user">{JSON.stringify(auth.user)}</div>
      <div data-testid="role">{auth.user ? auth.user.role : 'null'}</div>
      <button onClick={() => auth.login({ email: 'test@example.com', password: 'password' })}>Login</button>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear mock history and localStorage before each test
    mockFakeAuthService.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    // Ensure mocks and localStorage are cleared after each test as well
    mockFakeAuthService.mockClear();
    localStorage.clear();
  });

  it('1. Initial State: isAuthenticated is false, user is null, isLoading becomes false', async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    // Wait for loading to complete.
    // AuthProvider's "Cargando..." is too transient to reliably catch.
    // Instead, wait for AuthConsumer to render its non-loading state,
    // which means user should be null initially.
    await waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('null');
      // Also ensure that the provider's own loading message is gone.
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      // And that AuthConsumer's temp loading message is also gone.
      expect(screen.queryByText('Loading by AuthConsumer...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    expect(screen.getByTestId('user').textContent).toBe('null');
  });

  it('2. Login Success: updates context and localStorage', async () => {
    const mockUser = { id: 1, name: 'Test User', role: 'user' };
    const mockToken = 'fake-token';
    mockFakeAuthService.mockResolvedValue({ user: mockUser, token: mockToken });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    
    // Wait for initial loading to complete (AuthProvider's "Cargando..." and AuthConsumer's "Loading by AuthConsumer...")
    await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
        expect(screen.queryByText('Loading by AuthConsumer...')).not.toBeInTheDocument();
    });

    // Find the login button and click it
    const loginButton = screen.getByText('Login');
    act(() => {
      loginButton.click();
    });

    await waitFor(() => {
      expect(mockFakeAuthService).toHaveBeenCalledWith({email: 'test@example.com', password: 'password'});
    });

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
      expect(screen.getByTestId('user').textContent).toBe(JSON.stringify(mockUser));
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    });
  });

  it('3. Login Failure: context and localStorage remain unchanged', async () => {
    const loginError = new Error('Login failed');
    mockFakeAuthService.mockRejectedValue(loginError);

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    // Wait for initial loading to complete (AuthProvider's "Cargando..." and AuthConsumer's "Loading by AuthConsumer...")
    await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
        expect(screen.queryByText('Loading by AuthConsumer...')).not.toBeInTheDocument();
    });
    
    const loginButton = screen.getByText('Login');
    // Suppress console.error for this test as we expect a failure
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Click the login button, which should trigger a rejected promise
    // The AuthContext handles this error internally and logs it.
    // We assert the outcome (user not logged in).
    await act(async () => {
        loginButton.click();
    });
    
    consoleErrorSpy.mockRestore();

    // Check that the login attempt was made
    await waitFor(() => {
      expect(mockFakeAuthService).toHaveBeenCalledWith({email: 'test@example.com', password: 'password'});
    });
    
    // Assert that the state reflects a failed login
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
    expect(screen.getByTestId('user').textContent).toBe('null');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('4. Logout: clears context and localStorage', async () => {
    // First, simulate a successful login
    const mockUser = { id: 1, name: 'Test User', role: 'user' };
    const mockToken = 'fake-token';
    mockFakeAuthService.mockResolvedValue({ user: mockUser, token: mockToken });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );
    
    // Wait for initial loading to complete (AuthProvider's "Cargando..." and AuthConsumer's "Loading by AuthConsumer...")
    await waitFor(() => {
        expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
        expect(screen.queryByText('Loading by AuthConsumer...')).not.toBeInTheDocument();
    });

    const loginButton = screen.getByText('Login');
    act(() => {
      loginButton.click();
    });

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    });

    // Now, click logout
    const logoutButton = screen.getByText('Logout');
    act(() => {
      logoutButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
      expect(screen.getByTestId('user').textContent).toBe('null');
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  it('5. Initialization from localStorage: loads user and token', async () => {
    const storedUser = { id: 2, name: 'Stored User', role: 'admin' };
    const storedToken = 'existing-token';
    localStorage.setItem('token', storedToken);
    localStorage.setItem('user', JSON.stringify(storedUser));

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      // Wait for isLoading to be false (AuthProvider's "Cargando..." and AuthConsumer's "Loading by AuthConsumer...")
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading by AuthConsumer...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
    expect(screen.getByTestId('user').textContent).toBe(JSON.stringify(storedUser));
  });
});
