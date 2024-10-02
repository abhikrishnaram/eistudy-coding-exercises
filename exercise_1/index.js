const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');

// Directory for compiled JavaScript files
const distDir = path.join(__dirname, 'dist');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to compile TypeScript files
function compileTypeScript() {
    return new Promise((resolve, reject) => {
        exec('tsc', (error, stdout, stderr) => {
            if (error) {
                reject(`Error compiling TypeScript: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
}

// Function to run a single compiled JavaScript file
function runFile(file, exampleData) {
    return new Promise((resolve, reject) => {
        exec(`node ${file}`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing ${file}: ${stderr}`);
            } else {
                console.log(`\nRunning example: ${exampleData.pattern} (${exampleData.type})`);
                console.log(`Description: ${exampleData.description}`);
                console.log('='.repeat(50) + '\n');
                console.log(stdout)
                console.log('='.repeat(50) + '\n\n');
                resolve();
            }
        });
    });
}

// Hard-coded examples with type, description, and file links
const examples = [
    { pattern: 'Singleton', type: 'Creational', description: 'Logger class example', file: 'creational/case_1.js' },
    { pattern: 'Builder', type: 'Creational', description: 'APIRequestBuilder example', file: 'creational/case_2.js' },
    { pattern: 'Facade', type: 'Structural', description: 'PaymentFacade example', file: 'structural/case_1.js' },
    { pattern: 'Adapter', type: 'Structural', description: 'WeatherAdapter example', file: 'structural/case_2.js' },
    { pattern: 'Observer', type: 'Behavioral', description: 'Sale class example', file: 'behavioral/case_1.js' },
    { pattern: 'Iterator', type: 'Behavioral', description: 'Pagination system example', file: 'behavioral/case_2.js' },
];

// Function to display menu and handle user input
async function displayMenu() {
    const options = examples.map((example, index) => 
        `${index + 1}. ${example.pattern} (${example.type}): ${example.description}`
    ).join('\n');


    rl.question(`Select an example to run:\n${options}\n${examples.length + 1}. Exit\nEnter your choice (1-${examples.length + 1}): `, async (answer) => {
        const choice = parseInt(answer) - 1;
        if (choice >= 0 && choice < examples.length) {
            await runFile(path.join(distDir, examples[choice].file), examples[choice]);
            displayMenu(); // Show the menu again after running the example
        } else if (choice === examples.length) {
            console.log('Exiting the program. Goodbye!');
            rl.close(); // Close the readline interface
        } else {
            console.log('Invalid choice. Please try again.');
            displayMenu(); // Show the menu again for invalid input
        }
    });
}

// Main function to compile and run
async function main() {
    try {
        await compileTypeScript();
        await displayMenu();
    } catch (error) {
        console.error(error);
    }
}

main();
