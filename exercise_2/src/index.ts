import { RocketLaunchSimulator } from './simulator';
import { createLogger } from './logger';

const logger = createLogger();
const simulator = new RocketLaunchSimulator({ logger });
simulator.start();