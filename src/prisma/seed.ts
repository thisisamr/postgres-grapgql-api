import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync();

async function main() {
await prisma.user.upsert({
    where: { email: "amr@amr.com" },
    update: {},
    create: {
      email: "amr@amr.com",
      firstname: "amr",
      password: bcrypt.hashSync("123456",salt),
      phonenumber: "445685521",
      lastname: "soliman",
      role: "MEMBER",
      avatar:
        "https://m.media-amazon.com/images/M/MV5BZTBiMzE1NWYtOWE3MS00MDAzLWI2NjAtN2ZiYjVhMTM1OGQwXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UY264_CR5,0,178,264_AL_.jpg",

    },
  });
await prisma.user.upsert({
    where: { email: "travis@travis.com" },
    update: {},
    create: {
      email: "travis@amr.com",
      firstname: "travis",
      password: "123456",
      phonenumber: "633749764",
      lastname: "soliman",
      role: "MEMBER",
      avatar:"https://images.indianexpress.com/2021/11/Travis-Scott-ap-1200by667.jpeg"

    },
  });
await prisma.user.upsert({
    where: { email: "mj@mj.com" },
    update: {},
    create: {
      email: "mj@amr.com",
      firstname: "michael",
      password: "123456",
      phonenumber: "123456789",
      lastname: "jackson",
      role: "MEMBER",
      avatar:"https://www.biography.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTE1ODA0OTcxMjkwNTYwMDEz/michael-jackson-pepsi-commercial-raw.jpg"

    },
  });
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
