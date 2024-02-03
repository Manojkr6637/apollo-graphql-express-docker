
import express from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware } from '@apollo/server/express4';

async function init(){   
  const port = Number(process.env.PORT) || 8000
  const app = express(); 
  app.use(express.json());     
    const server = new ApolloServer({
      typeDefs: `
      type Query{
        hello: String,
        say(name: String): String
      }
      `,
      resolvers: {
        Query:{
          hello:()=>'Hello there, I am an graphql  ff',
          say:(_, {name}:{name: String})=>`Hello ${name}, I am an graph`
        }
      },
    })

   await server.start();
     app.use('/graphql', expressMiddleware(server))
     app.get('/', (req, res) => {
      res.json({message: 'server is up and running'})
     })
    app.listen(port, () => {
      console.log(`Server listening on ${port}`) 
    })
}

init()
 