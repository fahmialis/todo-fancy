

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

    $('#submit-edit-to-do').on('click', function(event){
        event.preventDefault()

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
                    <button class="btn btn-warning" id="edit-button">Edit</button>
                    <button class="btn btn-danger" onclick=deleteList(${response.data[i].id}) id="delete-button">Delete</button>
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
    .done(() =>[
        findAllList()
    ])
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