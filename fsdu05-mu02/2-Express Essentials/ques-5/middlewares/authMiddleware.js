const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.headers['x-role'];
    if (userRole && allowedRoles.includes(userRole.toLowerCase())) {
      next();
    } else {
      return res.status(403).json({
        message: 'Forbidden: You do not have the necessary role to access this resource.',
        requiredRoles: allowedRoles,
        yourRole: userRole || 'none provided'
      });
    }
  };
};

module.exports = authMiddleware;
