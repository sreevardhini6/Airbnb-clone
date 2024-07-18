import zod from 'zod'
import { User } from '../models/userModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userBody = zod.object({
    name:zod.string().trim().optional(),
    email:zod.string().email({ message: "Invalid email address" }).min(5,{ message: "Must be 5 or more characters long" }).trim(),
    password:zod.string().trim()
})


export const registerUser = async (req: any ,res: any) => {
   const result = userBody.safeParse(req.body);
   if(!result.success) {
    return res.status(411).json({
        message:"Invalid Inputs"
    })
   }
   const { name, email, password } = result.data;
   try {
    const existingUser = await User.findOne({email})
        if(existingUser) return res.status(409).json({msg:"Email Already Taken"})
            const hashedPassword = await bcrypt.hash(password,10)
        
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        });

        const userId = newUser._id
        const token = jwt.sign({userId}, process.env.JWT_SECRET as string, { expiresIn: '1h' })
        res.status(201).json({
            newUser,
            msg:"User created successfully",
            // token:`Bearer ${token}`
        })   
        } catch (err) {
           res.status(500).json({
            message:"Server error",
            error:err
           })
   }
}

export const loginUser = async (req: any, res: any) => {
    const result = userBody.safeParse(req.body);
  
    if (!result.success) {
      return res.status(411).json({
        msg: "Invalid inputs"
      });
    }
  
    const { email, password } = result.data;
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Invalid password" });
      }
  
      const userId = existingUser._id;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      res.status(200).json({
        msg: "Login successful",
        token: `Bearer ${token}`
      });
    } catch (err:any) {
      res.status(500).json({
        message: "Server error",
        error: err.message
      });
    }
  };

  
export const logoutUser = async (req: any, res: any) => {
    try {
        res.removeHeader("Authorization");
        res.json({ msg: "Logout Successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
};