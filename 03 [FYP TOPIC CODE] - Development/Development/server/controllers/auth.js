import * as config from "../config.js"
import jwt from 'jsonwebtoken';
import {hashPassword, comparePassword} from '../helpers/auth.js';
import User from '../models/user.js';
import { nanoid } from "nanoid";
import validator from 'email-validator';
import {emailTemplate} from '../helpers/email.js';
import Ad from '../models/ad.js';
import nodemailer from 'nodemailer';


const tokenAndUserResponse = (req,res,user,role) =>{
    const token = jwt.sign({ _id: user._id,role: role}, config.JWT_SECRET,{
        expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ _id: user._id,role: role}, config.JWT_SECRET,{
        expiresIn: '7d',
    });

    user.password= undefined;
    user.resetCode = undefined;
    return res.json({
        token,
        refreshToken,
        user,
        role,
    });
};

export const welcome = (req, res)=>{
    res.json({
        data: "hello from nodejs api.",
    });
};

export const preRegister = async (req, res) => {
  try {
    const { email, password, firstname, lastname, phone } = req.body;

    // check if email is valid
    if (!validator.validate(email)) {
      return res.json({ error: "Provide a valid email address" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!phone) {
      return res.json({ error: "Phone number is required" });
    }
    // check if email is taken
    if (!password) {
      return res.json({ error: "Password is required" });
    }
    if (password && password?.length < 8) {
      return res.json({ error: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "Email is taken" });
    }

    const phoneexist = await User.findOne({ phone })
    if (phoneexist) {
      return res.json({ error: "Phone number is already registered" });
    }

    // generate jwt using email and password
    const token = jwt.sign({ email, password, firstname, lastname, phone }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    // create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
          user: `${config.EMAIL_FROM}`,
          pass: `${config.emailPassword}`
      }});

    // send email using nodemailer
    const mailOptions = {
      from:'"My Room" <my.room417@outlook.com>',
      to: email,
      subject: 'Welcome to MyRoom',
      html: `
        <html>
          <div style="background: #eee; padding: 20px; border-radius: 20px;">
            <h1>Welcome to MyRoom</h1>
            <p>Please click the link below to activate your account.</p>
            <a href="${config.CLIENT_URL}/auth/activate-account/${token}">Activate my account</a>
            <p>&copy; ${new Date().getFullYear()}</p>
          </div>
        </html>
      `,
    };

    transporter.sendMail(mailOptions , (err, info) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Something went wrong. Try again." });
      }
      else{
        console.log("verification email sent");
      }

    })

    return res.json({ sucess: "Check your email to complete the registration" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong. Try again." });
  }
};

export const register = async (req, res)=>{
    try {
        console.log(req.body);
        const {email, password,firstname,lastname,phone} = jwt.verify(req.body.token, config.JWT_SECRET);

        const userexist = await User.findOne({email});
        if(userexist){
            return res.json({error: "Email is taken"})
        }
        const phoneexist = await User.findOne({phone})

        if(phoneexist){
            return res.json({error: "Phone number is already registered"});
        }

        const hashedPassword = await hashPassword(password);
        const user = await new User({
            username: nanoid(8),
            email, 
            password: hashedPassword,
            firstname,
            lastname,
            phone,
            
        }).save();

       tokenAndUserResponse(req, res,user);

    }
    catch(err){
        console.log(err);
        return res.json({ error: "Something went wrong. Try again."})
    }
};

// Login User Controller
export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        //steps

        //find user by email
        const user = await User.findOne({email});

        if (!user){
            return res.json ({error: "Could not find the user with provided email"});
        }
        // match Password
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.json({error: 'Wrong password. Please try again'});
        }
      
        tokenAndUserResponse(req, res, user, user.role);
        console.log(user.role)
  
    }
    catch(err){
      console.log(err)
        return res.json({ error: "Something went wrong. Try again."})
    }
}


//forgot password controller
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "Could not find user with that email" });
    } else {
      const resetCode = nanoid();

      const token = jwt.sign({ resetCode }, config.JWT_SECRET, {
        expiresIn: "60m",
      });
      // save to user db
      user.resetCode = resetCode;
      user.save();

    // send email
    //   config.AWSSES.sendEmail(
    //     emailTemplate(
    //       email,
    //       `
    //     <p>Please click the link below to recover your account.</p>
    //     <a href="${config.CLIENT_URL}/auth/access-account/${token}">Recover my account</a>
    // `,
    //       config.REPLY_TO,
    //       "Recover your account"
    //     ),
    //     (err, data) => {
    //       if (err) {
    //         return res.json({ error: "Provide a valid email address" });
    //       } else {
    //         return res.json({ ok:true });
    //       }
    //     }
    //   );

          // create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
          user: `${config.EMAIL_FROM}`,
          pass: `${config.emailPassword}`
      }});

    // send email using nodemailer
    const mailOptions = {
      from:'"My Room" <my.room417@outlook.com>',
      to: email,
      subject: 'Recover your account',
      html: `
        <html>
          <div style="background: #eee; padding: 20px; border-radius: 20px;">
            <h1>Welcome to MyRoom</h1>
            <p>Please click the link below to recover your.</p>
            <a href="${config.CLIENT_URL}/auth/access-account/${token}">Recover my account</a>
            <p>&copy; ${new Date().getFullYear()}</p>
          </div>
        </html>
      `,
    };

    transporter.sendMail(mailOptions , (err, info) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Something went wrong. Try again." });
      }
      else{
        return res.json({ ok:true });
      }

    })
    }
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong. Try again." });
  }
};

