# Overview

CRT Scrapper Library is a versatile tool for scraping data from web pages. It provides various events to customize and control the scraping process, allowing users to retrieve data efficiently and reliably.

## Installation

To install the Scraper Library, use the following command:

```bash
npm i easy-lazy-docs
```
## Usage

```javascript
const { scrapeData } = require('easy-lazy-docs');

const url = 'https://www.trendyol.com/sanaozel/2?versionKey=singleProducts_JFY_Original_Man_Deng';
const targetClass = '.wrapper';

const options = {
    beforeRequest: (url) => {
        console.log(`Sending request to ${url}`);
    },
    afterRequest: (response) => {
        console.log(`Received response with status ${response.status}`);
    },
    onError: (error) => {
        console.error(`An error occurred: ${error.message}`);
    },
    beforeParse: ($) => {
        console.log('Parsing HTML content...');
    },
    afterParse: (data) => {
        console.log(`Scraped data: ${data}`);
    },
    beforeRetry: (error) => {
        console.log(`Retrying due to error: ${error.message}`);
    },
    afterRetry: (error) => {
        console.log('Retry attempt completed.');
    },
    beforeResponse: () => {
        console.log('Processing HTTP response...');
    },
    timeout: 5000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    },
};

scrapeData(url, targetClass, options)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });


```

