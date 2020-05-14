# :busts_in_silhouette: Users API

The *ERP-RPG Users API* handles basic information about the user. For authentication, you should use the _Auth API_. For information related to skills, stats and any other technical information related to the user job see _Character API_.

For the users CRUD, nickname and id contain the same value.

## List all users

Neither filter or pagination logic is implemented yet

    GET /users

Sample response to a valid request:

    [
      {
        "gender": "male",
        "created": 1589466072614,
        "active": true,
        "_id": "jdoe",
        "name": "Jon Doe",
        "email": "jdoe@domain.com",
        "__v": 0,
        "nickname": "jdoe",
        "id": "jdoe"
      },
      {
        "gender": "female",
        "created": 1589466072614,
        "active": true,
        "_id": "janedoe",
        "name": "Jane Doe",
        "email": "jdoe@otherdomain.com",
        "__v": 0,
        "nickname": "janedoe",
        "id": "janedoe"
      }
    ]

## View detailed user information

    GET /users/:nickname

Sample response to a valid request:

    {
      "gender": "male",
      "created": 1589466072614,
      "active": true,
      "\_id": "jdoe",
      "name": "Jon Doe",
      "email": "jdoe@domain.com",
      "\_\_v": 0,
      "nickname": "jdoe",
      "id": "jdoe"
    }

## Create new user

    POST /users

Sample response to a valid request:

      {
        "message": "User added successfully",
        "savedUser": {
          "gender": "male",
          "created": 1589466072614,
          "active": true,
          "name": "Jon Doe",
          "_id": "jdoe",
          "email": "jdoe@domain.com",
          "__v": 0,
          "nickname": "jdoe",
          "id": "jdoe"
        }
      }

## Update user information

    PUT /users/:nickname

Sample response to a valid request:

    {
      "message": "User updated successfully",
      "user": {
        "gender": "not specified",
        "created": 1589466072614,
        "active": true,
        "_id": "jdoe",
        "name": "Dario Cruz2",
        "email": "dcruz@altimetrik.com",
        "__v": 0,
        "nickname": "jdoe",
        "id": "jdoe"
      }
    }

## Delete one user

    DELETE /users/:nickname

Sample response to a valid request:

    {
      "message": "User deleted successfully",
      "user": {
        "gender": "male",
        "created": 1589466072614,
        "active": true,
        "_id": "jdoe",
        "name": "Jon Doe",
        "email": "jdoe@domain.com",
        "__v": 0,
        "nickname": "jdoe",
        "id": "jdoe"
      }
    }
