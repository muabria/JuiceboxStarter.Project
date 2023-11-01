const express = require('express');
const userRouter = require("express").Router();
const prisma = require("../client")

// Get all users
userRouter.get("/", async (req, res, next) => {
    try {
        const users = await prisma.users.findMany();
        users.forEach(user => delete user.password),

            res.send(users);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Get a user by id
userRouter.get("/:id", async (req, res, next) => {
    try {
        const users = await db.users.findUnique({
            where: { id: +req.params.id },
        });

        res.send(users);
    } catch ({ name, message }) {
        next({ name, message });
    }
});


// Create a new users
userRouter.post("/", async (req, res, next) => {
    try {
        const users = await db.users.create({
            data: { ...req.body, instructor: { connect: { id: req.user.id } } },
        });
        res.status(201).send(users);
    } catch ({ name, message }) {
        next({ name, message });
    }
});
// POST: register 


userRouter.post('/register', async (req, res, next) => {
    const { username, password, name, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)


    try {
        const usersR = await prisma.users.findUnique({
            where: {
                username: username
            }
        });

        if (usersR) {
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        }

        const user = await prisma.users.create({
            data: {
                username: username,
                password: hashedPassword,
                name: name,
                location: location
            }
        });

        if (!user) {
            next({
                name: 'UserCreationError',
                message: 'There was a problem registering. Please try again.',
            });
        } else {
            delete user.password;

            const token = jwt.sign({
                id: user.id,
                username
            }, JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                user,
                message: "Thank you for signing up!",
                token
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});


module.exports = userRouter;