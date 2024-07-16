const { exec } = require('child_process');
const fs = require('fs');
const path = require('path')


const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
    // [7a54f83-fa02-4022-bcd6-87f280f288b6, cpp]
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`, (
            error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            resolve({ stdout })

        }
        )
    })
}

module.exports = {
    executeCpp
}