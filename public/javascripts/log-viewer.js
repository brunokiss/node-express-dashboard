const connection = new WebSocket("ws://localhost:3000");
const logWindow = document.querySelector("#log-window");
const filePath = document.getElementById("logFilePath").value;

connection.onopen = (event)=>{
    if (filePath)
        connection.send(filePath);
    //connection.send("Hello from the client!");
};

connection.onmessage = (event)=>{
    //logWindow.innerHTML = event.data;
    const logs = event.data.split("\n").join("<hr>");
    logWindow.innerHTML = logs;
};

