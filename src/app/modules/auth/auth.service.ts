import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../helpers/jwtHelper';
import { ApiError } from '../../middlewares/globalErrorHandler';
import prisma from '../../shared/prisma';
import { ILoginUser, IRefreshTokenResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  let isUserExist;
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!admin && !user) {
    throw new Error('User does not exist');
  }

  if (admin || user) {
    isUserExist = admin || user;
  }

  if (isUserExist && isUserExist.password !== password) {
    throw new Error('Password is incorrect');
  }
  const payloadData = {
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.phoneNumber,
    fullName: isUserExist!.fullName,
  };

  //   create access token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  //   create refresh token

  const refreshToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  console.log(verifiedToken, 'verifiedToken');
  const { email, role, phoneNumber, fullName } = verifiedToken;

  // user deleted  but refresh token persisting
  // checking deleted user's refresh token
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!admin && !user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token

  const payloadData = {
    email: email,
    role: role,
    phoneNumber: phoneNumber,
    fullName: fullName,
  };
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = { loginUser, refreshToken };
