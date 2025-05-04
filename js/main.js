import { initBackground } from "./background.js";
import { initWeather } from "./weather.js";
import { initClock } from "./clock.js";
import { initGreetings } from "./greetings.js";
import { initMaingoal } from "./maingoal.js";
import { initPomodoro } from "./pomodoro.js";
import { initQuotes } from "./quotes.js";
import { initTasks } from "./tasks.js";


document.addEventListener("DOMContentLoaded", () => {
    // background
    const gridFrameElement = document.querySelector(".grid-frame");
    initBackground(gridFrameElement);

    // weather
    const weatherElement = document.querySelector("#weather-container span:first-child");
    const cityElement = document.querySelector("#weather-container span:last-child");
    initWeather(weatherElement, cityElement);


    // clock
    const clockElement = document.querySelector("h1#clock");
    const dateElement = document.querySelector("#date-container span");
    initClock(clockElement, dateElement);

    // greetings
    initGreetings({
        loginForm: document.querySelector("#login-form"),
        continueBtn: document.querySelector("#continueBtn"),
        loginInput: document.querySelector("#name-field"),
        welcomeText: document.querySelector("#greeting"),
        goalForm: document.querySelector("#goal-form"),
        footMenu: document.querySelector("#foot-menu"),
        lSideMenu: document.querySelector("#l-side-menu-bar"),
    });

    // maingoal
    initMaingoal({
        goalForm: document.getElementById("goal-form"),
        goalInput: document.getElementById("main-goal"),
        usersGoalContainer: document.getElementById("users-goal-container"),
        usersGoal: document.querySelector("#users-goal"),
        deleteBtn: document.querySelector("#delete-button")
    });

    // pomodoro
    initPomodoro({
        pmdrBtn: document.getElementById("pmdr-button"),
        timerForm: document.querySelector("#timer-form"),
        focusBtn: document.getElementById("focus"),
        breakBtn: document.getElementById("break"),
        inputSection: document.getElementById("t-input-section"),
        textSection: document.getElementById("t-text-section"),
        minInput: document.querySelector("#min-input"),
        secInput: document.querySelector("#sec-input"),
        minText: document.querySelector("#min-text"),
        secText: document.querySelector("#sec-text"),
        startBtn: document.getElementById("t-start-button"),
        pauseBtn: document.getElementById("t-pause-button"),
        stopBtn: document.getElementById("t-stop-button"),
        focusedTime: document.querySelector("#focused-container span:first-child")
    });

    // quotes
    const quoteElement = document.querySelector("#quote-container span:first-child");
    const authorElement = document.querySelector("#quote-container span:last-child");
    initQuotes(quoteElement, authorElement);

    // tasks
    initTasks({
        tasksBtn: document.getElementById("tasks-button"),
        rside: document.querySelector("div.right-side"),
        toDoForm: document.getElementById("todo-form"),
        toDoInput: document.getElementById("todo-input"),
        toDoFieldset: document.getElementById("todo-fieldset")
    });
});
