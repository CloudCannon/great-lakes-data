const fs = require('fs').promises;
const path = require('path');

(async () => {
  const collectionName = process.argv[2];

  if (!collectionName) {
    throw new Error('Please provide the collection name to install');
  }

  console.log(`📝 Formatting ${collectionName} data files now...`);
  const collectionDir = path.join(
    'great-lakes-data',
    'content',
    collectionName
  );
  const files = await fs.readdir(collectionDir);

  const items = await Promise.all(
    files.map(async (fileName) => {
      const dataFilepath = path.join(collectionDir, fileName);
      console.log(`📝 Reading ${dataFilepath} into data file...`);
      const contents = await fs.readFile(dataFilepath);
      await fs.unlink(dataFilepath);
      return JSON.parse(contents.toString('utf8'));
    })
  );

  const destPath = path.join('data', `${collectionName}.json`);
  console.log(`Writing to ${destPath}`);
  await fs.mkdir(path.join('data'), { recursive: true });
  await fs.writeFile(destPath, JSON.stringify(items, null, '\t'), {
    encoding: 'utf8',
  });
})();
