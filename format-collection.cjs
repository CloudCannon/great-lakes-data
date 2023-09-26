const fs = require('fs').promises;
const path = require('path');
const YAML = require('json-to-pretty-yaml');

(async () => {
  const collectionName = process.argv[2];

  if (!collectionName) {
    throw new Error('Please provide the collection name to install')
  }

  const collectionDir = path.join('.' , 'src', 'content', collectionName);
  // rm -rf ./src/content/$COLLECTION
  // mkdir ./src/content/$COLLECTION
  // cp ./great-lakes-data/content/$COLLECTION/* ./src/content/$COLLECTION
  console.log(`📝 Formatting ${collectionName} data files now from ${collectionDir}...`);
  const files = await fs.readdir(collectionDir);

  await Promise.all(files.map(async (filename) => {
    // Parse the filename
    const originalFilepath = path.join(collectionDir, filename);
    const markdownFilename = filename.replace(/json/g, 'md').replace(/_/g, '-');
    const markdownFilepath = path.join(collectionDir, markdownFilename);

    // Parse JSON data file and turn the front matter into formatted yaml
    console.log(`📝 Reading ${originalFilepath}...`);
    const contents = await fs.readFile(originalFilepath);
    // console.log(originalFilepath, contents.toString('utf8'));
    const jsonObj = JSON.parse(contents.toString('utf8'))
    const { content_markdown, ...frontMatterData } = jsonObj;

    // Add the markdown content underneath the formatted yaml
    const totalPage = [
      '---',
      YAML.stringify(frontMatterData),
      '---',
      content_markdown
    ].join('\n');
    
    // Create new markdown file
    await fs.writeFile(markdownFilepath, totalPage)
    return fs.unlink(originalFilepath);
  }));
})();
