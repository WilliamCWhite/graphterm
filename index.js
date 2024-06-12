import readline from 'node:readline'
import { escapes as e } from './escapes.js'

console.log(`${e.cr}Hello World!${e.rc}`);

const input = new Array(40);
for (let i = 0; i < input.length; i++) {
    input[i] = 15 * Math.sin (i * ((Math.PI * 4) / input.length));
}
//graphTest(input);
const translated = translateInput(input, 200, 12);
const betweens = generateBetween(translated);
const rows = new Array(30);
for (let i = 0; i < rows.length; i++) {
    rows[i] = {};
}
console.log(betweens);
populateRowObjects(rows, betweens);
console.log(rows);
generateGraph(rows);



function generateGraph(rows, terminalWidth) {
    const strings = new Array(rows.length).fill("");
    for (let i = 0; i < rows.length; i++) {
        const keys = Object.keys(rows[i]);
        let widthLeft = terminalWidth;
        let lastKeyNumber = 0;
        for (let k = 0; k < keys.length; k++) {
            const keyNumber = parseInt(keys[k]) - lastKeyNumber;
            strings[i] += " ".repeat(keyNumber) + rows[i][keys[k]];
            widthLeft -= (keyNumber + 1);
            lastKeyNumber += keyNumber + 1;
        }
        strings[i] += " ".repeat(widthLeft);
    }

    for (let i = strings.length - 1; i >= 0; i--) {
        console.log(strings[i]);
    }
}

function populateRowObjects(rows, betweens) {
    for (let i = 0; i < betweens.length - 1; i++) {
        let difference = Math.round(betweens[i+1] - betweens[i]);
        let yPosition = Math.floor(betweens[i]);
        const xPosition = i;

        if (Math.abs(difference) < 2) {
            let symbol = "?"
            if (difference === 0) {
                symbol = "_"
            }
            else if (difference === 1) {
                symbol = "/"
            }
            else if (difference === -1) {
                symbol = "\\"
            }
            console.log(`Symbol: ${symbol}, Difference: ${difference}, Y: ${yPosition}, X: ${xPosition}`)
            rows[yPosition][xPosition] = symbol;
        }
        else {
            const yPosition2 = Math.round(betweens[i+1]);
            for (let p = yPosition; p < yPosition2; p++) {
                rows[p][xPosition] = "|";
            }
            if (difference > 0)
                rows[yPosition2][xPosition] = "/";
            else
                rows[yPosition2][xPosition] = "\\";
        }
    }
}

function generateBetween(input) {
    const output = new Array(input.length + 1);
    output[0] = input[0];
    output[output.length - 1] = input[input.length - 1];
    for (let i = 0; i <= input.length - 2; i++) {
        const betweenValue = (input[i] + input[i + 1]) / 2;
        output[i+1] = betweenValue;
    }
    return output;
}


// TRANSLATE INPUT EATS
function translateInput(inputArray, terminalWidth, terminalHeight) {
    const output = new Array(terminalWidth);
    const arrayMinimum = Math.min.apply(null, inputArray);
    const arrayMaximum = Math.max.apply(null, inputArray);
    const arrToTerm = (inputArray.length - 1) / (terminalWidth - 1);

    for (let termIndex = 0; termIndex < terminalWidth - 1; termIndex++) {
        let inputIndex = Math.floor(termIndex * arrToTerm);
        let slopePortion = termIndex * arrToTerm - inputIndex;
        let difference = -(inputArray[inputIndex] - inputArray[inputIndex + 1]);
        let value = inputArray[inputIndex] + difference * slopePortion;
        output[termIndex] = yToColumn(value, arrayMinimum, arrayMaximum, terminalHeight);
    }
    output[output.length - 1] = terminalHeight - 1;
    // console.log(output);
    return output;

}

function yToColumn(y, minY, maxY, terminalHeight) {
    const range = maxY - minY;
    const portion = (y - minY) / range;
    const column = Math.floor(portion * terminalHeight);
    return column;
}



