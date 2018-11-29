# ibmHackBackend
RESTapi backend

# usage 

Installation:
`npm i`

Start:
`npm start`

Methods:
* POST "/users/"
    ```
    {
        name: String,
        email: String,
        work: String,
        specialty: String,
        password: String
    }
    ```
* GET "/users/_id"
    ```
    {
        _id: String,
        name: String,
        email: String,
        work: String,
        specialty: String,
    }
    ```
* PUT "/users/id"
    ```
    {
        _id: String,
        name: String,
        email: String,
        work: String,
        specialty: String,
    }
    ```
* DELETE "/users/id"
