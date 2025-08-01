const authService = require('../services/loginService');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch admin details from the database
    const adminData = await authService.getAdminByEmail(email);

    if (adminData.length === 0) {
      return res.status(401).send('Invalid username or password.');
    }

    const admin = adminData[0];

    // Verify password
    const isPasswordValid = authService.verifyPassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password.');
    }

    // Respond with admin details
    res.status(200).json({ username: admin.name, success: true });
  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).send('Error processing login request.');
  }
};

module.exports = {
  loginAdmin,
};
