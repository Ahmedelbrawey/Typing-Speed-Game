// Auto Type to Text
var options = {
    strings: ['Typing Speed Test Game'],
    typeSpeed: 80,
    backSpeed:80,
    loop:true

    
};

var typed = new Typed('.auto-input', options);




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

// Catch Selectors
let message_levels  = document.querySelector('.message .level');
let message_second  = document.querySelector('.message .second');
let option_please   = document.querySelector('#opt-pl-se');
let but_start       = document.querySelector('.but-start');
let theWord         = document.querySelector('.word');
let input           = document.querySelector('.input');
let upcoming_words  = document.querySelector('.upcoming-words');
let time            = document.querySelector('.control .time span');
let got             = document.querySelector('.control .score .got');
let total           = document.querySelector('.control .score .total');
let finsh           = document.querySelector('.finsh');

//Add Levels
const levels = {
    'Easy'  : 6,
    'Normal': 4,
    'Hard'  : 2
    };

//add Selcet Box
function set_Levels(select_lvl){
    if(select_lvl !== 'Please Selecte'){ 
    //Show Levles And Second
    let set_lvls = select_lvl; 
    let set_seconds = levels[set_lvls];
        
    //Set  second + scoer
    message_second.innerHTML = set_seconds;
    time.innerHTML = set_seconds;
    total.innerHTML = words.length;

    // Remov Please Selcete optin
    option_please.remove();

    //Start Game
    but_start.addEventListener('click',start_game);

    }
};

//Display Paste Event 
input.onpaste = () =>{return false;}//Arrow function




//Function Start Game
function start_game(){
    //Remove button
    this.remove();
    input.focus();
    //Genrate Words Function
    genrate_words();
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
    let set_seconds = message_second.innerHTML;
    time.innerHTML=set_seconds;
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

/* 
How Make Select to choose Levels: 
=>> create selecte tag and option in html 
=>> give selecte  when onchange = "set_Levels(this.value)"
        => this.value return value of selecte
=>> Show Levles And Second 
=>> Set second + scoer
=>> Remov Please Selcete optin
=>> Start Game
*/
