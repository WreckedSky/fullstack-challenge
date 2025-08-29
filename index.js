// index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Input data is required and must be an array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let all_alphabetic_chars = [];

        data.forEach(item => {
            if (!isNaN(item)) {
                const num = Number(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(String(num));
                } else {
                    odd_numbers.push(String(num));
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                all_alphabetic_chars.push(...item.split(''));
            } else {
                special_characters.push(item);
            }
        });

        const reversed_chars = all_alphabetic_chars.reverse();
        const concat_string = reversed_chars.map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');

        const response = {
            is_success: true,
            user_id: `${process.env.FULL_NAME}_${process.env.DOB_DDMMYYYY}`,
            email: process.env.EMAIL_ID,
            roll_number: process.env.ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});