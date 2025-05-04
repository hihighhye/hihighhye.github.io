import { HIDDEN_CLASSNAME, USERNAME_KEY } from "./SecretKeys.js";


export function initGreetings({
    loginForm,
    continueBtn,
    loginInput,
    welcomeText,
    goalForm,
    footMenu,
    lSideMenu
}) {
    function paintGreetings(username) {
        welcomeText.classList.remove(HIDDEN_CLASSNAME);
    
        const savedGoal = localStorage.getItem("goal");
        if (!savedGoal) {
            goalForm.classList.remove(HIDDEN_CLASSNAME);
        }
        footMenu.classList.remove(HIDDEN_CLASSNAME);
        lSideMenu.classList.remove(HIDDEN_CLASSNAME);
    
        const date = new Date();
        const hours = date.getHours();
    
        if (hours > 6 && hours < 12) {
            welcomeText.innerText = `Good morning, ${username}`;
        }
        else if (hours >= 12 && hours < 18) {
            welcomeText.innerText = `Good afternoon, ${username}`;
        }
        else if (hours >= 18 && hours < 22) {
            welcomeText.innerText = `Good evening, ${username}`;
        }
        else {
            welcomeText.innerText = `Night Night, ${username}`;
        }
        
    }
    
    function onLoginSubmit(event) {
        event.preventDefault();
    
        const username = loginInput.value;
        localStorage.setItem(USERNAME_KEY, username);
        
        loginForm.classList.add(HIDDEN_CLASSNAME);
        continueBtn.classList.add(HIDDEN_CLASSNAME);
    
        paintGreetings(username);
    }
    
    
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    
    if (savedUsername === null) {
        loginForm.classList.remove(HIDDEN_CLASSNAME);
        loginForm.addEventListener("submit", onLoginSubmit);
    } else {
        paintGreetings(savedUsername);
        setInterval(paintGreetings, 3600000, savedUsername);
    }    
}
