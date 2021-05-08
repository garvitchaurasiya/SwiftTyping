const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const speedElement = document.getElementById('speed')
const accuracyElement = document.getElementById('accuracy')
var words;
var time;
var x=0;
let correctLetter;
let incorrectLetter;
var averageSpeed;
var accuracy;
var attempt=0;
quoteInputElement.addEventListener('input', () => {
    for (; x<1; x++){
        startTimer();
    }
    
    correctLetter=0;
    incorrectLetter=0;

    
    words=1;

    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        // console.log(correctLetter+incorrectLetter)
        // if ((correctLetter+incorrectLetter)<=0){
        //     resetTimer();
        // }

        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
        }else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            correctLetter++;
            if (characterSpan.innerText==' '){words++}
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            incorrectLetter++;
            if (characterSpan.innerText==' '){words++}

        }
    })
    if((correctLetter+incorrectLetter)===str.length){
        renderNewQuote()

        accuracyElement.innerHTML = "100%";
        attempt++;
        $(document).ready(function(){
            $('#leaderBoard').append("<tr><td>"+attempt+ "</td> <td>"+averageSpeed+" WPM</td> <td>"+accuracy+"%</td><td>"+showTime()+"</td></tr>")
        })
    }
})


const btn = document.querySelector('#btn');
const sb = document.querySelector('#dropDown')
var selectedTest=0;
btn.onclick = (event) => {
    event.preventDefault();
    // alert(sb.selectedIndex);
    selectedTest = sb.selectedIndex;
    renderNewQuote()
};
var str;
var randomQuote;
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
        
function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function getNextQuote(){
    
    randomQuote = await getRandomQuote()

}
getNextQuote();

var len = 100000;
function getTest(selectedTest){

    if (selectedTest == 0){
        correctLetter = 0;
        incorrectLetter = 0;
        str = "I'm going to hire professional help tomorrow. I can't handle this anymore. She fell over the coffee table and now there is blood in her catheter. This is much more than I ever signed up to do. She had been told time and time again that the most important steps were the first and the last. It was something that she carried within her in everything she did, but then he showed up and disrupted everything. He told her that she had it wrong. The first step wasn't the most important. The last step wasn't the most important. It was the next step that was the most important.";
        return str;
        
    }
    else if(selectedTest == 1){
        correctLetter=0;
        incorrectLetter=0;
        str = "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity. The boy walked down the street in a carefree way, playing without notice of what was about him. He didn't hear the sound of the car as his ball careened into the road. He took a step toward it, and in doing so sealed his fate.";
        return str;
    }
    else if(selectedTest == 2){
        correctLetter=0;
        incorrectLetter=0;
        str = "You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you're done. That way even after you're gone, you will still live on in the things you created. If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.";
        return str;
    }
    else if(selectedTest == 3){
        correctLetter=0;
        incorrectLetter=0;
        str = "Greg understood that this situation would make Michael terribly uncomfortable. Michael simply had no idea what was about to come and even though Greg could prevent it from happening, he opted to let it happen. It was quite ironic, really. It was something Greg had said he would never wish upon anyone a million times, yet here he was knowingly letting it happen to one of his best friends. He rationalized that it would ultimately make Michael a better person and that no matter how uncomfortable, everyone should experience racism at least once in their lifetime."
        return str;
    }
    else if(selectedTest == 4){
        correctLetter =0;
        incorrectLetter=0;
        // str = "This is a sample.";
        str = "Sometimes it's simply better to ignore the haters. That's the lesson that Tom's dad had been trying to teach him, but Tom still couldn't let it go. He latched onto them and their hate and couldn't let it go, but he also realized that this wasn't healthy. That's when he came up with his devious plan. Do you think you're living an ordinary life? You are so mistaken it's difficult to even explain. The mere fact that you exist makes you extraordinary. The odds of you existing are less than winning the lottery, but here you are. Are you going to let this extraordinary opportunity pass?";
        return str;
    }
    else if(selectedTest == 5){
        correctLetter=0;
        incorrectLetter=0;

        getNextQuote();
        str = randomQuote;
        return str;
    }
}


 function renderNewQuote(){
    const quote =  getTest(selectedTest)
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character =>{
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })

    quoteInputElement.value = null
    
}
var minutes=0;
var seconds;
function startTimer(){
    timerElement.innerText = '00:00';
    seconds = 0;

    setInterval(function(){timerElement.innerText = getTimerTime()
    }, 1000)
}


function getTimerTime() {

    if((correctLetter+incorrectLetter)==len || (correctLetter+incorrectLetter)==0){
        correctLetter=0;
        incorrectLetter=0;
        resetTimer();
        }
    len = str.length;
    if (seconds==59){
        minutes++;
        seconds=-1;
    }
    seconds++;
    
    time = minutes*60 + seconds;
    averageSpeed = Math.floor((words/time*60));
    if (time == 0) speedElement.innerHTML="Speed : 0 WPM";
    else speedElement.innerHTML="Speed : "+averageSpeed+" WPM";
    const totalLetter = correctLetter+incorrectLetter;
    accuracy=Math.floor(correctLetter/totalLetter*100)
    if (totalLetter == 0){
        accuracyElement.innerHTML = "Accuracy : 100%"
    }else{
        accuracyElement.innerHTML = "Accuracy : "+accuracy+"%";
    }
    var showtime = showTime();
    return showtime;
    
}
function showTime(){
    if (minutes<10 && seconds<10) return '0'+minutes+':0'+seconds;
    if (minutes<10) return '0'+minutes+':'+seconds;
    if (seconds<10) return minutes+':0'+seconds;
    
    return minutes+':'+seconds;
}

function resetTimer(){
    minutes = 0;
    seconds = -1;


}
renderNewQuote();