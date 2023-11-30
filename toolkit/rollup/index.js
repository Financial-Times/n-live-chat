const { Task } = require('@dotcom-tool-kit/types');
const rollup = require('rollup');
const { loadConfigFile } = require('rollup/loadConfigFile');
const path = require('node:path');

class Rollup extends Task {
  async run() {
    this.logger.info('Initializing rollup task');
    const configPath = path.join(process.cwd(), 'rollup.config.js');
    const { options, warnings } = await loadConfigFile(configPath, {
      format: 'es',
      bundleConfigAsCjs: true,
    });

    // print any config warnings to the console
    warnings.flush();

    for (const optionsEntry of options) {
      const bundle = await rollup.rollup(optionsEntry);
      await Promise.all(optionsEntry.output.map(bundle.write));
    }
    this.logger.info('Rollup task complete');
  }
}

exports.tasks = [Rollup];
