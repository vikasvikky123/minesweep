/* Please carefully go through this file
   This is the heart of your game.
*/
//globals in one simple object
var GAME = {
    level:0,           // game level chosen by user
    rows: 0,           // rows in game board
    cols: 0,           // columns in gameboard
    bombs: 0,          // total bombs places on game board
    layout: undefined, // the matrix of game containing numbers (-1 = bomb, 0 = blank, number otherwise)
    Cells: undefined,  // the matrix of corresponding table cell dom elements
    openCellCount: 0,  // number of cells opened, used to determine winning condition
    startTime: 0,      // to store time when game starts
    time: 0,           // current time measurement in seconds
    timer: undefined,  // JavaScript timer object to setInterval
    flaggedCells: 0,   // total cells flagged by user
    bestScores: [      // hall of fame static array of objects
        {outcome:false, time:0}, // easy
        {outcome:false, time:0}, // medium
        {outcome:false, time:0}  // hard
    ] 
};

var clearBoard = function () {
    // TODO: remove child nodes of element with id "gameboard"
    // TODO: reset layout to new array
}

var openCell = function (row, col) {
    // get the cell element belonging to that row and column
    var cell = GAME.Cells[row][col];

    // TODO: remove "closed" class and add "open" class to the cell element
    // https://www.w3schools.com/jsref/prop_element_classlist.asp
    
    // TODO: call createBackFaceContent to create the content of cell
    // and append the content to the cell element as a child

    // TODO: increment total cell opened GAME.openCellCount
}

var openBoundary = function (row, col) {
    // INPUT:  row and column of blank cell opened
    // OUTPUT: call openCell for this cell and all cells around it until you hit a open or non blank cell
    // Note:   this will be a recursive methid (backtracking)
    
    // get the cell element belonging to that row and column
    var cell = GAME.Cells[row][col];

    // 1. if invalid row/col or cell is open, simply return
    //    To detect if cell is open, check if it has a class of "open"
    // 2. if it is a non-bomb cell (i.e. GAME.layout[row][col] >= 0) open the cell
    // 3. if it is a blank cell recurse for all eight neighbors
}

var endGame = function () {
    // remove flags and open all cells. Mark incorrectly marked flags
    for (var row = 0; row < GAME.rows; row++) {
        for (var col = 0; col < GAME.cols; col++) {
            var cell = GAME.Cells[row][col]; // fetch the cell dom element
            // if cell has a class of "closed" 
            //      (use contains property of classList method )
            //      https://www.w3schools.com/jsref/prop_element_classlist.asp
            // open the cell that is closed
            // if cell is flagged (check if cell's "marked" attribure is set to "true")
            //      https://www.w3schools.com/jsref/met_element_getattribute.asp
            // then remove the flag (cell.firstchild) by using removeChild method on dom element
            //      https://www.w3schools.com/jsref/met_node_removechild.asp
            // if cell was marked but it does not have a bomb i.e. GAME.layout[row][col] != -1
            // then add "Error" class to the cell's dom element
        }
    }
}

var stopTimer = function () {
    if (GAME.timer) { // timer is not undefined
        //TODO: https://www.w3schools.com/jsref/met_win_clearinterval.asp
        // clear Game.timer interval
    }
}

var updateHallOfFame = function(time, outcome) {
    var timeid = GAME.level + "time";
    var toonid = GAME.level + "toon";

    //
}

var gameOver = function () {
    //TODO: call stopTimer method to end the clock
    updateHallOfFame(elapsedTimeInSeconds(), false);
}

var gameWon = function () {
    stopTimer();
    document.getElementById("toon").className = "gametoon icon-emo-sunglasses";
    updateHallOfFame(elapsedTimeInSeconds(), true);
}

var updateBombsRemaining = function(value) {
    // TODO: set inner text of element with id "bombs" to the value 
    // use exactly 2 places (use leading 0 if single digit)
    // format method is given to you, use it.
}

var handleLeftClick = function (row, col) {
    // if first click, start game
    if(GAME.openCellCount==0) { // if no cell is open yet
        startGame(row, col); // call startGame
    }
    // process clicked cell
    if (validMove(row, col)) { // if user clicked on a closed cell
        if (GAME.layout[row][col] == -1) { // if it is a bomb cell
            //GAME OVER
            endGame(); // call end game as you blasted a bomb
            // make our gametoon unhappy
            document.getElementById("toon").className = "gametoon icon-emo-unhappy";
            // TODO: add "blast" class to the cell having the bomb clicked

            gameOver(); // call gameOver
        } else {
            // open many cells till  boundary
            openBoundary(row, col); // open boundary till you get nonblank cell
            // Note, above will open single cell if it is non blank, can you understand why?
        }
    }

}

