// JAVASCRIPT CROSSWORD GAME CREATED BY FAWWAZ SYIHAM MUYASSAR 1177050044

class Tile {
    constructor(letter) {
        this.isEmpty = letter == '-';
        this.correctLetter = letter;
        this.currentLetter = ' ';
        if (this.isEmpty) 
            this.buttonClass = 'btn-success disabled';
        else 
            this.buttonClass = 'btn-outline-primary';
        }
}

class QuestionAnswer {
    constructor(question, answer, gridPosition, isHorizontal){
        this.question = question;
        this.answer = answer;
        this.row = gridPosition[0];
        this.col = gridPosition[1];
        this.isHorizontal = isHorizontal;
    }
}

// index.html RELATED VARIABLE
const BOARD_NODE = document.getElementById("board");
const QUESTION_NODE = document.getElementById("question");
const ANSWER_NODE = document.getElementById("answer");

// CROSSWORD GLOBAL VARIABLE
const LAYOUT = [
    ['A', 'Y', 'A', 'M', '-', 'B'],
    ['-', '-', 'P', '-', '-', 'A'],
    ['-', '-', 'I', 'K', 'A', 'N']
];

const QUESTION_DICTIONARY = {
    1 : new QuestionAnswer(
        "Hewan Berkaki 2", "AYAM",
        [0, 0], true
    ),
    2 : new QuestionAnswer(
        "Panas", "API",
        [0, 2], false
    ),
    3 : new QuestionAnswer(
        "Binatang Laut", "IKAN",
        [2, 2], true
    ),
    4 : new QuestionAnswer(
        "Komponen Kendaraan", "BAN",
        [0, 5], false
    )
};

const ROW = LAYOUT.length;
const COLUMN = LAYOUT[0].length;

var grid = {};

function convertRowIntegerToChar(row) {
    return String.fromCharCode(65 + row);
}

function convertLayoutToGrid() {
    for (var i = 0; i < ROW; i++) {
        for (var j = 0; j < COLUMN; j++) {
            var id = convertRowIntegerToChar(i) + j;
            grid[id] = new Tile(LAYOUT[i][j]);
        }
    }
    console.log("Grid : ");
    console.log(grid);
}

function createBoardGrid() {
    var boardHTMLCode = '';
    for (var i = 0; i < ROW; i++) {
        boardHTMLCode += '<div class="btn-group btn-group-sm">';
        for (var j = 0; j < COLUMN; j++) {
            var id = convertRowIntegerToChar(i) + j;
            boardHTMLCode += (
                '<button type="button"'
                + ' id="' + id + '"'
                + ' class="btn tile ' + grid[id].buttonClass + '">' 
                + grid[id].correctLetter + '</button>'
            );
        }
        boardHTMLCode += '</div><br>';
    }
    BOARD_NODE.innerHTML = boardHTMLCode;
}

function createQuestion() {
    var totalQuestion = Object.keys(QUESTION_DICTIONARY).length
    var questionHTMLCode = '';
    for (var i = 1; i <= totalQuestion ; i++){
        questionHTMLCode += (
            "<p>" + QUESTION_DICTIONARY[i].question + "</p>"
        );
    }
    QUESTION_NODE.innerHTML = questionHTMLCode;
}

function createAnswerInput() {
    var totalQuestion = Object.keys(QUESTION_DICTIONARY).length
    var answerHTMLCode = '';
    for (var i = 1; i <= totalQuestion; i++) {
        answerHTMLCode += (
            '<input type="text" id="' + i + '"'
            + ' value="Answer" maxlength="' 
            + QUESTION_DICTIONARY[i].answer.length
            + '" onkeyup="updateInput(this)"> <br>'
        );
    }
    ANSWER_NODE.innerHTML = answerHTMLCode;
}

function updateInput(node) {
    var inputString = node.value.toUpperCase();
    var formID = node.id;
    var row = QUESTION_DICTIONARY[formID].row;
    var col = QUESTION_DICTIONARY[formID].col;
    var isHorizontal = QUESTION_DICTIONARY[formID].isHorizontal;
    console.log("Row : " + row + " col " + col)
    console.log("Input form ID : " + formID);
    console.log("String : " + inputString + " char[0] " + inputString[0]);
    for (var i = 0 ; i < inputString.length ; i++){
        var buttonID = convertRowIntegerToChar(row) + col;
        document.getElementById(buttonID).textContent = inputString[i];
        grid[buttonID].currentLetter = inputString[i];
        console.log(buttonID);
        if (isHorizontal)
            col += 1
        else
            row += 1
    }
}

console.log("Total column : " + COLUMN);
console.log("Total row : " + ROW);
console.log(QUESTION_DICTIONARY[1]);
convertLayoutToGrid();
createBoardGrid();
createQuestion();
createAnswerInput();