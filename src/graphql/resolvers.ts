import { Prisma, PrismaClient } from "@prisma/client";
import {
  AuthenticationError,
  Context,
  UserInputError,
} from "apollo-server-core";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { withFilter } from "graphql-subscriptions";
import { IncomingMessage, OutgoingMessage } from "http";
import { ReqInput, Resolvers } from "../generated/graphql";
import prisma from "../prisma/prisma";
export interface Icontext extends Context {
  prisma: PrismaClient;
  user: { name: string; email: string };
  res: OutgoingMessage;
  req: IncomingMessage;
  createToken: (user: { name: string; email: string }) => string;
}
// export const resolvers: Resolvers<Icontext> = {
//   User: {
//     password: () => {
//       return "nice try";
//     },
//   },
//   Query: {
//     getRequests: async (_, __, { prisma }) => {
//       const requests = await prisma.requests.findMany({});
//       return requests;
//     },
//     getMessages: async (_, args, { req, res, prisma, user }) => {
//       if (args.userID === null) {
//         return [];
//       }
//       const messages = await prisma.message.findMany({
//         where: {
//           userId: { in: [user.id, args.userID] },
//           recieverId: { in: [user.id, args.userID] },
//         },
//       });
//       return messages;
//     },
//     getUsers: async (_, __, { prisma, user }) => {
//       const users = await prisma.user.findMany({
//         where: {
//           id: { not: user.id },
//         },
//       });
//       const recent = await prisma.message.findMany({
//         where: {
//           OR: [{ recieverId: user.id }, { userId: user.id }],
//         },
//         orderBy: { createdAt: "desc" },
//         include: { user: {}, reciever: {} },
//       });
//       const userWithRecentMesage = users.map((user) => {
//         const msg = recent.find((message) => {
//           return message.userId === user.id || message.recieverId === user.id;
//         });
//         return { ...user, ...{ latestMessage: msg } };
//       });

//       return userWithRecentMesage;
//     },
//     getMe: async (_, __, { prisma, user, res }) => {
//       const userr = await prisma.user.findUnique({
//         where: { id: user?.id },
//         include: {
//           messageSent: {
//             orderBy: { createdAt: "desc" },
//             include: { user: {}, reciever: {} },
//           },
//           messageRecieved: {
//             orderBy: { createdAt: "desc" },
//             include: { user: {}, reciever: {} },
//           },
//         },
//       });
//       return userr;
//     },
//     getUser: async (_, args, { prisma }) => {
//       const user = await prisma.user.findUnique({
//         where: { id: args.userID },
//       });
//       return user;
//     },
//   },
//   Mutation: {
//     createMessage: async (_, args, { req, res, user, prisma, pubSub }) => {
//       const msg = await prisma.message.create({
//         data: {
//           content: args.messageInput.content,
//           user: {
//             connect: {
//               id: user.id,
//             },
//           },
//           reciever: { connect: { id: args.messageInput.recipient } },
//         },
//         include: {
//           reciever: {
//             select: {
//               email: true,
//               firstname: true,
//             },
//           },
//         },
//       });
//       const mm = { ...msg };
//       const payload = { ...msg, user };
//       pubSub.publish("NEW_MESSAGE", { newMessage: mm });
//       return payload;
//     },
//     signin: async (_, { signinInput }, { prisma, createToken, res }) => {
//       const user = await prisma.user.findUnique({
//         where: {
//           email: signinInput.email,
//         },
//       });
//       if (user && bcrypt.compareSync(signinInput.password, user.password)) {
//         const token = createToken(user);
//         res.setHeader(
//           "Set-cookie",
//           cookie.serialize("T_ACCESS_TOKEN", token, {
//             httpOnly: true,
//             maxAge: 8 * 60 * 60,
//             sameSite: "lax",
//             path: "/",
//             secure: process.env.NODE_ENV === "production",
//           })
//         );
//         return { token, user };
//       } else {
//         throw new Error("incorrect user or password");
//       }
//     },
//     out: async (_, __, { user, res }) => {
//       if (user) {
//         res.setHeader(
//           "Set-cookie",
//           cookie.serialize("T_ACCESS_TOKEN", "deleted", {
//             path: "/",
//             secure: process.env.NODE_ENV === "production",
//             expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
//           })
//         );
//         return "ok";
//       } else {
//         throw new AuthenticationError("no user");
//       }
//     },
//     signup: async (_, { signupInput }, { prisma, createToken, res }) => {
//       // we could send the query directly to db and if it fails it fails due to  unique constrains user or whatever insted of making 2 queries in case the user is valid
//       const salt = bcrypt.genSaltSync();

//       const existing = await prisma.user.findUnique({
//         where: { email: signupInput.email },
//       });

//       if (existing) {
//         throw new Error("nope Email taken Sorry!😛");
//       }
//       const { email, firstname, lastname, password, avatar, phonenumber } =
//         signupInput;
//       const user = await prisma.user.create({
//         data: {
//           email,
//           firstname,
//           lastname,
//           password: bcrypt.hashSync(password, salt),
//           avatar,
//           phonenumber,
//           role: "MEMBER",
//         },
//       });

