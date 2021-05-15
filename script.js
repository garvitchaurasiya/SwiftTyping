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

// addEventListener get the text written in the text-area.
quoteInputElement.addEventListener('input', () => {
    for (; x<1; x++){
        startTimer();
    }
    
    correctLetter=0;
    incorrectLetter=0;

    
    words=1;

    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    // This loop analyze the user input character by character whether they are correct or not.
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]

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
        showTest()

        accuracyElement.innerHTML = "100%";
        attempt++;
        $(document).ready(function(){
            $('#leaderBoard').append("<tr><td>"+attempt+ "</td> <td>"+averageSpeed+" WPM</td> <td>"+accuracy+"%</td><td>"+showTime()+"</td></tr>")
        })
    }
})


// This onclick event  is to get the level number (from 0 to 5) that had been selected by the user from the dropdown.
const btn = document.querySelector('#btn');
const sb = document.querySelector('#dropDown')
var selectedTest=0;

btn.onclick = (event) => {
    event.preventDefault();
    selectedTest = sb.selectedIndex;
    showTest()
};



var str;
var randomQuote;
const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

// getRandomQuote uses an API to a random quote.
function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

// getNextQuote is the function which will be called once the test completed to load the next test.
async function getNextQuote(){
    randomQuote = await getRandomQuote()
}

getNextQuote();
var len = 100000;

// getTest function returns a string requested by the user via drop-down menu.
function getTest(selectedTest){

    if (selectedTest == 0){
        correctLetter = 0;
        incorrectLetter = 0;
        str = "Hold the door for someone has their hands full. It's pretty easy. Just hold the door as you see them approaching. They will be truly glad they didn't have to drop their things just to open a door. If someone gives you a nice gift, write a physical thank you letter and put that into the mail. An actual thank you letter on paper means a lot more than just an e-mail, even in today's modern times. If you are having a meal with someone, please turn off your cell phone. Unless you are a doctor on call, it is not polite to eat and still be wired. You owe it to disconnect from the hustle and bustle of the world for a few minutes."
        return str;
        
    }
    else if(selectedTest == 1){
        correctLetter=0;
        incorrectLetter=0;
        str = 'Drink at least six glasses of fresh water every day. All doctors will tell you this; this helps you detoxify and cleanse your system on a daily basis. when your physical health is well; this is kindness to oneself on the physical level. Observe silence for at least one hour each day. This way, others around you will benefit from that silence; this is an indirect act of kindness. If you can, read the "Dhammapada" (Sayings of the Buddha). You will learn a lot about kindness and compassion in this historical text. If you can, read the "Sermon on the Mount" given by Jesus in the Bible. You will learn a lot about kindness, compassion, and love in this historical text.'
        return str;
    }
    else if(selectedTest == 2){
        correctLetter=0;
        incorrectLetter=0;
        str = 'Get organized. An organized life allows others to sense order and this is indirectly being kind to others through this approach. Apply the perennial wisdom of Ben Franklin, where possible: "early to bed, early to rise, makes one both healthy and wise". Practice mindfulness about diversity. No two people think alike. In this way, better communication between people becomes possible. When you serve others coffee or tea, always ask them how they like their drink. Perhaps they like some cream or milk or sugar or sweetener. Not everyone likes their coffee black, for example. Just keep on smiling, as much as you can. People always enjoy positive energy, especially during difficult times. This is a great universal approach to kindness.'

        return str;
    }
    else if(selectedTest == 3){
        correctLetter=0;
        incorrectLetter=0;
        str = "Avoid excess alcohol (for those 21 years and older only). If you are a minor, do not drink alcohol until you are 21 years of age. Please consult your doctor or physician for optimal advice regarding the consumption of alcohol. This is kindness to oneself. Avoid smoking altogether. Smoking is considered a major cause of lung cancer by the American Medical Association. Please consult your doctor or physician regarding the effects of smoking on the human body. Taking care of your health, indeed, is an act of kindness toward oneself. Take calcium supplements in conjunction with your doctor's recommendations so that you don't get bone diseases like osteoporosis later on in life. Take care of your bones; this is kindness to oneself."
        return str;
    }
    else if(selectedTest == 4){
        correctLetter =0;
        incorrectLetter=0;
        str = 'Be grateful. The universe will reciprocate with great kindness. Visualize others with happiness. Visualize others enjoying a sunny day outside. Visualize dry and parched areas with new and abundant rains. Visualize sick people receiving healing energies. Awaken to Universal Love: "All you need is love". John Lennon Awaken to Universal Compassion: "May all beings to experience happiness and the causes of happiness" - the 14th Dalai Lama. Awaken to wisdom and learning. Awaken to patience and tolerance.';

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

// showTest will receive the string by getTest().
 function showTest(){
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

// getTimerTime function is called in every interval of 1s by setInterval function.
// This getTimerTime function includes the code for speed and accuracy as well. So that speed and accuracy syncs with time.
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
// Show timer returns the time in the way XX:XX
function showTime(){
    if (minutes<10 && seconds<10) return '0'+minutes+':0'+seconds;
    if (minutes<10) return '0'+minutes+':'+seconds;
    if (seconds<10) return minutes+':0'+seconds;
    
    return minutes+':'+seconds;
}

// resetTimer function just reset the timer to 00:00, once test is completed or reload a new test.
function resetTimer(){
    minutes = 0;
    seconds = -1;


}
showTest();