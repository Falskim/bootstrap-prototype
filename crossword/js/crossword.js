//              JAVASCRIPT CROSSWORD GAME           //
//          CREATED BY FAWWAZ SYIHAM MUYASSAR       //
//                     1177050044                   //

class Tile {
    constructor(letter) {
        this.isEmpty = letter == '-';
        this.correctLetter = letter;
        this.currentLetter = ' ';
    }

    isCorrect() {
        return this.currentLetter == this.correctLetter || this.isEmpty;
    }
}

class QuestionAnswer {
    constructor(question, answer, gridPosition, isHorizontal) {
        this.question = question;
        this.answer = answer;
        this.row = gridPosition[0];
        this.col = gridPosition[1];
        this.isHorizontal = isHorizontal;
    }
}

// BUTTON STYLE
const BUTTON_STYLE_ACTIVE = 'btn tile button btn-primary';
const BUTTON_STYLE_INACTIVE = 'btn tile button btn-outline-primary';
const BUTTON_STYLE_DISABLED = 'btn tile button btn-success disabled';
const BUTTON_STYLE_WRONG = 'btn tile button btn-danger';
const BUTTON_STYLE_TEST = 'btn tile button btn-warning'

// index.html RELATED VARIABLE
const BOARD_NODE = document.getElementById("board");
const QUESTION_NODE = document.getElementById("question");
const ANSWER_NODE = document.getElementById("answer");
const CLUE_NODE = document.getElementById("clue");

// CROSSWORD GLOBAL VARIABLE
const LAYOUT = [
//    0    1    2    3    4    5    6    7
    ['A', 'Y', 'A', 'M', '-', 'B', 'I', 'S'], // 0
    ['K', '-', 'P', '-', '-', 'A', '-', '-'], // 1
    ['A', '-', 'I', 'K', 'A', 'N', '-', '-'], // 2
    ['L', '-', '-', 'U', '-', '-', '-', '-'], // 3
    ['-', 'B', 'A', 'D', 'A', 'K', '-', '-'], // 4
    ['-', '-', '-', 'A', '-', 'U', '-', '-'], // 5
    ['-', '-', '-', '-', '-', 'N', 'O', '-'], // 6
    ['-', '-', '-', '-', '-', 'O', '-', '-'] // 7
];

const QUESTION_DICTIONARY = {
    1: new QuestionAnswer(
        "Unggas", "AYAM",
        [0, 0], true
    ),
    2: new QuestionAnswer(
        "Panas", "API",
        [0, 2], false
    ),
    3: new QuestionAnswer(
        "Binatang Laut", "IKAN",
        [2, 2], true
    ),
    4: new QuestionAnswer(
        "Komponen Kendaraan", "BAN",
        [0, 5], false
    ),
    5: new QuestionAnswer(
        "Hewan Berkaki 4", "KUDA",
        [2, 3], false
    ),
    6: new QuestionAnswer(
        "Bercula", "BADAK",
        [4, 1], true
    ),
    7: new QuestionAnswer(
        "Senjata Yang Hanya Dimiliki Manusia", "AKAL",
        [0, 0], false
    ),
    8: new QuestionAnswer(
        "Jadul", "KUNO",
        [4, 5], false
    ),
    9: new QuestionAnswer(
        "Transportasi", "BUS",
        [0, 5], true
    ),
    10 : new QuestionAnswer(
        "Yesn't", "NO",
        [6, 5], true
    )
};

const ROW = LAYOUT.length;
const COLUMN = LAYOUT[0].length;

var grid = {};
var currentActiveLine = [];
var score = 0;

var currentSelectedQuestionId = 1;

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
            var button_style = grid[id].isEmpty ? BUTTON_STYLE_DISABLED : BUTTON_STYLE_INACTIVE;
            boardHTMLCode += (
                '<button type="button"'
                + ' id="' + id + '"'
                + ' class="' + button_style + '">'
                + grid[id].correctLetter + '</button>'
            );
        }
        boardHTMLCode += '</div><br>';
    }
    BOARD_NODE.innerHTML = boardHTMLCode;
}

function clearGridContent() {
    for (var i = 0; i < Object.keys(grid).length; i++) {
        changeTileValue(Object.keys(grid)[i], ' ');
    }
}

function changeTileValue(tileID, value) {
    document.getElementById(tileID).textContent = value;
    grid[tileID].currentLetter = value;
}


function createQuestion() {
    var totalQuestion = Object.keys(QUESTION_DICTIONARY).length
    var questionHTMLCode = '';
    for (var i = 1; i <= totalQuestion; i++) {
        var x = "lmao";
        questionHTMLCode += (
            '<p class="font-monospace question"'
            + 'id="'+ i + '"'
            + 'onclick="changeSelectedQuestion(this)">' 
            + i + ". " + QUESTION_DICTIONARY[i].question + '</p>'
        );
    }
    QUESTION_NODE.innerHTML = questionHTMLCode;
}

