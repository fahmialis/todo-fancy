

const baseURL = 'http://localhost:3000/'

$("document").ready(function(){
    checkLocalStorage()

    $('#register-button').on('click', function(event){
        event.preventDefault()
        $('#register-page').show()
        $('#login-page').hide()
        $('#to-do-list-page').hide()
        $('#add-to-do-page').hide()
        $('#edit-to-do-page').hide()
        $('#logout-button').hide()
        $('#main-page-button').hide()
    })

    $('#login-button').on('click', function(event){
        event.preventDefault()
        $('#login-page').show()
        $('#register-page').hide()
        $('#to-do-list-page').hide()
        $('#add-to-do-page').hide()
        $('#edit-to-do-page').hide()
        $('#logout-button').hide()
        $('#main-page-button').hide()
    })

    $('#logout-button').on('click', function(event){
        event.preventDefault()
        logout();    
    })

    $('#submit-login').on('click', function(event){
        event.preventDefault()
        login()

    })

    $('#submit-register').on('click', function(event){
        event.preventDefault()
        register()

    })

    $('#add-to-do').on('click', function(event){
        event.preventDefault()
        $('#add-to-do-page').show()
        $('#to-do-list-page').hide()       
    })

    $('#submit-add-to-do').on('click', function(event){
        event.preventDefault()
        addList()

    })

    $('#edit-button').on('click', function(event){
        // console.log('edit button');
        event.preventDefault()
        $('#edit-to-do-page').show()
        $('#to-do-list-page').hide()       
    })


    $('#submit-edit-to-do').on('click', function(event){
        event.preventDefault()
        submitEdit()

        
    })


})

function login(){
    const email = $('#login-email').val()
    const password = $('#login-password').val()

    $.ajax({
        url : baseURL+'user/login',
        method : 'post',
        data : {
            email,
            password
        }
    })
    .done(response =>{
        // console.log(response);
        localStorage.setItem('access_token', response.access_token)
        checkLocalStorage()
    })
    .fail(err =>{
        console.log(err);
    })
    .always(() =>{
        $('#login-email').val('')
        $('#login-password').val('')
    })
}

function register(){
    const email = $('#register-email').val()
    const password = $('#register-password').val()

    $.ajax({
        url : baseURL+'user/register',
        method : 'post',
        data : {
            email,
            password
        }
    })
    .done(response =>{
        console.log(response);
    })
    .fail(err =>{
        console.log(err);
    })
    .always(() =>{
        $('#register-email').val('')
        $('#register-password').val('')
    })
}

function checkLocalStorage(){
    if(localStorage.access_token){
        $('#to-do-list-page').show()
        $('#logout-button').show()

        $('#login-page').hide()
        $('#register-page').hide()
        $('#add-to-do-page').hide()
        $('#edit-to-do-page').hide()
        $('#main-page-button').hide()
        $('#login-button').hide()
        $('#register-button').hide()

        findAllList()
    } else {
        $('#login-button').show()
        $('#register-button').show()
        $('#login-page').show()

        $('#register-page').hide()
        $('#to-do-list-page').hide()
        $('#add-to-do-page').hide()
        $('#edit-to-do-page').hide()
        $('#logout-button').hide()
        $('#main-page-button').hide()
    }
}

function logout(){
    localStorage.removeItem('access_token')
    checkLocalStorage()
}

function findAllList(){
    $('#to-do-list').empty()
    $.ajax({
        url : baseURL+'todos',
        method : 'get',
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(response =>{
        // console.log(response);
        // console.log(response.action.message);
        $('#suggestion').append(`Our suggestion for today = ${response.action.message.activity}`)
        for( let  i= 0; i < response.data.length; i++){

            $('#to-do-list').append(
                `
                <tr>
                <th scope="row">${response.data[i].id}</th>
                <td>${response.data[i].title}</td>
                <td>${response.data[i].description}</td>
                <td>${response.data[i].due_date}</td>
                <td>${response.data[i].status}</td>
                <td>
                    <button class="btn btn-warning" onclick=editTask(${response.data[i].id}) id="edit-button">Edit</button>
                    <button class="btn btn-danger" onclick=deleteList(${response.data[i].id}) id="delete-button">Delete</button>
                    <button class="btn btn-success" onclick="completeTodo(${response.data[i].id})">Complete</button>
                </td>
              </tr>
                `
            )
        }

    })
    .fail( err =>{
        console.log(err);
    })
}

function deleteList(id){
    $.ajax({
        url : baseURL+'todos/'+id,
        method : 'delete',
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(() =>{
        findAllList()
    })
    .fail(err =>{
        console.log(err);
    })
}

function addList(){
    const title = $('#add-task').val()
    const description = $('#add-description').val()
    const due_date = $('#add-due-date').val()

    // console.log(title, description, due_date);

    $.ajax({
        url : baseURL+'todos',
        method : 'post',
        headers : {
            access_token : localStorage.access_token
        },
        data : {
            title, description, due_date
        }
    })
    .done(() =>{
        findAllList()
    })
    .fail(err =>{
        console.log(err);
    })
    .always(() =>{
        $('#add-task').val('')
        $('#add-description').val('')
        $('#add-due-date').val('')
        $('#to-do-list-page').show() 
        $('#add-to-do-page').hide()
    })
}

function editTask(id){
    // console.log('masuk edit');
    $('#edit-to-do-page').show()
    $('#to-do-list-page').hide()
    // console.log(id);

    $.ajax({
        url : baseURL+'todos/'+id,
        method : 'get',
        headers : {
            access_token : localStorage.access_token
        },
    })
    .done(response =>{
        // console.log(response.data);
        localStorage.setItem('ToDoId', `${response.data.id}`)
        $('#edit-title').val(`${response.data.title}`)
        $('#edit-description').val(`${response.data.description}`)
        $('#edit-due-date').val(`${response.data.due_date}`)
    })
    .fail(err =>{
        console.log(err);
    })
    

}

function submitEdit(){
    const id = localStorage.ToDoId
    const title = $('#edit-title').val()
    const description = $('#edit-description').val()
    const due_date = $('#edit-due-date').val()

    // console.log(id,title, description, due_date );

    $.ajax({
        url : baseURL+'todos/'+id,
        method : 'put',
        headers : {
            access_token : localStorage.access_token
        },
        data : {
            id,title, description, due_date
        }

    })
    .done(() => {
        localStorage.removeItem('ToDoId');
        checkLocalStorage();
    })
    .fail((err) => {
        console.log(err);
    })

}

function completeTodo(id){
    // console.log(id);
    $.ajax({
        url : baseURL+'todos/'+id,
        method : 'patch',
        headers : {
            access_token : localStorage.access_token
        },
        data : {
            status : 'completed'
        }
    })
    .done(() =>{
        findAllList()
    })
    .fail(err =>{
        console.log(err);
    })
    
}

