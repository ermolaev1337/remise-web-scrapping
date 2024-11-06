const puppeteer = require('puppeteer');

async function extractContent() {
    try {
        // Launch Puppeteer with more robust options
        const browser = await puppeteer.launch({
            headless: false, // Ensure the browser runs in non-headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Fix for some environments
            defaultViewport: null // Ensures the viewport is maximized to your screen
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 }); // Optional: Set viewport size

        // Navigate to the page
        await page.goto('https://www.uni.lu/snt-en/research-groups/finatrax/', {
            waitUntil: 'networkidle2' // Wait until the network is idle
        });

        // Extract the content using page.evaluate()
        const content = await page.evaluate(() => {
            const element = document.querySelector('#heading-page > h2 > span.heading-page__second-line');
            return element ? element.textContent.trim() : null;
        });

        if (content) {
            console.log(content);
        } else {
            console.log('Content not found');
        }

        // Keep the browser open for confirmation (uncomment the next line if you want it to close)
        await browser.close();
    } catch (error) {
        console.error('Error fetching the page:', error.message);
    }
}

extractContent();
