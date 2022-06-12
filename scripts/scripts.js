options = ["Rock","Paper","Scissors"];
let roundN=1;
let user1Points=0;
let user2Points=0;
let maxRounds=5;

let buttons = document.querySelectorAll('.button');
let userPoints = document.getElementById('userpoints');
let pcPoints = document.getElementById('pcpoints');
let round = document.getElementById('roundnumber');
let fightvisual = document.querySelector('.fightvisual');
let fightBox =  document.querySelector('.fight');

fightvisual.addEventListener('animationend', (e) => {
    fightvisual.classList.remove('fightanimation');
    fightBox.classList.remove('fightanimation');
})

buttons.forEach( button =>{
    button.addEventListener('click', () => {
        //console.log(button.id);
        if (roundN<=maxRounds) game(button.id);
    });
});

updatePoints(1,0,0)



function newGame(){
    document.querySelector('.buttons').style.display = 'flex';
    fightBox.classList.remove('gameover');
    updatePoints(1,0,0)
    updateMsg('','')
    roundN=1;
    user1Points=0;
    user2Points=0;
}


function retryButton(){
    document.querySelector('.buttons').style.display = 'none';
    let button = document.createElement('button');
    button.id = 'retry';
    button.textContent = 'Try again!';
    button.classList.add('button');
    document.querySelector('.container').appendChild(button);
    button.addEventListener('click',() => {
        document.querySelector('.container').removeChild(button);
        newGame();
    });
}


function updatePoints(roundn,userpoints, pcpoints){
    let isWinner;
    if (userpoints > pcpoints){ 
        isWinner='WINNER';
        userPoints.style.color='blue';
        pcPoints.style.color='red';
    }
    else{
        isWinner='LOOSER';
        userPoints.style.color='red';
        pcPoints.style.color='blue';
    }
    userPoints.textContent = 'Your points: '+userpoints;
    pcPoints.textContent = 'Computer points: '+ pcpoints;
    if (roundn>maxRounds){
        roundn = "-";
        if(isWinner=='WINNER'){
            fightBox.style.color='blue';
        }
        else{
            fightBox.style.color='red';
        }
        updateMsg('','END OF GAME - '+isWinner)
        fightBox.classList.add('gameover');
        retryButton();
    }
    round.textContent ='Round: '+roundn;    
}


function updateMsg(visual='',msg=''){
    fightvisual.classList.add('fightanimation');
    fightBox.classList.add('fightanimation');
    fightvisual.textContent=visual;
    fightBox.textContent = msg;
}


function text2emoji(text){
    switch(text){
        case 'Rock':
            return '✊';
        case 'Paper':
            return '✋';
        case 'Scissors':
            return '✌️';
        default:
            return '';
    }
}


function game(userChoice){

    function generateRandom(min = 0, max = 100){
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor(rand * difference);

        rand = rand + min;      
        if(rand >= max){
            rand = max - 1;
        }

        return rand;
    }


    function randomChoice(){
        let choice = options[generateRandom(0,3)];
        //console.log(choice);
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
                roundN++;
        }

        else if (choice1 === "Paper" && choice2 === "Rock"
            || choice1 === "Scissors" && choice2 === "Paper"
            || choice1 === "Rock" && choice2 === "Scissors"){
                winner = choice1;
                looser = choice2;

                user1Points++;
                roundN++;
        }

        let results = "";
        let fightVisual="";
        let emoji1 = text2emoji(choice1);
        let emoji2 = text2emoji(choice2);

        if(choice1===choice2){
            results = `${choice1} vs ${choice2}...Tie!`;
            fightVisual = `${emoji1} === ${emoji2}`;
            fightBox.style.color='black';
        }
        else{
            results = `${winner} beats ${looser}!`;
            if (winner === choice1){
                results+=" You Win!";
                fightBox.style.color='blue';
                fightVisual = `${emoji1} >>> ${emoji2}`;
            }
            else{
                results+=" You Lost!";
                fightBox.style.color='red';
                fightVisual = `${emoji1} <<< ${emoji2}`;
            }
        }
        updateMsg(fightVisual,results);
        updatePoints(roundN,user1Points,user2Points)
        //console.log(results);
    }




    let choice1 = userChoice;
    let choice2 = randomChoice();

    evalChoices(choice1,choice2);

}
