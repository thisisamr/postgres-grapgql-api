import { PrismaClient } from "@prisma/client";
import { AuthenticationError, Context } from "apollo-server-core";
import { IncomingMessage, OutgoingMessage } from "http";
import { Resolvers } from "../generated/graphql";
import { User } from "../types/types";
export interface Icontext extends Context {
  prisma: PrismaClient;
  user: User;
  res: OutgoingMessage;
  req: IncomingMessage;
  createToken: (user: { name: string; email: string }) => string;
}
export const resolvers: Resolvers<Icontext> = {
  Query: {
    TableIsEmpty: async (_, __, { prisma }) => {
      const tb = __.tablename;
      const isempty = (await prisma[tb].count()) == 0;
      return isempty;
    },
    GetNumberOfRecords: async (_, __, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("no auth");
      }
      const tablenames = [
        "addresses",
        "aspnetusers",
        "userprofiles",
        "requests",
        "shippingorders",
        "paymenttrasnsactions",
        "useraddresses",
      ];
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
    rualive: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError("no auth");
      }
      return true;
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
      }
      return "Empty user list provided or null";
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
        return "🏠 done adding Addresses";
      }
      return "Empty user list provided or null";
    },
    initUserProfiles: async (_, { userProfiles }, { prisma }) => {
      if (userProfiles?.length) {
        await prisma.userprofiles.createMany({
          data: [...userProfiles],
        });
        return "👤 done adding userProfiles";
      }
      return "Empty user list provided or null";
    },
    initPaymentTransactions: async (_, { paymentTransactions }, { prisma }) => {
      if (paymentTransactions?.length) {
        await prisma.paymenttrasnsactions.createMany({
          data: [...paymentTransactions],
        });
        return "💸 done adding paymentTransactions";
      }
      return "Empty user list provided or null";
    },
    initShippingOrders: async (_, { ShippingOrders }, { prisma }) => {
      if (ShippingOrders?.length) {
        await prisma.shippingorders.createMany({
          data: [...ShippingOrders],
        });
        return "🎁 done adding ShippingOrders";
      }
      return "Empty user list provided or null";
    },
    initUserAddresses: async (_, { UserAddresses }, { prisma }) => {
      if (UserAddresses?.length) {
        await prisma.useraddresses.createMany({
          data: [...UserAddresses],
          // Skip 'Bobo'
        });
        return "😡 done adding UserAddresses";
      }
      return "Empty user list provided or null";
    },
    unsafe: async (_, __, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("no auth");
      }
      const tablenames = await prisma.$queryRaw<
        Array<{ tablename: string }>
      >`SELECT tablename FROM pg_tables WHERE schemaname='public' and tablename in ('addresses','aspnetusers','userprofiles','requests','shippingorders','paymenttrasnsactions','useraddresses')`;
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
