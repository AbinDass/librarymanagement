import userDb from "../models/user.js";
export const getAllUsers = async (req, res) => {
    try {
        const users = await userDb.find({ role: "user" });
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userid = req.query.userid;
        const data = await userDb.findById({ _id: userid })
        console.log(userid, data)   
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};

export const updateUser = async(req, res) =>{
    try {
        const userid = req.query.userid;
        console.log(req.body,111111,userid)
        const userexist = await userDb.findOne({ _id: userid });
        const {firstname,
            lastname,
            email,
            phone,} = req.body
    
        if (userexist) {
            const updateduser = await userDb.findByIdAndUpdate(
                userid,
                {
                    $set: {
                        firstname,
                        lastname,
                        email,
                        phone,
                    },
                },
                { new: true }
            );
            res.status(200).json({ user: updateduser });
    }
} catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
}




