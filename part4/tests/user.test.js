const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
require('express-async-errors')

const api = supertest(app)

beforeAll( async () => {
    User.deleteMany()

    const firstUser = {
        username: 'til',
        name: 'eastwest',
        password: '123'
    }

    await api.post('/api/users').send(firstUser)
})

describe('user requests: ', () => {
    test('POST: username must be given', async () => {
        const user = {
            /* username: 'asd',*/
            name: 'dogu',
            password: 'hardToGuess'
        }
        await api.post('/api/users')
        .send(user)
        .expect(400)
    }),
    test('POST: password must be given', async () => {
        const user = {
            username: 'asd',
            name: 'dogu',
            /*password: 'hardToGuess'*/
        }
        await api.post('/api/users')
        .send(user)
        .expect(400)
    }),
    test('POST: username must be at least length of 3', async () => {
        const user = {
            username: 'as',
            name: 'dogu',
            password: 'hardToGuess'
        }
        await api.post('/api/users')
        .send(user)
        .expect(400)
    }),
    test('POST: password must be at least length of 3', async () => {
        const user = {
            username: 'asd',
            name: 'dogu',
            password: 'ha'
        }
        await api.post('/api/users')
        .send(user)
        .expect(400)
    }),
    test('POST: username must be unique', async () => {
        const user = {
            username: 'til',
            name: 'dogu',
            password: 'ha'
        }
        const res = await api.post('/api/users')
        .send(user)
        .expect(400)

        expect(res.body.error).toContain('password must be at least 3')
    })
})

afterAll( () => {
    mongoose.connection.close()
})
