// import { User } from "@prisma/client";
import * as jose from "jose";

// export const createToken = (user: User) =>
//   jwt.sign({ ...user }, `${process.env.TOKEN_SECRET}`);

export const getUserFromToken = async (token: string) => {
  try {
    const key = new TextEncoder().encode(process.env.TOKENSECRET);
    const { payload } = await jose.jwtVerify(token, key);
    const user = {
      id: payload.id,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      avatar: payload.avatar,
    };
    return user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};
