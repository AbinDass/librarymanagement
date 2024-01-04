import jwt from 'jsonwebtoken'

export const createjwtToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:'2h',
    })
}