# CloudCannon Data Lake Demo

This repo illustrates one approach to building a git-based headless CMS using CloudCannon.

The files in the `content` are used as the site, and are passed through the CloudCannon build unchanged. Individual sites can use prebuild build hooks and JavaScript to then `git clone` the Data Lake, copy the JSON files and assets, format them, then place them in the correct place.

As these files are JSON files, this means they can also be accessed as if they were an API endpoint — for example the file at `content/blog/hello_world.json` could be loaded at `https://<website_address>/blog/hello_world.json`. 

When editing in CloudCannon, these posts will open in the Visual Editor, using the preview page found at `content/blog-post-previewer/index.html`. This file uses CloudCannon's live editing APIs to fetch the relevant data on load, and previews the content of the JSON file with some hypothetical styling to match the end consumer application. This previewer can be configured however you wish.