function createAnswerInput() {
    var answerLength = 5;
    var answerHTMLCode = (
            '<input type="text"' 
            + ' id="answerForm"'
            + ' value="Answer"' 
            + ' class="text-center"'
            + ' onkeyup="updateInput(this)"'
            + ' onfocus="clearForm(this)"><br>'
    );
    ANSWER_NODE.innerHTML = answerHTMLCode;
}

function changeSelectedQuestion(elem) {
    currentSelectedQuestionId = elem.id;
    var answerForm = document.getElementById("answerForm");
    answerForm.focus();
    var wordLength = QUESTION_DICTIONARY[currentSelectedQuestionId].answer.length;
    answerForm.maxlength = wordLength;
    var clueHTMLCode = wordLength + '  Letters';
    CLUE_NODE.innerHTML = clueHTMLCode;
    
}

function updateInput(node) {
    var answerForm = document.getElementById("answerForm");
    var inputString = node.value.toUpperCase();
    if (inputString.length > answerForm.maxlength) return;
    var formID = currentSelectedQuestionId;
    var row = QUESTION_DICTIONARY[formID].row;
    var col = QUESTION_DICTIONARY[formID].col;
    var isHorizontal = QUESTION_DICTIONARY[formID].isHorizontal;
    // console.log("Anwer : " + QUESTION_DICTIONARY[formID] + " , length : " + QUESTION_DICTIONARY[formID].answer.length);
    console.log("Row : " + row + " col " + col)
    console.log("Input form ID : " + formID);
    console.log("String : " + inputString + " char[0] " + inputString[0]);
    for (var i = 0; i < inputString.length; i++) {
        var buttonID = convertRowIntegerToChar(row) + col;
        changeTileValue(buttonID, inputString[i]);
        console.log(buttonID);
        isHorizontal ? col += 1 : row += 1;
    }
}

// R.I.P CODE
function highlightGrid(node) {
    disableHightlight();
    var formID = currentSelectedQuestionId;
    var row = QUESTION_DICTIONARY[formID].row;
    var col = QUESTION_DICTIONARY[formID].col;
    var wordLength = QUESTION_DICTIONARY[formID].answer.length;
    var isHorizontal = QUESTION_DICTIONARY[formID].isHorizontal;
    currentActiveLine = [];
    for (var i = 0; i < wordLength; i++) {
        var buttonID = convertRowIntegerToChar(row) + col;
        currentActiveLine.push(buttonID);
        console.log("Pushing : " + buttonID);
        document.getElementById(buttonID).className = BUTTON_STYLE_ACTIVE;
        isHorizontal ? col += 1 : row += 1;
    }
    console.log("Current active Line Length : " + currentActiveLine.length);
}


function disableHightlight() {
    if (currentActiveLine == []) return;
    console.log("Active Line : ");
    for (var i = 0; i < currentActiveLine.length; i++) {
        console.log(currentActiveLine[i]);
        document.getElementById(currentActiveLine[i]).className = BUTTON_STYLE_INACTIVE;
    }
}

function clearForm(node) {
    node.value = '';
    highlightGrid(node);
}

var changedTile = [];
var revertedGrid

function checkAnswer() {
    disableHightlight();
    var allAnswered = true;
    score = 0;
    for (var i = 0; i < Object.keys(grid).length; i++) {
        var currentCheckedGrid = grid[Object.keys(grid)[i]];
        if (currentCheckedGrid.isEmpty) continue;
        if (!currentCheckedGrid.isCorrect()) {
            allAnswered = false;
            console.log("Grid array-" + i + " incorrect")
            console.log("Required : '" + currentCheckedGrid.correctLetter
                + "', current answer : '" + currentCheckedGrid.currentLetter + "'")
            document.getElementById(Object.keys(grid)[i]).className = BUTTON_STYLE_WRONG;
            changedTile.push(Object.keys(grid)[i]);
        } else {
            score += 100;
        }
    }
    allAnswered ? alertCorrect() : alertWrong();
    revertedGrid = setTimeout(revertClassStyle, 2000);
}


function revertClassStyle(){
    var tiles = changedTile;
    for (var i = 0; i < tiles.length; i++){
        document.getElementById(tiles[i]).className = BUTTON_STYLE_INACTIVE;
    }
}

// Sweet Alert
function alertCorrect() {
    Swal.fire({
        type: 'success',
        title: 'Congratulation',
        text: 'All Question Has Been Answered',
        footer: 'Score : ' + score
    })
}

function alertWrong() {
    Swal.fire({
        type: 'error',
        title: 'Try Again',
        text: 'There Are Still Some Mistakes',
        footer: 'Score : ' + score
    })
}
// End Sweet Alert


console.log("Total column : " + COLUMN);
console.log("Total row : " + ROW);
convertLayoutToGrid();
createBoardGrid();
clearGridContent();
createQuestion();
createAnswerInput();