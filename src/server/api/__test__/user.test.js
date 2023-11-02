const request = require("supertest");
const app = require('../../app');
const prismaMock = require('../__test__/prismaMock');

const bcrypt = require('bcrypt')
jest.mock('bcrypt')

const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken');

describe('/api/userData', () => {
    beforeEach(() => {
        jwt.sign.mockReset();
        bcrypt.hash.mockReset();
        bcrypt.compare.mockReset();
    });
    describe('GET /api/userData', () => {
        it('returns list of all users', async () => {
            const user = [
                { id: 1, username: 'albert', name: 'Al Bert', password: 'bertie99', location: "Sidney, Australia" },
                { id: 2, username: 'sandra', name: 'Just Sandra', password: '2sandy4me', location: "Ain\'t tellin\'" },
                { id: 3, username: 'glamgal', name: 'Joshua', password: 'soglam', location: "Upper East Side" }
            ];
            
            prismaMock.user.findMany.mockResolvedValue(user);

            
            const response = await request(app)
                .get('/api/userData');



            expect(response.body).toEqual(user);
            console.log(response.body);
        });
    })
})

test("GET /api/userData - Get all users ", async () => {
    const response = await request(app).get("/api/userData")

    let userData = [
        { id: 1, username: 'albert', name: 'Al Bert', password: 'bertie99', location: "Sidney, Australia" },
        { id: 2, username: 'sandra', name: 'Just Sandra', password: '2sandy4me', location: "Ain\'t tellin\'" },
        { id: 3, username: 'glamgal', name: 'Joshua', password: 'soglam', location: "Upper East Side" }
    ];



    expect(response.statusCode).toBe(200);


    const user = response.body;

    expect(userData.id).toBe(1)
    expect(userData.username).toBe("albert");
    expect(userData.password).toBe("bertie99");
    expect(userData.name).toBe("Al Bert");
    expect(userData.location).toBe("Sidney, Australia")

});

