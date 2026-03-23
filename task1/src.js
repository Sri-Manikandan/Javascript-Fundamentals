const taskinput = document.getElementById('inputTask');
const addbtn = document.getElementById('addBtn');
const tasklist = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function savetasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function rendertasks(){
    tasklist.innerHTML = ""

    tasks.forEach((task,index)=>{
        const li = document.createElement("li");
        const span = document.createElement("span");
        const h2 = document.createElement("h2");
        span.textContent = task.text;

        if(task.completed){
            span.classList.add("completed")
            span.appendChild(h2);
            h2.textContent="Completed";
        }

        span.addEventListener("click",()=>{
            tasks[index].completed = !tasks[index].completed
            savetasks();
            rendertasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("deleteBtn");

        deleteBtn.addEventListener("click",()=>{
            tasks.splice(index,1);
            savetasks();
            rendertasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        tasklist.appendChild(li);
    });
}

addbtn.addEventListener("click",()=>{
    const text = taskinput.value.trim();

    if(text==="") return;
    tasks.push({text:text, completed:false});
    taskinput.value="";
    savetasks();
    rendertasks();
});

rendertasks();