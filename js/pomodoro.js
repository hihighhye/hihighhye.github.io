import { HIDDEN_CLASSNAME, TMODE_ACTIVE_CLASSNAME, FOCUSED_KEY } from "./SecretKeys.js"


const DEFAULT_FMIN = 25;
const DEFAULT_FSEC = 0;
const DEFAULT_BMIN = 5;
const DEFAULT_BSEC = 0;

let inputMode = true;
let fMode = true; 
let leftMin = 0;
let leftSec = 0;
let isStopped = false;
let onCounting = false;
let intervalID;
let focusedToday = 0;


export function initPomodoro({
    pmdrBtn,
    timerForm,
    focusBtn,
    breakBtn,
    inputSection,
    textSection,
    minInput,
    secInput,
    minText,
    secText,
    startBtn,
    pauseBtn,
    stopBtn,
    focusedTime
}) {
    function onClickPmdrBtn() {
        timerForm.classList.toggle(HIDDEN_CLASSNAME);
    } 
    
    function onClickFocusBtn() {
        isStopped = true;  
        onCounting = false;
    
        inputMode = true;
        changeMiddleSection();
        fMode = true;
        colorTModeBtn();
    }
    
    function onClickBreakBtn() {
        isStopped = true;  
        onCounting = false;
    
        inputMode = true;
        changeMiddleSection();
        fMode = false;
        colorTModeBtn();
    }
    
    function onClickStartBtn(event) {
        event.preventDefault();
    
        if (!onCounting) {
            isStopped = false;
    
            if (inputMode) {
                leftMin = parseInt(minInput.value);
                leftSec = parseInt(secInput.value);
                inputMode = false;
                changeMiddleSection();
            }
            else {
                leftMin = parseInt(minText.innerText);
                leftSec = parseInt(secText.innerText);
            }
    
            startCountDown();
        }
    }
    
    function onClickPauseBtn(event) {
        event.preventDefault();
    
        if (intervalID !== undefined) {
            isStopped = true;  
            onCounting = false;
        }  
    }
    
    function onClickStopBtn(event) {
        event.preventDefault();
    
        if (intervalID !== undefined) {
            isStopped = true;
    
            inputMode = true;
            changeMiddleSection();
            colorTModeBtn();
            onCounting = false;
        }
    }
    
    function colorTModeBtn() {
        if (fMode) {
            focusBtn.classList.add(TMODE_ACTIVE_CLASSNAME);
            breakBtn.classList.remove(TMODE_ACTIVE_CLASSNAME);
            minInput.value = DEFAULT_FMIN;
            secInput.value = DEFAULT_FSEC;
            leftMin = DEFAULT_FMIN;
            leftSec = DEFAULT_FSEC;
        }
        else {
            focusBtn.classList.remove(TMODE_ACTIVE_CLASSNAME);
            breakBtn.classList.add(TMODE_ACTIVE_CLASSNAME);
            minInput.value = DEFAULT_BMIN;
            secInput.value = DEFAULT_BSEC;
            leftMin = DEFAULT_BMIN;
            leftSec = DEFAULT_BSEC;
        }
    }
    
    function changeMiddleSection() {
        if (inputMode) {
            inputSection.classList.remove(HIDDEN_CLASSNAME);
            textSection.classList.add(HIDDEN_CLASSNAME);
        }
        else {
            inputSection.classList.add(HIDDEN_CLASSNAME);
            textSection.classList.remove(HIDDEN_CLASSNAME);
        }
    }
    
    function startCountDown() {
        onCounting = true;
        getLeftTime();
        intervalID = setInterval(getLeftTime, 1000);
    }
    
    function getLeftTime() {
        // console.log(intervalID);
    
        if (isStopped) {
            clearInterval(intervalID);
            saveFocusedTime();
        }
        else {
            minText.innerText = String(leftMin).padStart(2, "0");
            secText.innerText = String(leftSec).padStart(2, "0");
            
            if (leftSec === 0 & leftMin !== 0) {    
                leftMin -= 1;
                leftSec = 59;
                if (fMode) {
                    focusedToday += 1;
                }
            }
            else if (leftSec === 0 & leftMin === 0) {
                if (fMode) {
                    fMode = false;
                }
                else {
                    fMode = true;   
                }
                saveFocusedTime();
                colorTModeBtn();
                getLeftTime();
            }
            else {
                leftSec -= 1;
                if (fMode) {
                    focusedToday += 1;
                }
            }
        }
    }
    
    function saveFocusedTime() {
        localStorage.setItem(FOCUSED_KEY, focusedToday);
        focusedTime.innerText = `${Math.floor(focusedToday / 60)}m`;
    }
    
    
    pmdrBtn.addEventListener("click", onClickPmdrBtn);
    focusBtn.addEventListener("click", onClickFocusBtn);
    breakBtn.addEventListener("click", onClickBreakBtn);
    startBtn.addEventListener("click", onClickStartBtn);
    pauseBtn.addEventListener("click", onClickPauseBtn);
    stopBtn.addEventListener("click", onClickStopBtn);
    
    colorTModeBtn();
    
    const savedFocusedTime = localStorage.getItem(FOCUSED_KEY);
    const parsedFocusedTime = parseInt(savedFocusedTime);
    if (parsedFocusedTime) {
        focusedToday = parsedFocusedTime;
        focusedTime.innerText = `${Math.floor(focusedToday / 60)}m`;
    }
}


export function resetFocusedToday() {
    localStorage.setItem(FOCUSED_KEY, 0);
    focusedTime.innerText = `0m`;
    focusedToday = 0;
}
