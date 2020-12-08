const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector(".js-toDoList");

const toDos_LS = 'toDos';

const toDos = [];

function deleteToDo(event){
    console.log(event.target.parentNode)

}

function saveToDos(){
    localStorage.setItem(toDos_LS, JSON.stringify(toDos))
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(toDos_LS)
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}
function paintToDo(text){
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    const newId = toDos.length + 1
    delBtn.innerText = "X";
    delBtn.addEventListener('click', deleteToDo)
    const span = document.createElement("span");
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}
init()