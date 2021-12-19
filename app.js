let listOfTasks = Array();

document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', '');
    } else {
        populateInitTasks();
    }
});

const addTask = () => {
    const newTask = document.getElementById('input-task');
    const taskList = document.getElementById('task-list');
    let newLi = document.createElement('li');
    let newId = (taskList.children.length + 1).toString();
    newLi.setAttribute('data-id', newId);
    let newSpnId = 'spn-' + (taskList.children.length + 1).toString();
    newHtml = `<input type="checkbox" onchange="completeTask('${newSpnId}', this, ${newId}, '${newTask.value}')"><span id="${newSpnId}" class="task">${newTask.value}</span><button onclick="deleteTask(this, ${newId})" class="delete-btn">x</button>`;
    newLi.innerHTML = newHtml;
    taskList.appendChild(newLi);
    newTask.value = '';
    // update localStorage
    let myObj = {
        "indice": newId,
        "content": newHtml,
        "done": false
    };
    addLocalStorage(myObj);
};

const deleteTask = (elem, indice) => {
    elem.parentNode.parentNode.removeChild(elem.parentNode);
    let updIndex = listOfTasks.findIndex(obj => obj.indice == indice);
    let exclusion = listOfTasks.splice(updIndex, 1);
    updateLocalStorage();
};
const completeTask = (spnId, elem, indice, spnVal) => {
    const task = document.getElementById(spnId);
    let updIndex = listOfTasks.findIndex(obj => obj.indice == indice);
    let newHtml = '';
    if (elem.checked) {
        task.classList.add('done');
        listOfTasks[updIndex].done = true;
        newHtml = `<input type="checkbox" checked onchange="completeTask('${spnId}', this, ${listOfTasks[updIndex].indice}, '${spnVal}')"><span id="${spnId}" class="task done">${spnVal}</span><button onclick="deleteTask(this, ${indice})" class="delete-btn">x</button>`;
        listOfTasks[updIndex].content = newHtml;
    } else {
        task.classList.remove('done');
        listOfTasks[updIndex].done = false;
        newHtml = `<input type="checkbox" onchange="completeTask('${spnId}', this, ${listOfTasks[updIndex].indice}, '${spnVal}')"><span id="${spnId}" class="task">${spnVal}</span><button onclick="deleteTask(this, ${indice})" class="delete-btn">x</button>`;
        listOfTasks[updIndex].content = newHtml;
    }
    updateLocalStorage();
};


const addLocalStorage = (obj) => {
    listOfTasks.push(obj);
    localStorage.removeItem('tasks')
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
};
const updateLocalStorage = () => {
    localStorage.removeItem('tasks')
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
};

const populateInitTasks = () => {
    let myTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (myTasks.length > 0) {
        const taskList = document.getElementById('task-list');
        myTasks.map((task) => {
            listOfTasks.push(task);
            let newLi = document.createElement('li');
            newLi.innerHTML = task.content;
            taskList.appendChild(newLi);
        });
    }

};
