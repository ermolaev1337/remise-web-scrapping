const axios = require('axios');
const cheerio = require('cheerio');

async function extractContent() {
    try {
        // Fetch the page content
        const response = await axios.get('https://www.uni.lu/snt-en/research-groups/finatrax/');
        const html = response.data;

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        // Select the content by the CSS selector
        const content = $('#heading-page > h2 > span.heading-page__second-line').text();

        // Print the content or a message if not found
        if (content) {
            console.log(content.trim());
        } else {
            console.log('Content not found');
        }
    } catch (error) {
        console.error('Error fetching the page:', error.message);
    }
}

extractContent();
