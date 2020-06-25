const app = require('express')();
const { PORT } = require('./config/config');
const getResults = require('./scrapper');

app.get("/", async (req, res) => {
    return res.json({
        message : "IP2Location by CodeVirk"
    });
});

app.get("/:ip", async (req, res) => {
    
    const { ip } = req.params;
    
    const json = await getResults(ip);
    return res.json(json);

});

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})