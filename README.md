# eBay Analyzer

## About

This tool is a simple, accurate, and 100% local informational tool that allows you to see the averages of eBay prices. It works similar to [AverageFinder](https://averagefinder.com/AverageFinder), but instead of fetching URLS and scraping the HTML code, eBay Analyzer simply reads directly from a copy'd and paste'd text blob directly from eBay's website. This approach is faster and more precise than AverageFinder's approach. Plus, the tool is 100% local. No server is required.

## Why use this?

I personally use this tool for reselling (flipping). When buying something to resell, I use this tool to find how much that item goes for on eBay, and from there I figure out if buying that item is worth it based on how much room I would have for profit. This is just one use for this tool; you could also use it to see if you're getting a good deal on an item.

## How do I use this?

Here are the steps to use this tool:

1. Go to the [eBay Website](https://ebay.com) and search for the item you want to see the averages for.
2. Apply all of the filters that you want for the item. The more filters you have, the more accurate the averages will be.
3. Copy the content of the entire webpage. Do this by selecting everything (CTRL-A or CMD-A) and copying it (CTRL-C or CMD-C).
4. Paste the webpage contents into the textbox.
5. Click the "Analyze" button and look at the results.

## How do you run this locally?

Make sure you have NodeJS and npm installed.

1. Download the Git repository either through Github or by using `git clone`. If you downloaded the repo through Github, make sure to unzip it.
2. Open the terminal in the directory you have the project in. (e.g. `~/Downloads/ebay-analyzer` or `/home/Downloads/ebay-analyzer`)

Run these commands in order:

```bash
$ npm install
$ npm run build
```

The HTML file should be in the `dist` directory.

NOTE: You might need something like [local-web-server](https://www.npmjs.com/package/local-web-server) to run the tool locally. This is because of CORS.

## License

This project is licensed under the Zlib license. See `LICENSE` for more information.
