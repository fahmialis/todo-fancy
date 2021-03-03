

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

    $('#submit-login').on('click', function(event){
        event.preventDefault()
        login()

    })

    $('#submit-register').on('click', function(event){
        event.preventDefault()
        register()


    })

    $('#submit-add-to-do').on('click', function(event){
        event.preventDefault()

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
        console.log(response);
        localStorage.setItem('access_token', response.access_token)
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
    } else {
        $('#register-page').hide()
        $('#to-do-list-page').hide()
        $('#add-to-do-page').hide()
        $('#edit-to-do-page').hide()
        $('#logout-button').hide()
        $('#main-page-button').hide()
    }
}