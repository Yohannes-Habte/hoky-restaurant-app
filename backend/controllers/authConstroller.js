import otpGenerator from 'otp-generator';
import User from '../models/userModel.js';
import crypto from 'crypto';
import sendEmail from '../utils/email.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware.js/generateToken.js';

//===========================================================
// Register a new user in the database
//===========================================================

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password, image } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // If user does not exist in the database
    if (!user) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image: image,
      });

      // Save the new user in the database
      const savedUser = await newUser.save();

      // User token
      const token = generateToken(savedUser._id);

      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json({
          _id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
          token: token,
        });
    } else {
      // If user already exist exist in the database
      return next(
        createError(500, 'Eail has already been taken. Please try another one!')
      );
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not sign up. Please try again!'));
  }
};

//===========================================================
// Login a register user in the database
//===========================================================
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // If user does not exist in the database
    if (!user) {
      return next(
        createError(400, 'This email does not exist. Please sign up!')
      );
    }

    // If user exist, then check user password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, 'Invalid password. Please sign up!'));
    }

    // If user exist and password is valid, user will login
    if (user && isPasswordValid) {
      const { password, isAdmin, role, ...otherDetails } = user._doc;

      // Token of the user
      const token = generateToken(user._id);

      // Now, the cookies and the usere data willl be sent to the frontend
      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, token: token, role, isAdmin });
    } else {
      return next(
        createError(400, 'Invalid email or password! Please check it!')
      );
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not log in. Please try again!'));
  }
};

//=====================================================================
// Log out a user
//=====================================================================
export const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.cookie('access_token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).json({
      message: `You have successfully logged out.`,
    });
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not logout. Please try again!'));
  }
};

//=====================================================================
// Get user login status
//=====================================================================
export const userLoginStatus = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.json(false);
    }

    // Verify the token
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifiedToken) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.log(error);
  }
};

//=====================================================================
// & First Method of forgot and reset passsword
//=====================================================================

//=====================================================================
// Generate otp generator
//=====================================================================
export const generateOTP = async (req, res, next) => {
  try {
    /**
    let OTP = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    res.status(200).send(OTP);

   */
    req.app.locals.OTP = await otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    res.status(200).send(req.app.locals.OTP);
  } catch (error) {
    next(error);
  }
};

// Verify Generate otp generator
export const verifyGeneratedOTP = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for rreset password

      res.status(201).send({ message: 'Verified Successfully' });
    } else {
      res.status(400).send({ error: 'Invalid OTP' });
    }
  } catch (error) {
    next(error);
  }
};

//=====================================================================
// Reset Generate otp generator
//=====================================================================
export const resetGeneratedOTP = async (req, res, next) => {
  try {
    if (req.app.locals.resetSession) {
      req.app.locals.resetSession = false; // allow access to this route only once

      res.status(201).send({ message: 'Access granted!' });
    } else {
      res.status(440).send({ error: 'Session expired' });
    }
  } catch (error) {
    next(error);
  }
};

// Reset password

export const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;
  if (!req.app.locals.resetSession)
    return res.status(440).send({ error: 'Session expired' });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ error: 'This email does not exist!' });
    }

    req.app.locals.resetSession = false;
    res.status(201).send({ message: 'Password recovered!' });
  } catch (error) {
    res.status(401).send({ error });
  }
};

//=====================================================================
// & First Method of forgot and reset passsword
//=====================================================================

//=====================================================================
// Forget Password function
//=====================================================================
export const forgotPassword = async (req, res, next) => {
  /**
     We need to do three things
       1. Identity or get a user using email exist or post in the database
       2. Generate a random reset token
       3. send the token back to the user email
   */

  try {
    // 1. Identity or get a user using email exist or post in the database
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).send('We could not find the user with this email');
    }

    // 2. Generate a random reset token
    const resetToken = user.createResetpasswordToken();

    // Save the user in the database
    await user.save({ validateBeforeSave: false });

    // 3. send the token back to the user email for password reset.
    // When you send email, you need to consider:
    // 3.1 Construct Reset URL
    const resetUrl1 = `${process.env.SERVER_URL}/resetPassword/${resetToken}`;

    // "req.get("resetPassword") shows the host in the backend
    const resetUrl2 = `${req.protocol}://${req.get(
      'host'
    )}/resetPassword/${resetToken}`;

    // 3.2 Email Contents
    const message = `
        <h2> Hello ${user.firstName} </h2>
        <p> Please use the link below to reset your password </p>
        <p> This reset link is valid only for 10 minutes. </p>
        <a href=${resetUrl1} clicktracking=off> ${resetUrl1} </a>
        <p> Best regards, </p>
        <p> Hoky Restaurant Team </p>
        `;

    const subject = 'Password Reset Request';
    const send_to = user.email;
    // const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, send_to);

      res.status(200).json({
        success: true,
        message: 'Reset password link has been sent to the user email',
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      user.save({ validateBeforeSave: false });

      return next(
        createError(
          500,
          'There was an error sending password reset email. Please try again later!'
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//=====================================================================
// Forget Password function
//=====================================================================
export const resetingPassword = async (req, res, next) => {
  const token = req.params.token;
  const encryptedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  // Since the token is encrypted in the database, we need to encrypt this token
  try {
    // First find the user who wants to reset password from the database using passwordResetToken. Then, check whether the password reset token is expired or not
    const user = await User.findOne({
      passwordResetToken: encryptedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).send('Token is invalid or it is expired!');
    }

    // Rest the user password
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();

    // Save the changes in the databas
    user.save();

    const { password, isAdmin, role, ...otherDetails } = user._doc;


    // Token of the user
    const loginToken = generateToken(user._id);

      // Once the user reset the password, the user will log in automatically
    return res
      .cookie('access_token', loginToken, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, token: loginToken, role, isAdmin });
  } catch (error) {
    console.log(error);
  }
};
