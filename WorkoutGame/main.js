let clicks = 0;
let highScore = 0;
let time = 5;
let overallLifts = 0;
let timer;
let isStart = false;
let rest = true;
let clickMultiplier = 0;
let endurance = 0;
let totalShots = 0;
let adrenalineUsed = false;

// DOM ELEMENTS
const highestScore = document.getElementById("highestScore");
const liftedWeights = document.getElementById("liftedWeights");
const timeCounter = document.getElementById("timeCounter");
const overallLifts_Text = document.getElementById("overallLifts");
const clickMultiplier_Text = document.getElementById("clickMultiplier");
const addedEndurance = document.getElementById("addedEndurance");
const totalAdrenaline = document.getElementById("totalAdrenaline");


// Game Functions
function Click(){

    // Check to see if the user has rested, if not break.
    if(!rest)
    {
        return;
    }

    clicks++;

    if(!adrenalineUsed)
    {
        clicks = clicks + clickMultiplier;
    }
    else
    {
        clicks = clicks + clickMultiplier * 2;
    }

    // If statement if there's a timer for 5 seconds.
    if(isStart == false)
    {
        // start the timer
        isStart = true;
        addedTime = endurance * 1000;
        setTimeout(gameOver, 5000 + addedTime);

        // edit the a time counter.
        timer = setInterval(editTimeCounter, 1000);
    }

    // Change the text
    liftedWeights.innerHTML = "Weights Lifted: " + clicks;
}

function gameOver(){
    // end the timer, and see if the highest score is the same.
    clearInterval(timer);
    adrenalineUsed = false;
    liftedWeights.innerHTML = "STARTING REST PERIOD MOMENTARILY";
    let currentClickRound = clicks;
    time = 5 + endurance;
    timeCounter.innerHTML = "Time Left: " + time + "s";
    clicks = 0;
    isStart = false;

    if(currentClickRound > highScore){
        highScore = currentClickRound;
        highestScore.innerHTML = "Current Highest Score: " + currentClickRound;
    }

    overallLifts = overallLifts + currentClickRound;
    overallLifts_Text.innerHTML = "Overall Lifts Weighed: " + overallLifts;
    // start rest
    rest = false;
    setTimeout(startRest, 1000);
}

function startRest(){
    rest = true;
    liftedWeights.innerHTML = "Weights Lifted: 0";
}

function editTimeCounter(){
    time--;
    timeCounter.innerHTML = "Time Left: " + time + "s";
}


// Shop Buys
function BuyClickMultiplier(){
    if(canBuy(50) == true)
    {
        // allow purchase
        console.log("you can buy");
        clickMultiplier++;
        clickMultiplier_Text.innerHTML = "Click Multiplier: " + clickMultiplier;
    }
    else
    {
        // disallow purchase
        console.log("you cannot buy");
    }
}

function BuyEndurance(){
    if(canBuy(150) == true)
    {
        // allow purchase
        console.log("you can buy");

        if(endurance < 5)
        {
            endurance++;
            time = 5 + endurance;
        }
        else
        {
            overallLifts = overallLifts + 150;
            overallLifts_Text.innerHTML = "Overall Lifts Weighed: " + overallLifts;
        }

        timeCounter.innerHTML = "Time Left: " + time + "s";
        addedEndurance.innerHTML = "Added Endurance: " + endurance;
    }
    else
    {
        // disallow purchase
        console.log("you cannot buy");
    }
}

function BuyAdrenaline(){
    if(canBuy(200) == true)
        {
            // allow purchase
            console.log("you can buy");
            totalShots++;
            totalAdrenaline.innerHTML = "Total Adrenaline Shots: " + totalShots;
        }
        else
        {
            // disallow purchase
            console.log("you cannot buy");
        }
}


function adrenalineUse(){
    if(adrenalineUsed)
    {
        return;
    }
    totalShots--;
    totalAdrenaline.innerHTML = "Total Adrenaline Shots: " + totalShots;
    adrenalineUsed = true;
}


function canBuy(purchaseAmount){
    if(overallLifts >= purchaseAmount){
        overallLifts = overallLifts - purchaseAmount;
        overallLifts_Text.innerHTML = "Overall Lifts Weighed: " + overallLifts;
        return true;
    }
    else if (overallLifts < purchaseAmount){
        return false;
    }
}

function goBack()
{
    window.location.href = '../home.html';
}