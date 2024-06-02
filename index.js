import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));

const apiKey = "73a2c311c4mshd0959483b062a4ap1f1cbajsn64498ea691eb";

const options = {
    params: { limit: '18' },
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
    }
};

app.get("/", async (req, res) => {
    try {
        const response = await axios.get('https://bhagavad-gita3.p.rapidapi.com/v2/chapters/', options);
        const chapters = response.data; // Adjust this according to the actual data structure
        res.render("index.ejs", { chapters: chapters });
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/chapters/:chapterNumber", async (req, res) => {
    console.log(req.params)
    const chapterNumber = req.params.chapterNumber;
    try {
        const response = await axios.get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/`, options);
        console.log(response.data)
        const chapter = response.data; // Adjust this according to the actual data structure
        res.render("chapter.ejs", { chapter: chapter });
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/chapters/:chapterNumber/verses", async (req, res) => {
    console.log('arfevw')
    console.log(req.params)
    const chapterNumber = req.params.chapterNumber;
    try {
        const response = await axios.get(`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/verses/`, options);
        console.log(response.data)
        const verse = response.data; // Adjust this according to the actual data structure
        res.render("verse.ejs", { verse: verse });
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
