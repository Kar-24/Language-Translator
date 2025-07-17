const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
    try {
        const { text, src, dest } = req.body;
        const response = await axios.post('http://localhost:5001/translate', {
            text,
            src,
            dest
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Translation service error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Node server running on port ${PORT}`));
