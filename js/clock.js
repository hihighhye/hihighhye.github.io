import { resetFocusedToday } from "./pomodoro.js";


export function initClock(clockElement, dateElement) {
    function getClock() {
        const date = new Date();
    
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        // const seconds = String(date.getSeconds()).padStart(2, "0");
    
        clockElement.innerText = `${hours}:${minutes}`; // :${seconds}
    
        if (hours === "00" && minutes === "00") {
            getTodaysDate();
            resetFocusedToday();
        }
    }
    
    function getTodaysDate() {
        const date = new Date();
    
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const day = dayDict[date.getDay()];
    
        dateElement.innerText = `${mm}.${dd} / ${day}`
    }
    
    
    const dayDict = {1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 0: "Sun"};
    
    getTodaysDate();
    getClock();
    setInterval(getClock, 1000);
}


