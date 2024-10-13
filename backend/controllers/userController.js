import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
export const register = async(req,res)=>{
    try {
        const {fullName, username, password, gender, confirmPassword} = req.body;
        if(!fullName || !username || !password || !gender || !confirmPassword){
            return res.status(400).json({
                message : "All fields are required",
                success : false
            });
        }
        if(password != confirmPassword){
            return res.status(400).json({
                message : "Password did't match",
                success : false
            });
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({
                message : "Username already exist",
                success : false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });
    } catch (error) {
        
    }
}