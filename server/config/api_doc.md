# My To-Do App Server
My To-Do App is an application to manage your To-Do. It performs standard CRUD actions based on RESTful concept.

This app has : 
* RESTful endpoint for To-Do App's CRUD operation
## GET /
## POST /user/register
## POST /user/login
## POST /todos
## GET /todos
## GET /todos/:id
## PUT /todos/:id
## PATCH /todos/:id
## DELETE /todos/:id
* JSON formatted response

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL

&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (400 - Bad Request)_
```
{
  "message": "Invalid data"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "You are not allowed to access this part"
}
```

_Response (404 - Data not found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

&nbsp;

## RESTful endpoints

### user


### POST /user/register

> Registering new account

_Request Body_
```
{
    {
      "email" : "asdf@mail.com",
      "password" : "asdf1234",
    },
}
```

_Response (201 - Created)_
```
[
  {
    "id": 1,
    "email" : "asdf@mail.com",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
]
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

### POST /user/login

> Login into existing account

_Request Body_
```
{
    {
      "email" : "asdf@mail.com",
      "password" : "asdf1234",
    },
}
```

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "email" : "asdf@mail.com",
  },
]
```

_Response (401 - Unauthorized)_
```
{
  "message": "You are not allowed to access this part"
}
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

### POST /user/loginGoogle

> Login into existing account

_Request Body_

_Response (200 - OK)_
```
[
  {
    "id": 1,
    "email" : "asdf@mail.com",
  },
]
```

_Response (401 - Unauthorized)_
```
{
  "message": "You are not allowed to access this part"
}
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

### todos

### POST /todos

> Create new asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    {
    "title": "Learn REST API",
    "description": "learn how to create RESTful API with express and sequelize",
    "status" : "on progress",
    "due date": "2021-03-02",  
    },
    {
    "name": "makan siang",
    "description": "makan siang",
    "status" : "on progress",
    "due date": "2021-03-02",
    }
}
```

_Response (201 - Created)_
```
[
  {
    "id": 1,
    "title": "Learn REST API",
    "description": "learn how to create RESTful API with express and sequelize",
    "status" : "on progress",
    "due date": "2021-03-02",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "makan siang",
    "description": "makan siang",
    "status" : "on progress",
    "due date": "2021-03-02",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid data"
}
```

### GET /todos

> Get all assets

```
{
  "Content-type": "application/json"
}
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "Learn REST API",
    "description": "learn how to create RESTful API with express and sequelize",
    "due date": "2021-03-02",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "makan siang",
    "description": "makan siang",
    "due date": "2021-03-02",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

---
### GET /todos/:id

> Get single asset as defined by the id provided

_Request Header_
```
```
{
  "Content-type": "application/json"
}
```
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 1,
    "title": "Learn REST API",
    "description": "learn how to create RESTful API with express and sequelize",
    "due date": "2021-03-02",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```


---


---
### PUT /todos/:id

> Update an asset defined by the id provided


_Request Body_
```
{
  "name": "change task",
  "description": "changing current task into a new one",
  "status" : "finished",
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "name": "change task",
  "description": "changing current task into a new one",
  "status" : "finished",
  "due date": "2021-03-02",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

### PATCH /todos/:id

> Update an asset defined by the id provided


_Request Body_
```
{
  "status" : "finished",
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "name": "change task",
  "description": "changing current task into a new one",
  "status" : "finished",
  "due date": "2021-03-02",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

---
### DELETE /todos/:id

> Delete an asset defined by the id provided


_Request Body_
```
not needed
```


_Response (200 - OK) - Alternative 2_
```
{
  "message": "task successfully deleted"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Server error)_
```
{
  "message": "Internal server error"
}
```

