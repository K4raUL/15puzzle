var cnv, ctx, cw, ch;
var csize, N;           // cell size in pixels; N size of board N*N
var board = [];
var zerow;              // empty cell row number
var zercol;             // empty cell column number
var moves;              // move counter

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function (e) {
    var code = e.keyCode;
    if (code == 38 || code == 87) moveUp();          // arrow up    or W key
    else if (code == 37 || code == 65) moveLeft();   // arrow left  or A key
    else if (code == 40 || code == 83) moveDown();   // arrow down  or S key
    else if (code == 39 || code == 68) moveRight();  // arrow right or D key
}, false);

function init()
{
    cnv = document.getElementById("cnv");
    N = Number(document.getElementById("Nval").value);
    csize = ~~(cnv.width/N);                            // integer division (calculating single cell size)
    
    // making canvas width and height = 0 mod N
    cw = csize*N;
    ch = cw;
    cnv.width = cw;
    cnv.height = ch;
    
    ctx = cnv.getContext("2d");
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle";
    
    csize -= 1;         // !!!! needed cause of context.translate
    moves = 0;
    document.getElementById("counter").innerHTML = 0;
    
    board = new Array(N*N);
    for (var i = N*N-2; i != -1; i--) board[i] = i+1;
    board[N*N-1] = 0;
    
    // draw new game
    drawBoard();
    do shuffleArray(board);
    while (hasSolution() != 1);
    drawNumbers();
}

function validateN(val)
{
    if (Number.isNaN(val)) document.getElementById("Nval").value = 4;
    else {
        if (val < 3) document.getElementById("Nval").value = 3;
        else if(val > 8) document.getElementById("Nval").value = 8;
    }
}

// ++++++++++++++++++++++++++++++++++++++++++++++ Drawing related ++++++++++++++++++++++++++++++++++++++++++++++

function drawBoard()
{
    ctx.translate(0.5, 0.5);            // needed for lines of "normal" width
    ctx.beginPath();
    ctx.lineWidth = 1;
    
    for (var i = 0; i != N; i++)
        for (var j = 0; j != N; j++)
            ctx.strokeRect(i*csize, j*csize, csize, csize);
            
    ctx.stroke();
}

function drawNumbers()
{
    var row, col;
    for (var i = 0; i != N*N; i++) {
        col = ~~(i/N) * csize;
        row = i%N * csize;

        if (board[i] == 0) {               // "empty" cell
            ctx.fillStyle = 'lightgray';
            ctx.fillRect(row+1, col+1, csize-2, csize-2);
        }
        else {
            ctx.fillStyle = 'white';
            ctx.fillRect(row+1, col+1, csize-2, csize-2);

            ctx.fillStyle = 'blue';
            ctx.font = 15/N + "vh Arial";
            ctx.fillText(board[i], row+csize/2, col+csize/2);       // text must be at cell center
        }
    }
}

function redraw()
{
    drawNumbers();
    document.getElementById("counter").innerHTML = moves;

    if (isSolved()) {
        alert("SOLVED!");
        init();
    }
}

function speedUp()
{

}

function speedDown()
{

}

// ++++++++++++++++++++++++++++++++++++++++++++++ Algorithm related ++++++++++++++++++++++++++++++++++++++++++++++

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Calculate number of inversions in shuffled array
function inversions(array)
{
    var a = array.slice();      // copy array by value; simple assignment returns reference to the same array
    var inv = 0, current;
    zerow = N-1;
    zercol = N-1;

    for (var i = 0; i != N*N-1; ++i) {
        current = a[i];
        if (current == 0) {
            zerow  = ~~(i/N);
            zercol = i%N;
            continue;
        }
        inv += current-1;
        for (var j = i+1; j != N*N; ++j) {
            if (current < a[j]) --a[j];
        }
    }
    return inv;
}

// Check if initial position can be solved
function hasSolution()
{
    var inv = inversions(board);
    if (N&1)    return !(inv&1);
    else        return (inv+zerow)&1;
}

// Check if current board state is correct solution
function isSolved()
{
    for (var i = 0; i != N*N-1; ++i)
        if (board[i] != i+1) return false;
    if (board[N*N-1] != 0) return false;
    return true;
}

// solve puzzle automatically step by step
function solve()
{

}

// ++++++++++++++++++++++++++++++++++++++++++++++ I/O processing ++++++++++++++++++++++++++++++++++++++++++++++
function checkInput()
{
    
}

function moveUp()
{
    if (zerow == N-1) return;
    board[zerow*N + zercol] = board[(zerow+1)*N + zercol];
    zerow++;
    board[zerow*N + zercol] = 0;

    moves++;
    redraw();
}

function moveLeft()
{
    if (zercol == N-1) return;
    board[zerow*N + zercol] = board[zerow*N + zercol + 1];
    zercol++;
    board[zerow*N + zercol] = 0;

    moves++;
    redraw();
}

function moveDown()
{
    if (zerow == 0) return;
    board[zerow*N + zercol] = board[(zerow-1)*N + zercol];
    zerow--;
    board[zerow*N + zercol] = 0;

    moves++;
    redraw();
}

function moveRight()
{
    if (zercol == 0) return;
    board[zerow*N + zercol] = board[zerow*N + zercol - 1];
    zercol--;
    board[zerow*N + zercol] = 0;

    moves++;
    redraw();
}
