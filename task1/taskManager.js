const { error } = require('console');
const fs = require('fs');
const readline = require('readline');

function createPrivateCounter() {
    let count = 0;
    return {
        increment: function() { return ++count; },
        decrement: function() { return --count; },
        getCount:  function() { return count; },
        setCount:  function(num) { count = num; }
    };
}
const taskCounter = createPrivateCounter();
let tasks = [];

function loadTasks() {
    try{
        const data = fs.readFileSync('tasks.json', 'utf8');
        tasks = JSON.parse(data);
        taskCounter.setCount(tasks.length);
        console.log("loaded"+taskCounter.getCount()+"tasks")

    }
    catch (err) {
        throw new Error('No existing tasks found. Starting with an empty task list.');
        tasks = [];
    }

}

function saveTasks(){
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
}
function showStats() {
    if (tasks.length === 0) {
        console.log("No tasks available.");
        return;
    }
    const hasHighPriority = tasks.some(task => task.priority === 'high');
    const allCompleted = tasks.every(task => task.completed);
    const completedCount = tasks.filter(task => task.completed).length;
    console.log("Task Statistics:");
console.log(
    "total tasks: " + taskCounter.getCount() + "\n" +
    "high priority tasks: " + hasHighPriority + "\n" +
    "all tasks completed: " + allCompleted + "\n" +
    "completed tasks: " + completedCount
);
}   
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function mainMenu() {
    console.log("\nTask Manager");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Remove Task");
    console.log("4. Search Tasks");
    console.log ("5. Sort Task");
    console.log("6. Show Statistics");
    console.log("7. Exit");
    rl.question("Choose an option: ", function(option) {
        if (option === '1') {
            rl.question("Enter task description: ", function(description) {
                rl.question("Enter task priority (low, medium, high): ", function(priority) {
                    rl.question("Due date (YYYY-MM-DD): ", function(dueDate) {
                        tasks.push({name: description,priority,dueDate,completed:false});
                        taskCounter.increment();
                        saveTasks();
                        console.log("Task added successfully!");
                        mainMenu();
                    });
                });
            });
        } else if (option === '2') {
            console.log("\nTasks:" ,tasks);
            mainMenu();

        }

        else if (option === '3') {
            rl.question("Enter task name to remove: ", function(name) {
                const initialLength = tasks.length;
                tasks = tasks.filter(function(task) {
                    return task.name !== name;
                });
                if (tasks.length < initialLength) {
                    taskCounter.decrement();
                    saveTasks();
                    console.log("Task removed successfully!");
                } else {
                    console.log("Task not found.");
                }   
                mainMenu();
            });
        }
else if (option === '4') {
    rl.question("Enter keyword to search: ", function(keyword) {
        const result = tasks.filter(function(task) {          
               return task.name.includes(keyword) || task.priority.includes(keyword);
        }    
        );
        console.log("Search results:", result);
        mainMenu();
    });
}
else if (option === '5') {
    rl.question("Sort by (name, priority, dueDate): ", function(criteria) {
        tasks.sort(function(a, b) {
            if (a[criteria] < b[criteria]) return -1;
            if (a[criteria] > b[criteria]) return 1;
            return a[criteria].localeCompare(b[criteria]);
        });
        console.log("Tasks sorted by " + criteria + ":", tasks);
        mainMenu();
    });
}               
else if (option === '6') {
    showStats();
    mainMenu();
}
else if (option === '7') {
    console.log("Exitied");
    rl.close();
}   
else {
    console.log("Invalid option. Please try again.");
    mainMenu();
}
    });
}
loadTasks();
mainMenu();
