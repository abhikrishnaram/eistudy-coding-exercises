import * as readline from 'readline';
import chalk from 'chalk';
import { LaunchStage, RocketState, SimulatorConfig } from './types';
import { SimulatorError, InvalidCommandError, InvalidStageError } from './errors';

const initialState: RocketState = {
  stage: LaunchStage.PreLaunch,
  fuel: 100,
  altitude: 0,
  speed: 0
};

/**
 * Class representing the Rocket Launch Simulator.
 */
export class RocketLaunchSimulator {
  private state: RocketState;
  private isChecksComplete: boolean = false;
  private rl: readline.Interface;
  private logger: SimulatorConfig['logger'];

  /**
   * Creates an instance of RocketLaunchSimulator.
   * @param config - The configuration object for the simulator.
   */
  constructor(config: SimulatorConfig) {
    this.state = initialState;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.logger = config.logger;
  }

  /**
   * Starts the simulator.
   */
  public start(): void {
    this.logger.info('Rocket Launch Simulator started');
    console.log(chalk.bold.green('Welcome to the Rocket Launch Simulator!'));
    this.promptUser();
  }

  /**
   * Prompts the user for input.
   */
  private promptUser(): void {
    this.rl.question(chalk.cyan('Enter command (start_checks, launch, fast_forward X, or exit): '), (input) => {
      this.handleUserInput(input).catch((error) => {
        if (error instanceof SimulatorError) {
          console.error(chalk.red(error.message));
          this.logger.error(error.message);
        } else {
          console.error(chalk.red('An unexpected error occurred:'), error);
          this.logger.error('An unexpected error occurred', { error });
        }
      }).finally(() => {
        this.promptUser();
      });
    });
  }

  /**
   * Handles user input and executes corresponding actions.
   * @param input - The user's input string.
   */
  private async handleUserInput(input: string): Promise<void> {
    const [command, ...args] = input.split(' ');
  
    switch (command) {
      case 'start_checks':
        await this.performPreLaunchChecks();
        break;
      case 'launch':
        await this.launch();
        break;
      case 'fast_forward':
        await this.fastForward(parseInt(args[0]));
        break;
      case 'exit':
        // Exit handling with confirmation
        this.rl.question(chalk.yellow('Are you sure you want to exit? (yes/no): '), (answer) => {
          if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            console.log(chalk.yellow('Exiting simulator. Goodbye!'));
            this.logger.info('Simulator exited');
            this.rl.close(); // Close readline interface
          } else {
            console.log(chalk.green('Continuing simulator...'));
            this.promptUser(); // Continue simulator if they don't want to exit
          }
        });
        return;  // Ensure the function exits without continuing after exit
      default:
        throw new InvalidCommandError(command);
    }
  }
  

  /**
   * Performs pre-launch checks.
   */
  private async performPreLaunchChecks(): Promise<void> {
    if (this.state.stage !== LaunchStage.PreLaunch) {
      throw new InvalidStageError(this.state.stage, LaunchStage.PreLaunch);
    }

    console.log(chalk.blue('Performing pre-launch checks...'));
    this.logger.info('Performing pre-launch checks');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(chalk.green('All systems are \'Go\' for launch.'));
    this.logger.info('Pre-launch checks completed successfully');
    this.isChecksComplete = true;
  }

  /**
   * Initiates the launch sequence.
   */
  private async launch(): Promise<void> {
    if (this.state.stage !== LaunchStage.PreLaunch) {
      throw new InvalidStageError(this.state.stage, LaunchStage.PreLaunch);
    }

    if (!this.isChecksComplete) {
      throw new SimulatorError('Cannot launch. Pre-launch checks have not been completed.');
    }

    console.log(chalk.yellow('Initiating launch sequence...'));
    this.logger.info('Launch sequence initiated');
    this.state.stage = LaunchStage.Stage1;
    await this.simulateLaunch();
  }

  /**
   * Simulates the launch process.
   */
  private async simulateLaunch(): Promise<void> {
    while (this.state.stage !== LaunchStage.Orbit && this.state.stage !== LaunchStage.Failed) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.updateState();
      this.displayState();
    }
  }

  /**
   * Updates the rocket's state during the simulation.
   */
  private updateState(): void {
    this.state.fuel -= 2;
    this.state.altitude += 10;
    this.state.speed += 100;

    if (this.state.fuel <= 0) {
      this.state.stage = LaunchStage.Failed;
      console.log(chalk.red.bold('Mission Failed due to insufficient fuel.'));
      this.logger.warn('Mission failed: Insufficient fuel');
      return;
    }

    if (this.state.altitude >= 100 && this.state.stage === LaunchStage.Stage1) {
      console.log(chalk.magenta('Stage 1 complete. Separating stage. Entering Stage 2.'));
      this.logger.info('Entering Stage 2');
      this.state.stage = LaunchStage.Stage2;
    }

    if (this.state.altitude >= 200) {
      this.state.stage = LaunchStage.Orbit;
      console.log(chalk.green.bold('Orbit achieved! Mission Successful.'));
      this.logger.info('Mission successful: Orbit achieved');
    }
  }

  /**
   * Displays the current state of the rocket.
   */
  private displayState(): void {
    const stateString = `Stage: ${chalk.yellow(this.state.stage)}, Fuel: ${chalk.blue(this.state.fuel + '%')}, Altitude: ${chalk.magenta(this.state.altitude + ' km')}, Speed: ${chalk.cyan(this.state.speed + ' km/h')}`;
    console.log(stateString);
    this.logger.info('State update', { state: this.state });
  }

  /**
   * Fast forwards the simulation by a specified number of seconds and retrieves
   * the rocket state at that point in time.
   * @param seconds - The number of seconds to fast forward.
   */
  private async fastForward(seconds: number): Promise<void> {
    if (isNaN(seconds) || seconds <= 0) {
      throw new SimulatorError('Invalid fast forward value. Please provide a positive number of seconds.');
    }

    console.log(chalk.yellow(`Fast forwarding ${seconds} seconds...`));
    this.logger.info(`Fast forwarding ${seconds} seconds`);

    // Reset the state to simulate from the start
    this.state = {
      stage: LaunchStage.PreLaunch,
      fuel: 100,
      altitude: 0,
      speed: 0
    };
    
    // Perform pre-launch checks if not done yet
    if (!this.isChecksComplete) {
      console.log(chalk.blue('Performing pre-launch checks before fast forward...'));
      this.isChecksComplete = true;
    }

    this.state.stage = LaunchStage.Stage1;
    // Simulate each second until the requested fast forward time
    for (let i = 0; i < seconds; i++) {
      this.updateState();  // Update the rocket state for each second
      if (this.state.stage === LaunchStage.Orbit || this.state.stage === LaunchStage.Failed) {
        break;  // Stop simulation if mission is complete
      }
    }

    // Display the state at the fast-forward point
    this.displayState();
  }
}