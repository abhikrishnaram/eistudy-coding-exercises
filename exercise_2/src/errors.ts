/**
 * Base error class for simulator-specific errors.
 */
export class SimulatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SimulatorError';
  }
}

/**
 * Error thrown when an invalid command is entered.
 */
export class InvalidCommandError extends SimulatorError {
  constructor(command: string) {
    super(`Invalid command: ${command}`);
    this.name = 'InvalidCommandError';
  }
}

/**
 * Error thrown when an action is attempted in an invalid launch stage.
 */
export class InvalidStageError extends SimulatorError {
  constructor(currentStage: string, requiredStage: string) {
    super(`Invalid stage: Current stage is ${currentStage}, but ${requiredStage} is required.`);
    this.name = 'InvalidStageError';
  }
}