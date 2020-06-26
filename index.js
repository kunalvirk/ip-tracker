const app = require('express')();
const { PORT } = require('./config/config');
const getResults = require('./scrapper');

app.get("/", async (req, res) => {

    const ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    return res.json({
        message : "IP2Location by CodeVirk",
        incomingIP : JSON.stringify(ip)
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