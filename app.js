let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turno = true; // true for player O, false for player X
let movesCount = 0; // to track moves for draw condition

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Reset the game to initial state
const resetgame = () => {
    turno = true;
    movesCount = 0; // reset move count
    enableBoxes();
    msgcontainer.classList.add("hide");
};

// Loop through all the boxes and add a click event listener to each one
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Ensure the box isn't already filled
            if (turno) {
                box.innerText = "O"; // Player O
                turno = false;
            } else {
                box.innerText = "X"; // Player X
                turno = true;
            }
            box.disabled = true; // Disable the box after a move
            movesCount++; // Increment move count after each turn
            checkWinner(); // Check for a winner after each move
        }
    });
});

// Show the winner message and disable the game board
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes(); // Disable the board after a win
};

// Disable all boxes after a win
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = ""; // Clear the box text
    });
};

// Check if there's a winner
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return;
        }
    }

    // Check for a draw (when all boxes are filled and no winner)
    if (movesCount === 9) {
        msg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
};

// Event listeners for resetting the game
newgamebtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);
