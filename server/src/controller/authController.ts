import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { EStatusCodes } from '../types/EStatusCodes';
import User from '../models/userModel';
import generateTokenAndSetCookie from '../token/generateTokenAndSetCookie';
import { text } from 'stream/consumers';
import { profile } from 'console';

type TypedRequestBody<T> = Request<{}, {}, T>;

type RegisterRequestBody = {
  email: string;
  username: string;
  password: string;
  rePassword: string;
  profileAvatar: string;
};

type LoginRequestBody = {
  usernameOrEmail: string;
  password: string;
};

//Register controller

export const register = async (req: TypedRequestBody<RegisterRequestBody>, res: Response) => {
  try {
    const { email, username, password, rePassword } = req.body;
    if (password !== rePassword) {
      return res
        .status(EStatusCodes.BAD_REQUEST)
        .json({ error: { text: "Passwords don't match", type: 'password' } });
    }

    const currentUser = await User.findOne({ username });

    if (currentUser) {
      return res
        .status(EStatusCodes.BAD_REQUEST)
        .json({ error: { text: 'Username already exists', type: 'username' } });
    }
    const currentEmail = await User.findOne({ email });

    if (currentEmail) {
      return res
        .status(EStatusCodes.BAD_REQUEST)
        .json({ error: { text: 'Email already exists', type: 'email' } });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarColor = 'random';
    const avatarSize = 128;

    const profileAvatar = `https://ui-avatars.com/api/?name=${username}&background=${avatarColor}&size=${avatarSize}`;

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      profileAvatar,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(EStatusCodes.CREATED).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profileAvatar: newUser.profileAvatar,
      });
    } else {
      res.status(EStatusCodes.BAD_REQUEST).json({ error: 'Invalid user data' });
    }
  } catch (e) {
    const err = e as Error;

    console.log('Error in register controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

//Login controller

export const login = async (req: TypedRequestBody<LoginRequestBody>, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);

    let currentUser;

    if (isEmail) {
      currentUser = await User.findOne({ email: usernameOrEmail });

      if (!currentUser) {
        return res
          .status(EStatusCodes.BAD_REQUEST)
          .json({ error: { text: 'Invalid email', type: 'usernameOrEmail' } });
      }
    } else {
      currentUser = await User.findOne({ username: usernameOrEmail });

      if (!currentUser) {
        return res
          .status(EStatusCodes.BAD_REQUEST)
          .json({ error: { text: 'Invalid username', type: 'usernameOrEmail' } });
      }
    }

    const isCorrectPassword = await bcrypt.compare(password, currentUser.password || '');

    if (!isCorrectPassword) {
      return res
        .status(EStatusCodes.BAD_REQUEST)
        .json({ error: { text: 'Invalid password', type: 'password' } });
    }

    generateTokenAndSetCookie(currentUser._id, res);

    res
      .status(EStatusCodes.OK)
      .json({
        data: {
          id: currentUser._id,
          username: currentUser.username,
          profileAvatar: currentUser.profileAvatar,
        },
        message: `User with ID ${currentUser._id} logged in successfully`,
      });
  } catch (e) {
    const err = e as Error;

    console.log('Error in login controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

//Logout controller

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(EStatusCodes.OK).json({ message: 'Logged out successfully' });
  } catch (e) {
    const err = e as Error;

    console.log('Error in logout controller', err.message);
    res.status(EStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
