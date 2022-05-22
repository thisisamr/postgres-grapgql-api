import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();

    // globalWithPrisma.prisma.$use(async (params, next) => {
    //   const before = Date.now();

    //   const result = await next(params);

    //   const after = Date.now();
    //   console.log(
    //     `Query ${params.model}.${params.action} took ${after - before}ms`
    //   );

    //   return result;
    // });
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
