const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // For file system operations

const app = express();
app.use(bodyParser.json());

let componentData = {}; // Initialize as empty object

// Function to read data from JSON file
const readDataFromFile = async () => {
    try {
        const data = await fs.readFile('db.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data from file:', error);
        return {}; // Return empty object if file doesn't exist or cannot be read
    }
};

// Function to write data to JSON file
const writeDataToFile = async (data) => {
    try {
        await fs.writeFile('db.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data to file:', error);
    }
};

// Fetch initial data from JSON file on server start
(async () => {
    componentData = await readDataFromFile();
})();

app.post('/api/add', async (req, res) => {
    const newData = req.body;
    componentData = { ...componentData, ...newData };
    await writeDataToFile(componentData); // Update data in JSON file
    res.status(200).json({ success: true });
});

app.put('/api/update', async (req, res) => {
    const updatedData = req.body;
    componentData = { ...componentData, ...updatedData };
    await writeDataToFile(componentData); // Update data in JSON file
    res.status(200).json({ success: true });
});

app.get('/api/data', async (req, res) => {
  console.log(componentData);
    res.status(200).json(componentData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
