import userDb from "../models/user.js";
import bcrypt from "bcrypt";
import { createjwtToken } from "../config/jwtToken.js";

export const registerUser = async (req, res) => {
    const { firstname, lastname, email, phone, role, password, confirmpassword } = req.body;
    try {
        const existUser = await userDb.findOne({ email: email });
        let token;
        console.log(`object`);
        if (!existUser && password === confirmpassword) {
            const hashedpassword = await bcrypt.hash(password, 10);
            const newUser = new userDb({
                firstname,
                lastname,
                email,
                phone,
                role,
                password: hashedpassword,
            });
            const user = await newUser.save()
            if(user)  {
                token = createjwtToken(user._id);
                user.password = undefined
                res.status(200).json({ user: newUser, token: token });
            }
        }else{
            return res.status(409).json({ error: 'User already exists with this email.' });
        }

    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let token;
        const userIs = await userDb.findOne({ email: email });
        if (userIs) {
            const passwordIs = await bcrypt.compare(password, userIs.password);
            if (passwordIs) {
                token = createjwtToken(userIs._id);
                userIs.password = undefined
                res.status(200).json({ user: userIs, token: token });
            }else{
                return res.status(401).json({ error: 'Invalid password.' });
            }
        }else{
            return res.status(404).json({ error: 'User not found with this email.' });
        }
    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};
