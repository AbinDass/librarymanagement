import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"]
    console.log(token,111)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'your-secret-key' with your actual secret key

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
 

