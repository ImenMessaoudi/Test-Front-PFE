const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.tripadvisor.fr/Attractions-g293758-Activities-Tunis_Tunis_Governorate.html";

async function listAttractions() {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        
        // Now you can use Cheerio selectors to extract data from the HTML
        const attractions = $(".BMQDV._F.Gv.wSSLS.SwZTJ.hNpWR"); // Example selector, adjust as needed

        console.log(attractions.text()); // Print the extracted text content
    } catch (error) {
        console.error('Error:', error);
    }
}

listAttractions();
