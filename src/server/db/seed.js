const prisma = require('../client')

async function main() {
    try {
        console.log("Starting to create users...");

        await prisma.user.create({
            data: {
                username: 'albert',
                password: 'bertie99',
                name: 'Al Bert',
                location: 'Sidney, Australia',
                active: true,
                post: {
                    create: [
                        {
                            title: "First Post",
                            content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
                            tags: {
                                create: [
                                    { name: "#happy" },
                                    { name: "#youcandoanything" }
                                ]
                            }
                        },
                        {
                            title: "Second Post",
                            content: "This is my second post. I hope you enjoy my post",
                            tags: {
                                create: [
                                    { name: "#incredible" },
                                    { name: "#believeinyourself" }
                                ]
                            }
                        },
                        {
                            title: "Third Post",
                            content: "This is my third post. I hope I love to deisgn websites as much as i read them.",
                            tags: {
                                create: [
                                    { name: "#awesome" },
                                    { name: "#begreat" }
                                ]
                            }
                        }

                    ]
                }
            }
        });
        await prisma.user.create({
            data: {
                username: 'sandra',
                password: '2sandy4me',
                name: 'Just Sandra',
                location: 'Ain\'t tellin\'',
                active: true,
                post: {
                    create: [
                        {
                            title: "First Post",
                            content: "This is my first post. I hope I can style a page as much as I love styling with clothes.",
                            tags: {
                                create: [
                                    { name: "#fabolous" },
                                    { name: "#imastar" }
                                ]
                            }
                        },
                        {
                            title: "Second Post",
                            content: "This is my second post. Love yourself and never forget without practice there is no progress",
                            tags: {
                                create: [
                                    { name: "#caring" },
                                    { name: "#believeinyourself" }
                                ]
                            }
                        },
                        {
                            title: "Third Post",
                            content: "This is my third post. I hope I love to deisgn websites as much as I read them.",
                            tags: {
                                create: [
                                    { name: "#awesome" },
                                    { name: "#begreat" }
                                ]
                            }
                        }

                    ]
                }
            }
        });

        await prisma.user.create({
            data: {
                username: 'glamgal',
                password: 'soglam',
                name: 'Joshua',
                location: 'Upper East Side',
                active: true,
                post: {
                    create: [
                        {
                            title: "First Post",
                            content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
                            tags: {
                                create: [
                                    { name: "#happy" },
                                    { name: "#youcandoanything" }
                                ]
                            }
                        },
                        {
                            title: "Second Post",
                            content: "This is my second post. I hope you enjoy my post",
                            tags: {
                                create: [
                                    { name: "#incredible" },
                                    { name: "#believeinyourself" }
                                ]
                            }
                        },
                        {
                            title: "Third Post",
                            content: "This is my third post. I hope I love to deisgn websites as much as i read them.",
                            tags: {
                                create: [
                                    { name: "#awesome" },
                                    { name: "#begreat" }
                                ]
                            }
                        }

                    ]
                }
            }
        });


        console.log("Finished creating users!");
    } catch (error) {
        console.error("Error creating users!");
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })