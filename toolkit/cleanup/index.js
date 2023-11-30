const { Task } = require('@dotcom-tool-kit/types');
const { exec } = require('child_process');
const { hookFork, waitOnExit } = require('@dotcom-tool-kit/logger');

class Cleanup extends Task {
  async run() {
    this.logger.info('Initializing clean-up task');
    const child = await exec(
      'bash -c "rm -rf ./dist ./public"'
    );
    hookFork(this.logger, 'Clean-up run', child);
    return waitOnExit('Clean-up complete', child);
  }
}

exports.tasks = [Cleanup];
