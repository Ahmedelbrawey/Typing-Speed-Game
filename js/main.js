//Add Array of Words 
const words = [
    'Copy',
    'Blog',
    'Bookmark',
    'Browser',
    'Compress',
    'Data',
    'Desktop',
    'Download',
    'Keyboard',
    'Laptop'
];

//Add Levels
const levels = {
    'Easy'  : 6,
    'Normal': 4,
    'Hard'  : 2
};
//Show Levles And Second
let set_lvls = 'Normal'; //Change Levels And add select ..........
let set_seconds = levels['Normal'];  

// Catch Selectors
let message_levels  = document.querySelector('.message .level');
let message_second  = document.querySelector('.message .second');
let but_start       = document.querySelector('.but-start');
let theWord         = document.querySelector('.word');
let input           = document.querySelector('.input');
let upcoming_words  = document.querySelector('.upcoming-words');
let time            = document.querySelector('.control .time span');
let got             = document.querySelector('.control .score .got');
let total           = document.querySelector('.control .score .total');
let finsh           = document.querySelector('.finsh');

//Set levels + second + scoer
message_levels.innerHTML = set_lvls;
message_second.innerHTML = set_seconds;
time.innerHTML = set_seconds;
total.innerHTML = words.length;

//Display Paste Event 
input.onpaste = () =>{return false;}//Arrow function
//Start Game

but_start.addEventListener('click',start_game);


//Function Start Game
function start_game(){
    this.remove();
    input.focus();
    //Genrate Words Function
    genrate_words()
}
function genrate_words(){
    //Get Rendome Word
    let randomeWord = words[Math.floor(Math.random() * words.length)];
    //Get Indxof Randome word
    let index_word = words.indexOf(randomeWord);
    // Remove Randome word From Array words
    words.splice(index_word, 1 );
    //Show Randome word
    theWord.innerHTML = randomeWord;
    //Make UPcoming Words Empty
    upcoming_words.innerHTML = "";
    //Create Upcoming Words
    for(let i = 0; i < words.length; i++){
        let div = document.createElement('div');
        let text = document.createTextNode(words[i]);
        div.appendChild(text);
        upcoming_words.appendChild(div);
    }
    //Start Play Function to control of time
    startTime();
    
};

//Function to control of time
function startTime(){
    time.innerHTML = set_seconds 
    let timeCount = setInterval(() => {
        time.innerHTML--;
        if(time.innerHTML === '0'){
            //Stop Time Count
            clearInterval(timeCount);
            //Compare Words
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
                //Empty input value
                input.value = '';
                //Score Increas
                got.innerHTML++;
                // Check If I have words
                if(words.length > 0) {
                    genrate_words();
                }else {
                    //Show Good
                    finsh.innerHTML=`<span class="good"> Good Don! </span>`;
                    //Remove Box Words
                    upcoming_words.remove();
                }
            }else {
                //Show Game Over
                finsh.innerHTML=`<span class="bad">Geme Over</span>`;
            }


        };
    }, 1000);
}
