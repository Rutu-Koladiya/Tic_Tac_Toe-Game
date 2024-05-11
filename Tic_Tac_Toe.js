let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset_btn");
let newGamebtn = document.querySelector("#newGame_btn");
let winner_container = document.querySelector(".winner_container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6], 
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],        
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    winner_container.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = "DSF";
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }    
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    winner_container.classList.remove("hide");
    disableBoxes();
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    winner_container.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);