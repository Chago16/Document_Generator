export const auth = {
    /**
     * Logs in the user and saves their session.
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          sessionStorage.setItem('user', JSON.stringify(data.user)); // Save user data
          sessionStorage.setItem('token', data.token); // Save JWT token if provided
          return { success: true, user: data.user };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        console.error('Login failed:', error);
        return { success: false, message: 'Login error. Please try again.' };
      }
    },
  
    /**
     * Logs out the user by clearing session storage.
     */
    logout() {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
  
    /**
     * Gets the logged-in user.
     * @returns {Object|null} User object or null if not logged in.
     */
    getUser() {
      const user = sessionStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
  
    /**
     * Checks if a user is authenticated.
     * @returns {boolean} True if logged in, false otherwise.
     */
    isAuthenticated() {
      return !!sessionStorage.getItem('user');
    },
  
    /**
     * Gets the JWT token (if available).
     * @returns {string|null}
     */
    getToken() {
      return sessionStorage.getItem('token');
    }
  };
  