var validMove = function (row, col) {
    // TODO: return true if GAME.Cells[row][col] dom element has a class of "closed"
}

var toggleMarkCell = function (row, col, marked) {
    //place flag if not already there else remove it. 
    if (validMove(row, col)) {
        var cell = GAME.Cells[row][col];
        if (marked) {
            // TODO: set "marked" attribute of cell to "false"
            // TODO: remove cell.firstChild from cell
            GAME.flaggedCells--;
        } else {
            // TODO: set "marked" attribute of cell to "true"
            // TODO: create an "i" element and set its "Class" attribute to "red icon-golf"
            //       append that to cell
            GAME.flaggedCells++;
        }
    }
}

// following two methods handle middle click highlight neighbors feature
// see how these are implemented carefully
var indicateNeighbors = function (row, col) {
    var i, j;
    // for all neighboring cells
    for (i = row - 1; i <= row + 1; i++) {
        for (j = col - 1; j <= col + 1; j++) {
            //TODO: if i, j are valid and not the current row/col and the cell is closed
            //      add "indicate" class to cell
            // https://www.w3schools.com/jsref/prop_element_classlist.asp
        }
    }
}

var resetNeighbors = function (row, col) {
    var i, j;
    // for all neighboring cells
    for (i = row - 1; i <= row + 1; i++) {
        for (j = col - 1; j <= col + 1; j++) {
            //TODO: if i, j are valid and not the current row/col and the cell is closed
            //      remove "indicate" class from cell
            // https://www.w3schools.com/jsref/prop_element_classlist.asp
        }
    }
}

var handleMouseEvents = function (mouseButton, row, col, marked) {
    if (mouseButton == 0 && !marked) {
        // process left click (open cell, or boundary or blast bomb if clicked on bomb)
        handleLeftClick(row, col);
    } else if (mouseButton == 1) {
        //middle click
        resetNeighbors(row, col);
    } else if (mouseButton == 2) {
        // put flag
        toggleMarkCell(row, col, marked);
    }

    // we win if we have either opened all cells GAME.openCellCount or marked them GAME.flaggedCells
    // do we know total number of cells in the game
    // TODO: check for winning condition, if true
    //       call gameWon() method
}

var createTD = function (row, col) {
    // https://www.w3schools.com/jsref/met_document_createelement.asp
    var cell;
    // TODO: create "TD" element and set it to cell variable.
    //       Set following attributes on cell:
    //       "row" to value of row passed
    //       "col" to value of col passed
    //       "class" to "closed"
    //       "marked" to "false"
    
    //attach mouse button up event handler
    cell.onmouseup = function (event) {
        // make toon happy again
        document.getElementById("toon").className = "gametoon icon-emo-happy";
        // event.button tells which mouse button is clicked 0 = left, 1 = middle and 2 = right
        // we also pass row and col as well as marked attribute of the cell
        // see the handleMouseEvents method for more.
        handleMouseEvents(event.button,
            parseInt(cell.getAttribute("row")),
            parseInt(cell.getAttribute("col")),
            cell.getAttribute("marked") == 'true'
        );
    };

     //attach mouse button down event handler
    cell.onmousedown = function (event) {
        if (event.button == 0) { // left button down
            // make toon surprised
            document.getElementById("toon").className = "gametoon icon-emo-surprised";
        } else if (event.button == 1) { // middle button
            // highlight neighboring cells
            indicateNeighbors(
                parseInt(cell.getAttribute("row")),
                parseInt(cell.getAttribute("col"))
            );
        }
        //NOTE: return false is important, otherwise default middle click behavior will happen
        return false;
    }
    //disable context menu (default right click behavior)
    cell.oncontextmenu = function () { return false; }

    return cell;
}

// see how this method is implemented. It creates the content for the cell
// that you are opening
var createBackFaceContent = function (row, col) {
    var content;

    if (GAME.layout[row][col] == -1) { // if bomb
        content = document.createElement("i");
        content.setAttribute("class", "icon-bomb");
    
    } else if (GAME.layout[row][col] > 0) { // if number
        content = document.createElement("span");
        content.setAttribute("class", "font-" + GAME.layout[row][col]);
        content.appendChild(document.createTextNode(GAME.layout[row][col]));
    
    } else {  //blank
        content = document.createTextNode('');
    }

    return content;
}


// write a function that returns a random integer between min(inclusive) and max(exclusive)
var randomInt = function (min, max) {
    //TODO: see https://www.w3schools.com/js/js_random.asp
}

