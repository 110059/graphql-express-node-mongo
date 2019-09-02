const Express = require('express');
const ExpressGraphQL = require('express-graphql');
const {
    GraphQLInt,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql');
const Mongoose = require('mongoose');
var app = Express();

Mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true }, () => {
    console.log('database connected');
})

const PersonModel = new Mongoose.model('Person', {
    firstName: String,
    lastName: String,
    age: Number
})

const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        //age: { type: GraphQLInt }
    }}
);


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            people: {
                type: GraphQLList(PersonType),
                resolve: (root, args, context, info) => {
                   return PersonModel.find().exec();
                }
            },
            person: {
                type: PersonType,
                args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
                },
                resolve: (root, args, context, info) => {
                    return PersonModel.findById(args.id).exec();
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            person: {
                type: PersonType,
                args: {
                    firstName: {type: GraphQLNonNull(GraphQLString)},
                    lastName: {type: GraphQLNonNull(GraphQLString)},
                    //age: {type: GraphQLNonNull(GraphQLInt)}
                },
                resolve: (root, args, context, info) => {
                    var person = new PersonModel(args);
                    return person.save();
                }
            }
        }
    })
})

app.use('/graphql', ExpressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen('8080', () => {
    console.log('server started');
})