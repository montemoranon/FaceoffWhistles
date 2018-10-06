var down = new Audio('Down.m4a');
var set = new Audio('Set.m4a');
var whistle = new Audio('Whistle.mov');
var downSetTimeObj = {timeValue: 500};
var setWhistleTimeObj = {timeValue: 500};
var timeBetweenFaceoffs = 10000;
var continuePlaying = true;

function getRandomTime(maxTime) {
    var time = Math.random() * maxTime;

    return Math.max(500, time);
}

function playDown(callBack) {
    down.play();

    var time = getRandomTime(downSetTimeObj.timeValue);

    setTimeout(function() {
        playSet(callBack)
    }, time);
}

function playSet(callBack) {
    set.play();

    var time = getRandomTime(setWhistleTimeObj.timeValue)

    setTimeout(function() {
        playWhistle(callBack)
    }, time);
}

function playWhistle(callBack) {
    whistle.play();
    setTimeout(callBack, timeBetweenFaceoffs);
}

function play() {
    if (continuePlaying) {
        playDown(play);
    }
}

function updateTime(sliderId, labelId, timeVariable) {
    let slider = document.getElementById(sliderId);
    var value = slider.value;
    var label = document.getElementById(labelId);

    label.innerHTML = value + ' milliseconds';

    timeVariable.timeValue = value;
}

function linkSliders() {
    var downSetSlider = document.getElementById('downSetSlider');
    downSetSlider.addEventListener('change', function() {
        updateTime('downSetSlider', 'downSetTimeLabel', downSetTimeObj);
    });

    var setWhistleSlider = document.getElementById('setWhistleSlider');
    setWhistleSlider.addEventListener('change', function() {
        updateTime('setWhistleSlider', 'setWhistleTimeLabel', setWhistleTimeObj);
    })
    
}

function setUp() {
    // link the button to play the cadence
    var playButton = document.getElementById('playFaceoffButton');

    playButton.addEventListener('click', function() {
        continuePlaying = true;
    })
    playButton.addEventListener('click', play);

    // set the initial value of the slider labels
    document.getElementById('downSetTimeLabel').innerHTML =  document.getElementById('downSetSlider').value + ' milliseconds';
    document.getElementById('setWhistleTimeLabel').innerHTML =  document.getElementById('setWhistleSlider').value + ' milliseconds';

    // link the slider values to js variables
    linkSliders();

    // configure the stop button
    document.getElementById('stop').addEventListener('click', function() {
        continuePlaying = false;
    })

    // configure time between faceoffs slider
    // var timeBetweenSlider = document.getElementById('timeBetweenFaceoffsSLider');
    // timeBetweenSlider.addEventListener('change', function() {
    //     var timeBetweenLabel = document.getElementById('timeBetweenlLabel');
    //     timeBetweenFaceoffs = timeBetweenSlider.value;
    //     timeBetweenLabel.innerHTML = timeBetweenFaceoffs + ' milliseconds';
    // })

    // var timeBetweenLabel = document.getElementById('timeBetweenLabel');
    // timeBetweenLabel.innerHTML = timeBetweenSlider.value + ' milliseconds';
    var timeBetweenLabel = document.getElementById('timeBetweenLabel');
    var timeBetweenSlider = document.getElementById('timeBetweenFaceoffsSLider');

    timeBetweenLabel.innerHTML = timeBetweenSlider.value + ' milliseconds';
    timeBetweenFaceoffs = timeBetweenSlider.value;

    timeBetweenSlider.addEventListener('change', function() {
        timeBetweenFaceoffs = timeBetweenSlider.value;
        timeBetweenLabel.innerHTML = timeBetweenSlider.value + ' milliseconds'; 
    })
}

$(document).ready(setUp);