const path = "./NodeJs/ToDo.json"
const NodeFs = require("fs");
const { json } = require("stream/consumers");

const command = process.argv[2];
const arguement = process.argv[3];
console.log("Help/help : to see the commands");

const LoadTasks = ()=>{
    try {
        const dataBuffer = NodeFs.readFileSync(path);
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (error) {
        return []
    }
}

const saveTasks = (tasks)=>{
    const data = JSON.stringify(tasks);
    NodeFs.writeFileSync(path,data)
}

const addTask = (task)=>{
    const tasks = LoadTasks();
    tasks.push(task);
    saveTasks(tasks);
    console.log("Task added successfully");
}

const removeTask = (arguement)=>{
    const tasks = LoadTasks();
    tasks.splice(arguement-1,1)
    saveTasks(tasks)
}

const listTasks = ()=>{
    const tasks = LoadTasks();
    tasks.forEach((i,index) => {
        console.log(`Task ${index+1} — `,i.arguement);
    });
}

if(command === "Add" || command === "add"){
    addTask({arguement});
}else if(command === "remove" || command === "Remove"){
    removeTask(parseInt(arguement));
}else if(command === "Help" || command === "help"){
    console.log("Command   \t\t | Description");
    console.log("-----------------------------------");
    console.log("Add/add<taskName> : \t  Adds task to json file");
    console.log("Remove/remove<indexNum> : Removes the task at the present index");
    console.log("List/list : \t\t  List/displays all the task present in the file");
}else if(command ==="List" || command === "list"){
    listTasks();
}