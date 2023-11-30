const { Task } = require('@dotcom-tool-kit/types');
const sass = require('sass');
const fsPromises = require('node:fs/promises');
const path = require('node:path');

async function runSass({logger, inputPath, outputPath, sassOptions}) {
  logger.info('Initializing sass task');
  const sassPath = path.join(process.cwd(), inputPath);
  const result = sass.compile(sassPath, sassOptions);
  await fsPromises.writeFile(outputPath, result.css);
  logger.info('Sass task complete');
}

class Sass extends Task {
  async run() {
    await runSass({
      logger: this.logger,
      inputPath: 'src/scss/main.scss',
      outputPath: 'dist/main.css',
      sassOptions: {
        loadPaths: [
          'node_modules',
        ],
      },
    });
  }
}

class SassDemo extends Task {
  async run() {
    await runSass({
      logger: this.logger,
      inputPath: 'demos/scss/demo.scss',
      outputPath: 'public/main.css',
      sassOptions: {
        loadPaths: [
          'node_modules',
        ],
      },
    });
  }
}

exports.tasks = [
  Sass,
  SassDemo,
];
