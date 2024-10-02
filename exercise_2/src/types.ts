import * as winston from 'winston';

/**
 * Enum representing the different stages of a rocket launch.
 */
export enum LaunchStage {
  PreLaunch = 'Pre-Launch',
  Stage1 = 'Stage 1',
  Stage2 = 'Stage 2',
  Orbit = 'Orbit',
  Failed = 'Failed'
}

/**
 * Interface representing the state of the rocket.
 */
export interface RocketState {
  stage: LaunchStage;
  fuel: number;
  altitude: number;
  speed: number;
}

/**
 * Interface for the simulator configuration.
 */
export interface SimulatorConfig {
  logger: winston.Logger;
}