//       const token = createToken(user);
//       res.setHeader(
//         "Set-cookie",
//         cookie.serialize("T_ACCESS_TOKEN", token, {
//           httpOnly: true,
//           maxAge: 8 * 60 * 60,
//           sameSite: "lax",
//           path: "/",
//           secure: process.env.NODE_ENV === "production",
//         })
//       );
//       return { token, user };
//     },
//   },
//   Subscription: {
//     newMessage: {
//       subscribe: withFilter(
//         (_, args, { user, pubSub }) => {
//           return pubSub.asyncIterator(["NEW_MESSAGE"]);
//         },
//         (parent, args, { user }) => {
//           if (
//             parent.newMessage.userId === user.id ||
//             parent.newMessage.recieverId === user.id
//           ) {
//             return true;
//           }
//         }
//       ),
//     },
//   },
// };
export const resolvers: Resolvers<Icontext> = {
  Query: {
    getRequests: () => {
      return "hello from postgres";
    },
    TableIsEmpty: async (_, __, { prisma }) => {
      const tb = __.tablename;
      const isempty = (await prisma[tb].count()) == 0;
      return isempty;
    },
    GetNumberOfRecords: async (_, __, { prisma }) => {
      // const tablenames = await prisma.$queryRaw<
      //   Array<{ tablename: string }>
      // >`SELECT tablename FROM pg_tables WHERE schemaname='public' and tablename in ()`;
      const tablenames = [
        "addresses",
        "aspnetusers",
        "userprofiles",
        "requests",
        "shippingorders",
        "paymenttrasnsactions",
      ];
      const stats = [];
      const s = tablenames.map(async (tbl) => {
        try {
          const count = await prisma[tbl].count();
          return { tablename: tbl, count };
        } catch (error) {
          console.log({ error });
        }
      });
      return s;
    },
    getlatestUser: async (_, __, { prisma }) => {
      const result =
        await prisma.$queryRaw`select addeddate::timestamp,id from (select aspnetusers.addeddate ,id from public.aspnetusers order by addeddate desc) as foo limit 1`;
      return result;
    },
    getlatestModifiedUser: async (_, __, { prisma }) => {
      const result =
        await prisma.$queryRaw`select modifieddate from (select aspnetusers.modifieddate from aspnetusers order by modifieddate desc) as bar limit 1`;
      return result;
    },
    getLatestRequest: async (_, __, { prisma }) => {
      const result =
        //await prisma.$queryRaw`select left(to_char((select addeddate from (select requests.addeddate from public.requests order by addeddate desc) as foo limit 1)::timestamp(1), 'YYYY-MM-DD HH:MI:SS.MS'), 25)|| ((select addeddate from (select requests.addeddate from public.requests order by addeddate desc) as foo limit 1)::timestamp(1), 'FM AM')::VARCHAR;`;
        await prisma.$queryRaw`select addeddate::timestamp,id from (select requests.addeddate,id from public.requests order by addeddate desc) as foo limit 1`;

      return result;
    },
    getLatestModifiedRequest: async (_, __, { prisma }) => {
      const result =
        await prisma.$queryRaw`select modifieddate from (select requests.modifieddate from requests order by modifieddate desc) as bar limit 1`;
      return result;
    },
  },
  Mutation: {
    initRequests: async (_, { requests }, { prisma }) => {
      if (requests?.length) {
        await prisma.requests.createMany({
          data: [...requests],
          // Skip 'Bobo'
        });
        return "✅ done adding Requests";
      } else {
        return "recieved no request input";
      }
    },
    initUsers: async (_, { users }, { prisma }) => {
      if (users?.length) {
        await prisma.aspnetusers.createMany({
          data: [...users],
        });
        return "✔️ done adding Users";
      }
      return "Empty user list provided or null";
    },
    initAddresses: async (_, { addresses }, { prisma }) => {
      if (addresses?.length) {
        await prisma.addresses.createMany({
          data: [...addresses],
        });
      }
      return "🏠 done adding Addresses";
    },
    initUserProfiles: async (_, { userProfiles }, { prisma }) => {
      if (userProfiles?.length) {
        await prisma.userprofiles.createMany({
          data: [...userProfiles],
        });
      }
      return "👤 done adding userProfiles";
    },
    initPaymentTransactions: async (_, { paymentTransactions }, { prisma }) => {
      if (paymentTransactions?.length) {
        await prisma.paymenttrasnsactions.createMany({
          data: [...paymentTransactions],
        });
      }
      return "💸 done adding paymentTransactions";
    },
    initShippingOrders: async (_, { ShippingOrders }, { prisma }) => {
      if (ShippingOrders?.length) {
        await prisma.shippingorders.createMany({
          data: [...ShippingOrders],
        });
      }
      return "🎁 done adding ShippingOrders";
    },
    unsafe: async (_, __, { prisma }) => {
      const tbls = [
        "addresses",
        "aspnetusers",
        "userprofiles",
        "requests",
        "shippingorders",
        "paymenttrasnsactions",
      ];
      const tablenames = await prisma.$queryRaw<
        Array<{ tablename: string }>
      >`SELECT tablename FROM pg_tables WHERE schemaname='public' and tablename in ('addresses','aspnetusers','userprofiles','requests','shippingorders','paymenttrasnsactions')`;
      for (const { tablename } of tablenames) {
        try {
          await prisma.$executeRawUnsafe(
            `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
          );
          console.log(`table ${tablename} truncated 👌`);
        } catch (error) {
          console.log({ error });
        }
      }
      return "ok";
    },
  },
};
