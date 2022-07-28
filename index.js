let userInput = document.getElementById("input-task");
const addButton = document.getElementById("add-task-button");
const list = document.getElementById("task-list");
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
const clearButton = document.getElementById("clear-tasks-button");


if (taskList.length === 0) {
    userInput.value = "Add your first task here";
    userInput.addEventListener('click', function () {
        userInput.value = null;
    })
}


taskList.forEach(function(savedTask) {



    let newTask = document.createElement('li');
    newTask.innerHTML = '<input type="checkbox" class="taskDone"><span class="task">' + savedTask.taskName + '</span>\n' +
        '                <button class="delete-btn">X</button>';
    if (savedTask['done'] === true) {
        let taskSpan = newTask.querySelector('span');
        taskSpan.classList.add('checked');
        let taskCheck = newTask.querySelector('input');
        taskCheck.checked = true;
    }
    list.appendChild(newTask);
});

addButton.addEventListener('click', function(event)  {
    let newValue = userInput.value;
    if(newValue) {
        let taskToAdd = {taskName : newValue, done: false};
        taskList.push(taskToAdd);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        let newTask = document.createElement('li');
        newTask.innerHTML = '<input type="checkbox" class="taskDone"><span class="task ">' + userInput.value + '</span>\n' +
            '                <button class="delete-btn">X</button>';

        list.appendChild(newTask);
        userInput.value = null;
    }


})


list.addEventListener("click", function(e) {

    if(e.target.nodeName == "BUTTON") {
        let valueOfTask = e.target.parentNode.querySelector('span').innerText;
        taskList = taskList.filter(function(e) { return e.taskName !== valueOfTask });
        localStorage.setItem("tasks", JSON.stringify(taskList));
        const parent = e.target.parentNode;
        parent.remove();
    }
    if(e.target.nodeName == "INPUT") {
        let targetSpan = e.target.parentNode.querySelector('span');
        let targetTaskName = e.target.parentNode.querySelector('span').innerText;
        const taskInArray = taskList.find(element => {
            if (element.taskName === targetTaskName) {
               return true;
            }
            return false;
        });


        if (e.target.checked) {
            targetSpan.classList.add('checked');
            taskInArray['done'] = true;
            localStorage.setItem("tasks", JSON.stringify(taskList));
        } else {
            if (targetSpan.classList.contains('checked')) {
                targetSpan.classList.remove('checked');
                taskInArray['done'] = false;
                localStorage.setItem("tasks", JSON.stringify(taskList));
            }
        }
    }
});

clearButton.addEventListener('click', function(){
    window.localStorage.removeItem('tasks');
    let listItems = document.querySelectorAll('li');
    listItems.forEach(function (elem) {
        elem.parentNode.removeChild(elem);
    })
})


// deleteBtns.forEach(function(element){
//     element.addEventListener('click', function(event) {
//         event.preventDefault();
//         const parent = element.parentNode;
//         parent.remove();
//         console.log(parent);
//     });
// });
