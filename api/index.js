const express = require("express");
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure your User model is correctly defined
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "sgydugvbsdgvcsghbjhvb";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173', // Adjust to your frontend URL
}));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        const newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        const userDoc = await newUser.save();
        res.status(201).json(userDoc);
    } catch (e) {
        console.error('Registration Error:', e);
        res.status(422).json({ error: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: 'Email and password are required' });
    }

    try {
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(404).json({ error: 'User not found' });
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
            if (err) {
                console.error('JWT Signing Error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', token });
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(null);
    }
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        } catch (error) {
            console.error('User Data Fetch Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

//logout endpoints
app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
