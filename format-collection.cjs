const fs = require('fs').promises;
const YAML = require('json-to-pretty-yaml');

// TODO: Get from env
const collections = ['blog', 'profiles'];

(async () =>
  Promise.all(
    collections.map(async (collectionName) => {
      console.log(`📝 Formatting ${collectionName} data files now...`);
      const collectionDir = `./src/content/${collectionName}`;
      const files = await fs.readdir(collectionDir);

      await Promise.all(files.map(async (filename) => {
        // Parse the filename
        const originalFilepath = `${collectionDir}/${filename}`;
        const markdownFilename = filename.replace(/json/g, 'md').replace(/_/g, '-');
        const markdownFilepath = `${collectionDir}/${markdownFilename}`
  
        // Parse JSON data file and turn the front matter into formatted yaml
        const contents = await fs.readFile(originalFilepath);
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
    })
  ))();

