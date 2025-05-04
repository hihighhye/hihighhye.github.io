import { HIDDEN_CLASSNAME, CHECKED_CLASSNAME, TASKS_KEY } from "./SecretKeys.js"


export function initTasks({
    tasksBtn,
    rside,
    toDoForm,
    toDoInput,
    toDoFieldset
}) {
    let tasks = [];

    function onClickTasksBtn() {
        rside.classList.toggle(HIDDEN_CLASSNAME);
    } 

    function onClickCheckbox(event) {
        const label = event.target.nextElementSibling;
        if (event.target.checked) {
            label.classList.add(CHECKED_CLASSNAME);
        }
        else {
            label.classList.remove(CHECKED_CLASSNAME);
        }
    
        const checkedTaskId = parseInt(event.target.id.slice(1));
    
        tasks.forEach(task => {
            if (task.id === checkedTaskId) {
                task.isChecked = !task.isChecked;
            }
        });
        saveTasks();
    }

    function handleTaskSubmit(event) {
        event.preventDefault();
        const newTask = toDoInput.value;
        toDoInput.value = "";

        const newTaskObj = {
            "task": newTask, 
            "id": Date.now(),
            "isChecked": false
        };
        tasks.push(newTaskObj);
        paintTask(newTaskObj);
        saveTasks();
    }

    function paintTask(newTaskObj) {
        const div = document.createElement("div");
        div.id = "d" + String(newTaskObj.id);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "c" + String(newTaskObj.id);
        checkbox.value = newTaskObj.task;
        checkbox.addEventListener("click", onClickCheckbox);

        const label = document.createElement("label");
        label.innerText = newTaskObj.task;

        if (newTaskObj.isChecked) {
            checkbox.checked = true;
            label.classList.add(CHECKED_CLASSNAME);
        };

        const btn = document.createElement("button");
        btn.id = String(newTaskObj.id);
        const btnImg = document.createElement("img");
        btnImg.src = "images/delete-2.png";
        btnImg.alt = "del-btn";
        btnImg.title = "delete";

        btnImg.classList.add("btnIcon-small");
        btn.classList.add("btn");
        btn.appendChild(btnImg);
        btn.addEventListener("click", deleteTask);

        div.appendChild(checkbox);
        div.appendChild(label);
        div.appendChild(btn);
        toDoFieldset.appendChild(div);
    }

    function deleteTask(event) {
        const btn = event.target.parentElement;

        const div = document.querySelector(`div#d${btn.id}`);
        div.remove();
        tasks = tasks.filter(task => task.id !== parseInt(btn.id));

        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }


    tasksBtn.addEventListener("click", onClickTasksBtn);
    toDoForm.addEventListener("submit", handleTaskSubmit);

    const savedTasks = localStorage.getItem(TASKS_KEY);

    if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        tasks = parsedTasks;
        parsedTasks.forEach(task => {
            paintTask(task)
        });
    }
}
