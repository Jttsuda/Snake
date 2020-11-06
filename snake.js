{
    const grid = document.getElementById("snake-grid");
    for(let i=0; i<400; i++){ grid.innerHTML += "<div></div>"; }
    const squares = document.querySelectorAll("#snake-grid div");
    let foodPosition = Math.floor(Math.random() * squares.length);
    const score = document.querySelector("#snake-score span");
    const ateYourself = document.getElementById("ate-yourself");
    const width = 20;
    const height = 20;
    const highScore = document.querySelector("#high-score span");
    let moveTimer;
    let currentPosition = 210;
    let snakeSpeed = 80;//ms interval
    let character = [0];
    let trail = [];


    // NewGameButton
    document.getElementById("new-game-button").onclick = function(){
        ateYourself.innerHTML = "";
        ateYourself.style.backgroundColor = "";
        ateYourself.style.display = "none";
        clearInterval(moveTimer);
        removeSnake();
        score.innerHTML = 1;
        currentPosition = 210;
        character = [0];
        trail = [0];
        drawSnake();
    }


    // Snake/Trail -- Draw/Remove
    function drawSnake(){
        if(trail.length > 200) { trail.splice(0, 100); }//Slimming Down the trail Array
        squares[currentPosition].classList.add("snake");
        // Drawing The Trail
        for(let i=2; i <= character.length; i++){
            let newTrail = trail[trail.length - i];
            squares[newTrail].classList.add("snake");
        }
    }
    drawSnake();
    function removeSnake(){
        squares[currentPosition].classList.remove("snake");
        // Removing The Trail
        for(let i=2; i <= character.length; i++){
            let newTrail = trail[trail.length - i];
            squares[newTrail].classList.remove("snake");
        }
    }


    // Food -- Draw/Remove/Eat
    function drawFood(){
        let colTest = squares[foodPosition].classList.contains("snake");
        if(colTest){
            foodPosition = Math.floor(Math.random() * squares.length);
            drawFood();
        }
        if(!colTest) squares[foodPosition].classList.add("food");
    }
    drawFood();
    function removeFood(){
        squares[foodPosition].classList.remove("food");
    }
    function eatFood(){
        if(squares[currentPosition].classList.contains("food")){
            removeFood();
            character.push(character.length);
            foodPosition = Math.floor(Math.random() * squares.length);
            document.querySelector("#snake-score span").innerHTML = character.length;
            drawFood();
        }
    }


    // ArrowKeys
    document.addEventListener("keydown", arrowKeys);
    function arrowKeys(e){
        if(e.key === "ArrowUp" && ateYourself.innerHTML === "") arrowUp();
        if(e.key === "ArrowRight" && ateYourself.innerHTML === "") arrowRight();
        if(e.key === "ArrowLeft" && ateYourself.innerHTML === "") arrowLeft();
        if(e.key === "ArrowDown" && ateYourself.innerHTML === "") arrowDown();
    }
    function arrowUp(){
        if(currentPosition > width - 1){
            clearInterval(moveTimer);
            moveTimer = setInterval(moveUp, snakeSpeed);
            function moveUp(){
                if(currentPosition > width - 1){
                    // Checking for EndGame
                    if(squares[currentPosition - width].classList.contains("snake")){
                        endGame();
                    }
                    removeSnake();
                    currentPosition -= width;
                    trail.push(currentPosition);
                    drawSnake();
                    eatFood();
                }
            }
        }
    }
    function arrowRight(){
        if((currentPosition + 1) % width != 0){
            clearInterval(moveTimer);
            moveTimer = setInterval(moveRight, snakeSpeed);
            function moveRight(){
                if((currentPosition + 1) % width != 0){
                    // Checking for EndGame
                    if(squares[currentPosition + 1].classList.contains("snake")){
                        endGame();
                    }
                    removeSnake();
                    currentPosition += 1;
                    trail.push(currentPosition);
                    drawSnake();
                    eatFood();
                }
            }
        }
    }
    function arrowLeft(){
        if(currentPosition % width !== 0){
            clearInterval(moveTimer);
            moveTimer = setInterval(moveLeft, snakeSpeed);
            function moveLeft(){
                if(currentPosition % width !== 0){
                    // Checking for EndGame
                    if(squares[currentPosition - 1].classList.contains("snake")){
                        endGame();
                    }
                    removeSnake();
                    currentPosition -= 1;
                    trail.push(currentPosition);
                    drawSnake();
                    eatFood();
                }
            }
        }
    }
    function arrowDown(){
        if(currentPosition < width*height - width){
            clearInterval(moveTimer);
            moveTimer = setInterval(moveDown, snakeSpeed);
            function moveDown(){
                if(currentPosition < width*height - width){
                    // Checking for EndGame
                    if(squares[currentPosition + width].classList.contains("snake")){
                        endGame();
                    }
                    removeSnake();
                    currentPosition += width;
                    trail.push(currentPosition);
                    drawSnake();
                    eatFood();
                }
            }
        }
    }


    // Final Collision Check
    function endGame(){
        clearInterval(moveTimer);
        ateYourself.innerHTML = "Snake Ate Itself!";
        ateYourself.style.backgroundColor = "black";
        ateYourself.style.display = "block";
        if(character.length > highScore.innerHTML){
            let newScore = character.length;
            highScore.innerHTML = newScore;
        }
    }


}