// this is implemented for you already
var setBoardParams = function (level) {
    GAME.level = level;
    GAME.markedCorrect = 0;
    GAME.openCellCount = 0;
    GAME.score = 0;
    GAME.time = 0;
    if (level == 'easy') {
        GAME.rows = GAME.cols = 9;
        GAME.bombs = 10;
    } else if (level == 'medium') {
        GAME.rows = GAME.cols = 16;
        GAME.bombs = 40;
    } else {
        GAME.rows = 16; GAME.cols = 30;
        GAME.bombs = 99;
    }
}

// helper method to create and fill an n-dimensional arry with 0s
function zeros(dimensions) {
    var array = [];
    // please read: https://www.w3schools.com/js/js_arrays.asp
    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }

    return array;
}

// next three methods create the board
// http://www.geeksforgeeks.org/zoho-campus-drive-set-24-software-developer/
// see round 3/4
// you are learning to do something useful for your recruitment!

var updateNeighborCounts = function (row, col) {
    var i, j;
    // TODO: for each neighborning non-bomb cell increment its value by 1
    // GAME.layout is a 2D array containing the values all initialized to 0 initially
}

// randomly place bombs
var setBombs = function (row, col) {
    // create 2D zero matrix
    GAME.layout = zeros([GAME.rows, GAME.cols]);

    var i, j;
    // place bombs
    for (var count = 0; count < GAME.bombs; count++) {
        //TODO: get random row/col using randomInt method you wrote earlier
        //NOTE: 1. check for duplicates, you should not place bomb in a location already having a bomb
        //      2. you cannot place a bomb in clicked row/col (passed variables) or in their immediate neighbors
        //      3. to place bomb you set corresponmding GAME.layout[i][j] to -1
        //      4. call updateNeighborCounts(i, j); if you place a bomb in ith row and jth column
    }
}

var createBoard = function () {
    // create a new array for holding cell dom elements
    GAME.Cells = new Array();
    // remove any existing board
    clearBoard();
    updateBombsRemaining(GAME.bombs);
    var gameboard = document.getElementById("gameboard"); // get div element for gameboard
    var table = document.createElement("table"); // create table element
    gameboard.appendChild(table); // add it to the div

    //clear its contents
    gameboard.className += " active"; // make the gameboard active
    // https://www.w3schools.com/jsref/prop_html_classname.asp
    
    // add rows
    for (var row = 0; row < GAME.rows; row++) {
        var gamerow = document.createElement("TR"); // add TR element
        var gRow = new Array();
        for (var col = 0; col < GAME.cols; col++) {
            var gamecell = createTD(row, col); // create our TD element to place in Row
            gamerow.appendChild(gamecell); // append it to DOM
            gRow.push(gamecell); // store it in our JavaScript array as well, so that we can handle all
                                 // dom events on it easily
        }
        table.appendChild(gamerow); // append row to dom
        GAME.Cells.push(gRow); // add the row to our 2D array
    }
}

// helper method to format a number to specific number of places
// e.g. format(1, 3) will give 001
// we consider that y will be max 10 so we prepend 9 0s and then slice
// https://www.w3schools.com/jsref/jsref_slice_array.asp
var format = function (x, y) {
    return ("000000000" + x).slice(-y);
}

// start the game
var startGame = function(row, col) {
    setBombs(row, col); // set bombs
    startTimer(); // start timer
}

var getFormattedTime = function(timeInSeconds) {
    // TODO: given time in seconds return formatted time, e.g.
    //       178 seconds = 00:02:58
}

// get elapsed time in seconds, see how it is implemented
var elapsedTimeInSeconds = function() {
    var x = new Date();
    return Math.floor((x - GAME.startTime) / 1000);
}

var startTimer = function () {
    if (GAME.timer) {
        clearInterval(GAME.timer);
    }
    //https://www.w3schools.com/js/js_dates.asp
    GAME.startTime = new Date();
    //https://www.w3schools.com/jsref/met_win_setinterval.asp
    GAME.timer = setInterval(function () {
        document.getElementById("timer").innerText = getFormattedTime(elapsedTimeInSeconds());
    }, 700); // can you figure why 700 milliseconds when we want to udate clock every second?
}

// create game
var createGame = function (level) {
    stopTimer();
    setBoardParams(level);
    createBoard();
}

// This is for animation of rules and hallof fame. Notice how it works carefully
// some globals to be used
var animateTimeout;
var animateId;

var slideInDiv = function(id) {
    var rules = document.getElementById(id);
    // can you tell why below line is there?
    if(animateTimeout && animateId==id) clearTimeout(animateTimeout);
    // this method is called on mousehover in game.html
    // we are using CSS3 based animations!
    rules.className = "slidein";
}

var slideOutDiv = function(id) {
    var rules = document.getElementById(id);
    rules.className = "slideout";
    animateId = id;
    // hide the element after the animation is over (i.e. 1 second)
    animateTimeout = setTimeout(function() {
        rules.className = "hidden";
    }, 1000);
}