import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            email: "gitbash.hub@gmail.com",
            username: "gitbash.hub",
        },
    });
    console.log("New User");
    console.log(newUser);

    const firstTweet = await prisma.tweet.create ({
        data: {
            text: "This is my first tweet in PrimaTweet",
            userId: newUser.id,
        },
    });

    console.log("First Tweet");
    console.log("firstTweet");

    const newUserWithTweets = await prisma.user.findUnique({
        where: {
            email: "gitbash.hub@gmail.com",
        },
        include: {
            tweets: true
        },
    });

    console.log("User object with Tweets: ");
    console.dir(newUserWithTweets);
}


main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

