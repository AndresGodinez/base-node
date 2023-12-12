const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  const token = parseTokenFromHeader(req.headers['authorization']);

  if (!token) {
    console.log('No se proporcionó un token');
    return res.status(401).json({message: 'No autorizado'});
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error to verify token:', error);
    return res.status(401).json({message: 'Invalid Token'});
  }
};

function parseTokenFromHeader(headerValue) {
  if (!headerValue) return null;

  const [scheme, token] = headerValue.split(' ');

  if (scheme.toLowerCase() !== 'bearer') return null;

  return token;
}

module.exports = authMiddleware;
