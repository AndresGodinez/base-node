const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  const token = req.headers['Authorization'];
  console.log({headers:req.headers});

  if (!token) {
    console.log("no token");

    res.status(401).json({message: 'Unauthorized'});
    return;
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  if (!decodedToken) {
    console.log("invalid token");

    res.status(401).json({message: 'Invalid token'});
    return;
  }

  req.user = decodedToken;
  next();
};

module.exports = authMiddleware;
