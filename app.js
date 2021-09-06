//объект объектов(хранилище тасков)
let objectOfTask = {}
console.log(objectOfTask)

//form
const form = document.forms['addTask'];
const inputTitle = form.elements['title'];
const inputBody = form.elements['body'];
//deleteButton
const deleteButtonParent = document.querySelector('.container .list-group')
console.log(deleteButtonParent)

//событие submit для формы
form.addEventListener('submit', ValueHandler);
//событие удаления
deleteButtonParent.addEventListener('click', deleteHandler);

function deleteHandler (e) {
    if (e.target.classList.contains('delete-btn')) {
        let parent = e.target.closest('[data-task-id]')
        let id = parent.dataset.taskId;
        delete objectOfTask[id]
        parent.remove()
        console.log( id)
        console.log(' hello ')
    }
  
}

// обработчик
function ValueHandler (e) {
    e.preventDefault();
    const titleValue = inputTitle.value
    const bodyValue = inputBody.value
    if (!titleValue||! bodyValue) {
        alert('введите название и тело задачи')
        return
    }
    const newTaskValue = createTask(titleValue,bodyValue);

    const newListElement = createLiElement(newTaskValue)

    document.querySelector('.list-group').insertAdjacentElement('afterbegin', newListElement )
    form.reset()
}


//создание одной задачи
function createTask(title, body) {
    const newTask = {
        title,
        body,
        _id: `task-${Math.random()}`
    }
    objectOfTask[newTask._id] = newTask;
    return newTask

}

//создание одного элемента списка
function createLiElement ({_id, title, body} = {}) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2')
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.classList.add ('bold');

    const paragraph = document.createElement('p')
    paragraph.textContent = body;
    paragraph.classList.add ('mt-2', 'w-100');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add ('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(paragraph);


    return li
}

