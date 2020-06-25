const cheerio = require("cheerio");
const axios = require("axios");
const { SITE_URL } = require('./config/config');

const fetchData = async (ip) => {
    const result = await axios.get(`${SITE_URL}?ip=${ip}`);
    return cheerio.load(result.data);
}

const getResults = async (ip) => {
    const $ = await fetchData(ip);
    const data = {}

    $('.table-auto tr').each(function() {
        let key = $(this).find('th').text().toLocaleLowerCase().replace(" ", "").replace(":", "");
        let val = $(this).find('td').text();
        data[key] = val;
    });

    return data;
}

module.exports = getResults;