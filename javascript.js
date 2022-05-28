options = ["Rock","Paper","Scissors"];


function game(rounds=5){

    function generateRandom(min = 0, max = 100){
        //find diff
        let difference = max - min;
    
        //generate random number
        let rand = Math.random();
    
        //multiply with difference
        rand = Math.floor(rand * difference);
    
        //add with min value
        rand = rand + min;
        
        //in the very improbable case of receiving max value, change it to max-1 since we are using it with arrays and want to have a good prob of getting higher vals
        if(rand >= max){
            rand = max - 1;
        }
    
        return rand;
    }
    
    function randomChoice(){
        let choice = options[generateRandom(0,3)];
        console.log(choice);
        return choice;
    }
    
    function userChoiceNumber(invalidInput=false){
        //console.log(invalidInput);
        let choice;
        if (invalidInput===false){
            choice = Number(prompt("Return 1 for Rock, 2 for Paper or 3 For Scissors"));
        }
        else{
            choice = Number(prompt("Invalid input. Return 1 for Rock, 2 for Paper or 3 For Scissors"));
        }
        if (isNaN(choice) || choice<0 || choice > 3){
            //console.log(choice);
            userChoiceNumber(true);
            return;
        }
        choice = options[choice-1];
        console.log(choice);
        return choice;
    }
    
    function userChoiceWord(invalidInput=false){
        let choice;
        if (invalidInput) {
            choice = prompt(`Round ${roundN}\nInvalid input. Write Rock, Paper or Scissors to select`);
        }
        else{
            choice = prompt(`Round ${roundN}\nWrite Rock, Paper or Scissors to select`);
        }
        choice = choice.trim().replace(/\s/g, '');
        choice = choice.charAt(0).toUpperCase()+choice.slice(1).toLowerCase();
        console.log(choice);
        if (choice != "Rock" && choice != "Paper" && choice != "Scissors"){
            choice=userChoiceWord(true);
        }
        return choice;
    }
    
    function evalChoices(choice1,choice2){
        let winner = '';
        let looser = '';
    
        if (choice1 === "Rock" && choice2 === "Paper"
            || choice1 === "Paper" && choice2 === "Scissors"
            || choice1 === "Scissors" && choice2 === "Rock"){
                winner = choice2;
                looser = choice1;
    
                user2Points++;
        }
    
        else if (choice1 === "Paper" && choice2 === "Rock"
            || choice1 === "Scissors" && choice2 === "Paper"
            || choice1 === "Rock" && choice2 === "Scissors"){
                winner = choice1;
                looser = choice2;
    
                user1Points++;
    }
    
        let results = "";
    
        if(choice1===choice2){
            results = `${choice1} vs ${choice2}...Tie!`;
        }
        else{
            results = `${winner} beats ${looser}!`;
            if (winner === choice1){
                results+=" You Win!";
            }
            else{
                results+=" You Lost!";
            }
        }
        console.log(results);
    }

    let user1Points=0;
    let user2Points=0;
    let choice1;
    let choice2;
    let roundN=1;
    while (true){
        //let choice1 = userChoiceNumber();
        choice1 = userChoiceWord();
        choice2 = randomChoice();

        evalChoices(choice1,choice2);
        if (user1Points>=rounds || user2Points>=rounds){
            break;
        }
        roundN++;
    }

    console.log(`END OF GAME,\n${roundN} Rounds\nUser 1 Points: ${user1Points}\nUser 2 Points: ${user2Points}`);

}

game();
