// (solo si decides manejar bcrypt/jwt en frontend mock)
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', {
    expiresIn: '1d'
  })
}

export const verifyToken = (token) => {
  return jwt.verify(token, 'your_jwt_secret')
}
