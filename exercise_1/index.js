const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Directory for compiled JavaScript files
const distDir = path.join(__dirname, 'dist');

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
function runFile(file) {
    return new Promise((resolve, reject) => {
        exec(`node ${file}`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing ${file}: ${stderr}`);
            } else {
                console.log(`Output of ${file}:\n${stdout}`);
                resolve();
            }
        });
    });
}

// Function to run all compiled JavaScript files
async function runCompiledFiles() {
    const files = fs.readdirSync(distDir).filter(file => file.endsWith('.js'));

    for (const file of files) {
        console.log(`Running ${file}...`);
        await runFile(path.join(distDir, file));
    }
}

// Main function to compile and run
async function main() {
    try {
        await compileTypeScript();
        await runCompiledFiles();
    } catch (error) {
        console.error(error);
    }
}

main();