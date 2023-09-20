function setclock() {
    let time = new Date();
    let hour = modifynumber(time.getHours());
    let min = modifynumber(time.getMinutes());
    let timehtml = document.getElementsByClassName("time");
    // console.log(timehtml);
    timehtml[0].innerHTML = hour + ":" + min;
}

function modifynumber(n) {
    if (parseInt(n)<10) {
        n = "0"+n;
    }
   return n;
}

//이름이 없을 경우 이름설정
function namesetting() {
    let gotname = localStorage.getItem("name")
    if(gotname == null) {
        let input_name = document.createElement("input");
        input_name.setAttribute("class", "name-input");
        input_name.setAttribute("type", "text");
        input_name.setAttribute("placeholder", "Type your name here");

        let name_div = document.getElementsByClassName("name");
        name_div[0].append(input_name);

        input_name.addEventListener("keypress", function(key){
            if (key.key == "Enter") {
                let inputValve = input_name.value;
                localStorage.setItem("name", inputValve);
                input_name.remove();
                displayName(inputValve);
            }
        })
        
    } else {
        displayName(gotname);
    }
    
}

//이름보여주기
function displayName(name) {
    let name_div = document.getElementsByClassName("name");
    let nameDisplay = document.createElement("div");
    nameDisplay.innerHTML = name;
    name_div[0].append(nameDisplay);
    
}

//todo를 html에서 입력받고 localstorage에 저장
function todoSetting() {
    let todo_div = document.getElementById("todoinput");
    

    todo_div.addEventListener("keypress", function(key){
        if (key.key == "Enter") {
            let inputValve = todo_div.value;
            let todolist = JSON.parse(localStorage.getItem("todos"));
            let makeid;
            console.log(todolist)
            if(todolist == null || todolist.length == 0) {
                todolist = [{id:1, value:inputValve}];
                localStorage.setItem("todos", JSON.stringify(todolist));
                makeid = 1;
            } else {
                let lastid = todolist[todolist.length-1].id
                todolist.push({id:lastid+1, value:inputValve});
                localStorage.setItem("todos", JSON.stringify(todolist));
                makeid = lastid+1
            }

            todoul = document.getElementsByClassName("todolist");
            todoul[0].append(make_todo_form(inputValve, makeid));

        }
    })
}

//todo를 보여주기
function drawTodo() {
    if (localStorage.getItem("todos") == null) {
        return 0;
    }

    let todos = JSON.parse(localStorage.getItem("todos"));

    let todo_div = document.getElementsByClassName("todo_div");

    let todoul = document.getElementsByClassName("todolist")[0];

    let setTodo = []
    let id = 1
    for(let todo of todos) {
        todoul.append(make_todo_form(todo.value, id))
        setTodo.push({"id":id,value:todo.value})
        id = id + 1
    }
    localStorage.setItem("todos", JSON.stringify(setTodo));

    todo_div[0].append(todoul)
}

//todo 태그 객체 만들기
function make_todo_form(todo ,id) {
    let todoli = document.createElement("li");
    todoli.setAttribute("class", "todo");
    todoli.setAttribute("id", id);
    let content = document.createElement("p");
    content.innerHTML = todo;
    let delButton = document.createElement("button");
    delButton.onclick = function() {
        let par = delButton.parentElement;
        parentID = par.id;
        let todos = JSON.parse(localStorage.getItem("todos"));
        console.log(par.id)
        for (let i = 0; i < todos.length; i++) {
                if(todos[i].id == parentID) {
                    todos.splice(i, 1)
                break
            }
        }
        console.log(todos)
        localStorage.setItem("todos", JSON.stringify(todos));
        par.remove()
    }
    todoli.append(delButton)
    todoli.append(content)

    return todoli
}


function init() {
    namesetting();   
    drawTodo();
    todoSetting();
    setclock();
    setInterval(setclock, 1000);
}

init();