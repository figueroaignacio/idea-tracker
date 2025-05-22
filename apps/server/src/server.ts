import { App } from './app';
import { config } from './config/config';
import { logger } from './utils/logger';

const app = new App();
app.listen(config.app.port);
logger.info(`Running ${config.app.name} v${config.app.version} on port ${config.app.port}`);
