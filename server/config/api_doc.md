# My To-Do App Server
My To-Do App is an application to manage your To-Do. It performs standard CRUD actions based on RESTful concept.

This app has : 
* RESTful endpoint for To-Do App's CRUD operation
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

&nbsp;

## RESTful endpoints
### GET /assets

> Get all assets

```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
{

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

---
### GET /assets/:id

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

---
### POST /assets

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

---
### PUT /assets/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

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

---
### DELETE /assets/:id

> Delete an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK) - Alternative 1_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (200 - OK) - Alternative 2_
```
{
  "message": "asset successfully deleted"
}
```