// Acccess account controllers
export const accessAccount = async (req, res) => {
    try {
      // verify token and check expiry
      const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET);
  
      const user = await User.findOneAndUpdate(
        { resetCode },
        { resetCode: "" }
      );
  
      console.log("user", user, resetCode);
      // return;
  
     tokenAndUserResponse(req, res,user);
    } catch (err) {
      console.log(err);
      res.json({ error: "Expired or invalid token. Try again." });
    }
  };

// refreshToken Controller
// controllers
export const refreshToken = async (req, res) => {
    try {
      // console.log("you hit refresh token endpoint => ", req.headers);
  
      const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);
  
    const user = await User.findById(_id);
     tokenAndUserResponse(req, res,user);
    } catch (err) {
      console.log("===> ", err.name);
      return res.status(403).json({ error: "Refresh token failed" }); // 403 is important
    }
  };

  // controllers/auth
export const currentUser = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      user.password = undefined;
      user.resetCode = undefined;
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(403).json({ error: "Unauthorized" });
    }
  };

// controllers/auth
export const publicProfile = async (req, res) => {
    try {
      const user = await User.findOne({username: req.params.username});
      user.password = undefined;
      user.resetCode = undefined;
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.json({ error: "user not found" });
    }
  };

  // controllers/auth
export const updatePassword = async (req, res) => {
    try {
      const { password } = req.body;
  
      if (!password) {
        return res.json({ error: "Password is required" });
      }
  
      // check if password meets the requirement
      if (password && password?.length < 8) {
        return res.json({
          error: "Min 8 characters long password is required",
        });
      }
  
     const user = await User.findByIdAndUpdate(req.user._id, {
        password: await hashPassword(password),
      });
      res.json({ ok:"Password has been changed sucessfully" });
    } catch (err) {
      console.log(err);
      return res.status(403).json({ error: "Unauthorized" });
    }
};

  // controllers/auth
// name username company image phone about
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.codeName === "DuplicateKey") {
      return res.status(403).json({ error: "Username is taken" });
    } else {
      return res.status(403).json({ error: "Unauhorized" });
    }
  }
};

  export const users = async (req, res) => {
    try {
        const userList = await User.find({role:'User'}).select("-password -resetCode -role -enquiredProperties -wishlist ");
        res.json(userList)
        console.log(userList)
    } catch (err) {
      console.log(err);
      
    }
  }

  // export const userad = async (req, res) => {
  //   try {
  //     const ads = await Ad.find({postedBy: req.params._id}).select('_id');
  //     res.json(ads);
  //   } catch (err) {
  //     console.log(err);
      
  //   }
  // }

  export const userad = async (req, res) => {
    try {
      const ads = await Ad.find({ postedBy: req.params._id });
      res.json(ads);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
  
  export const user = async (req, res) => {
    try {
      const user = await User.findOne({username: req.params.username}).select("-password -resetCode -role -enquiredProperties -wishlist ");
      const ads = await Ad.find({postedBy: user._id});
      res.json({user,ads});
    } catch (err) {
      console.log(err);
      
    }
  }
  export const getUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await User.findById(id);
      if (user) {
        const { password, ...rest } = user._doc;
  
        res.status(200).json(rest);
      } else {
        res.status(404).json("No such User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };


  // export const banUser = async (req, res) => {
  //   console.log("banuser request made");
  //   try {
  //     const { userId } = req.params;
  
  //      const user = await User.findByIdAndUpdate(
  //       userId,
  //       {
  //         isBanned: true,
  //       }
  //     );
    
  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' });
  //     }
  
  //     return res.json({ message: 'User banned successfully' });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ error: 'Something went wrong. Try again.' });
  //   }
  // };
  export const banUser = async (req, res) => {
    console.log("banuser request made");
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.isBanned = !user.isBanned;
      await user.save();

       // Update userisBanned status to true in all ads posted by the user
       if (user.isBanned) {
        await Ad.updateMany({ postedBy: user._id }, { userisBanned: true });
      } else {
        await Ad.updateMany({ postedBy: user._id }, { userisBanned: false });
      }
  
      return res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong. Try again.' });
    }
  };

export const Report = async (req, res) => {
  console.log("Reoprt request made");
  try {
    const { userId } = req.params;

     const user = await User.findByIdAndUpdate(
      userId,
      {
        isReported: true,
      }
    );
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User banned successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
};

export const examine = async (req, res) => {
  console.log("Reoprt request made");
  try {
    const { userId } = req.params;

     const user = await User.findByIdAndUpdate(
      userId,
      {
        isReported: false,
      }
    );
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ message: 'User banned successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }
};
