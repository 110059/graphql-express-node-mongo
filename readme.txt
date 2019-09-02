>> nodemon app.js
>> http://localhost:8080/graphql

1- find all people
{
    people {
        id,
        firstName,
        lastName
    }
}

2 - get any person by id
{
    person (id: 11) {
        id,
        firstName,
        
    }
}
or
{
    person (id: 11) {
        id,
        firstName,
        
    },
    people {
        lastName
    }
}


3 - create new

mutation createPerson($firstName: String!, $lastName: String!) {
    person(firstName: $firstName, lastName: $lastName) {
        id,
        firstName,
        lastName
        
    }
}

query variable
{
  "firstName": "ved",
  "lastName": "maurya",
}