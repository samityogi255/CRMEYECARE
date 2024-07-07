const { PrismaClient } = require("@prisma/client");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

// Initialize app and Prisma client
dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// Token blacklist
const blacklist = new Set();

// Routes
app.get('/', (req, res) => {
    res.send("Hello world");
});

// Create new user with hashed password
app.post('/createUser', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = { email: req.body.email, username: req.body.name, password: hashedPassword };
        const newUser = await prisma.user.create({ data: user });
        
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
        console.log("Error:", error);
    }
});

// Log in user and generate token
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await prisma.user.findUnique({ where: { email } });

        if (!findUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const user = { email: findUser.email, name: findUser.name };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        
        res.json({ message: "Login successful", user: findUser, accessToken });
    } catch (err) {
        res.status(500).json({ error: "Error during login" });
        console.log("Error:", err);
    }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    if (blacklist.has(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// Get user information
app.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.user.email },
            select: { name: true, email: true }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Error fetching user information" });
        console.log("Error:", err);
    }
});

// Log out user
app.post('/logout', authenticateToken, (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    blacklist.add(token);
    res.json({ message: 'Logout successful' });
});

// Start server
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
