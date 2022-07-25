import { PrismaClient } from "@prisma/client";
import { Context } from "apollo-server-core";
import { IncomingMessage, OutgoingMessage } from "http";

export interface Icontext extends Context {
  prisma: PrismaClient;
  user: User;
  res: OutgoingMessage;
  req: IncomingMessage;
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
}
