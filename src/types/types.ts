import { PrismaClient, User } from "@prisma/client";
import { Context } from "apollo-server-core";
import { IncomingMessage, OutgoingMessage } from "http";

export interface Icontext extends Context {
  prisma: PrismaClient;
  user: User;
  res: OutgoingMessage;
  req: IncomingMessage;
}
