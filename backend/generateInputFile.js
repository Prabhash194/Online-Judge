const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirInputs = path.join(__dirname, 'input');

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobID = uuid();
    const input_filename = `${jobID}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);

    // Convert input to string if it's not already
    const inputData = typeof input === 'string' ? input : JSON.stringify(input);

    await fs.writeFileSync(input_filePath, inputData);
    return input_filePath;
};

module.exports = {
    generateInputFile,
};
