const authService = require('../services/AuthService');

// Mock user storage for offline mode
const mockUsers = {};
const mockTokens = {};

class AuthController {
  async register(req, res) {
    try {
      const { email, firstName, lastName, phone } = req.body;
      
      // Validate input
      if (!email || !firstName || !lastName || !phone) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }
      
      // Try real registration
      try {
        const result = await authService.registerUser(req.body);
        return res.status(201).json({
          success: true,
          message: 'User registered successfully',
          data: result
        });
      } catch (dbError) {
        // Fall back to mock registration (offline mode)
        if (mockUsers[email]) {
          return res.status(400).json({
            success: false,
            message: 'User already exists'
          });
        }
        
        const userId = 'user_' + Date.now();
        const token = 'mock_token_' + userId;
        
        mockUsers[email] = {
          id: userId,
          firstName,
          lastName,
          email,
          phone
        };
        
        mockTokens[token] = email;
        
        res.status(201).json({
          success: true,
          message: 'User registered successfully (offline mode)',
          data: {
            token,
            user: {
              id: userId,
              firstName,
              lastName,
              email
            }
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }
      
      // Try real login
      try {
        const result = await authService.loginUser(email, password);
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          data: result
        });
      } catch (dbError) {
        // Fall back to mock login (offline mode)
        if (mockUsers[email]) {
          const userId = mockUsers[email].id;
          const token = 'mock_token_' + userId;
          mockTokens[token] = email;
          
          return res.status(200).json({
            success: true,
            message: 'Login successful (offline mode)',
            data: {
              token,
              user: mockUsers[email]
            }
          });
        }
        
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AuthController();
