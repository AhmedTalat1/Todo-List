let tasks = [];
let lang = localStorage.getItem("lang") ?? "en";

function applyLanguage() {
    document.getElementById("main-container").style.direction = lang === "ar" ? "rtl" : "ltr";
    document.getElementById("page-title").innerText = lang === "ar" ? "مهامي" : "My Tasks";
    document.getElementById("switch-lang").innerText = lang === "ar" ? "English" : "العربية";
}

function getTasksFromStorage() {
    const stored = localStorage.getItem("tasks");
    tasks = stored ? JSON.parse(stored) : [];
}

function storeTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function fillTasksOnThePage() {
    document.getElementById("tasks").innerHTML = "";
    tasks.forEach((task, index) => {
        let content = `
        <div class="task ${task.isDone ? 'done' : ''}">    
            <div class="taskTitle" style="width: 75%; padding-right: 10px; display: flex; flex-direction: column; flex-wrap: wrap; margin-left: 10px">
                <h4 style= "margin-bottom: 60px; font-size: 20px; margin-top: 10px;">${task.title}</h4>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span class="material-symbols-outlined font" style="font-size: 20px;">calendar_month</span>
                    <span>${task.date}</span>
                </div>
            </div>
            <div class="task-actions">
                <button onclick="deleteTask(${index})" class="circular" style="background-color: darkred; color: white;">
                    <span class="material-symbols-outlined">delete</span>
                </button>
                ${task.isDone ?
                    `<button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: rgba(255, 51, 51, 1); color: white;">
                        <span class="material-symbols-outlined">close</span>
                    </button>` :
                    `<button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color: green; color: white;">
                        <span class="material-symbols-outlined">check</span>
                    </button>`}
                <button onclick="editTask(${index})" class="circular" style="background-color: darkblue; color: white;">
                    <span class="material-symbols-outlined">edit</span>
                </button>
            </div>
        </div>
        `;
        document.getElementById("tasks").innerHTML += content;
    });
}

function toggleTaskCompletion(index) {
    tasks[index].isDone = !tasks[index].isDone;
    storeTasks();
    fillTasksOnThePage();
}

function deleteTask(index) {
    const confirmMsg = lang === "ar"
        ? `هل أنت متأكد من حذف مهمة "${tasks[index].title}" ؟`
        : `Are you sure you want to delete task "${tasks[index].title}"?`;
    if (confirm(confirmMsg)) {
        tasks.splice(index, 1);
        storeTasks();
        fillTasksOnThePage();
    }
}

function editTask(index) {
    const promptMsg = lang === "ar" ? "أدخل عنوان المهمة الجديد" : "Enter new task title";
    const newTitle = prompt(promptMsg, tasks[index].title);
    if (newTitle !== null && newTitle.trim() !== "") {
        tasks[index].title = newTitle;
        storeTasks();
        fillTasksOnThePage();
    }
}

document.getElementById("add-btn").addEventListener("click", function () {
    const now = new Date();
    const taskDate = now.getDate().toString().padStart(2, '0') + "/" +
        (now.getMonth() + 1).toString().padStart(2, '0') + "/" +
        now.getFullYear() + " | " +
        now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0');

    const taskTitle = prompt(lang === "ar" ? "الرجاء إدخال عنوان المهمة" : "Please enter task title");
    if (!taskTitle) return;

    tasks.push({
        title: taskTitle,
        date: taskDate,
        isDone: false
    });

    storeTasks();
    fillTasksOnThePage();
});

document.getElementById("switch-lang").addEventListener("click", function () {
    lang = lang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", lang);
    applyLanguage();
    fillTasksOnThePage();
});

getTasksFromStorage();
applyLanguage();
fillTasksOnThePage();