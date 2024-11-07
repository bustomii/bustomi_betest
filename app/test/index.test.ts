import app from "..";
import { reqCreateUserData, reqDeleteUserData, reqGenerateToken, reqUpdateUserData } from "./json";
const request = require("supertest")

let token = ""

describe("Hai", () => {
    test("should return 1", async () => {
        expect(1).toBe(1)
    });
});

describe("POST /auth", () => {
    test("should generate a token", async () => {
        return request(app)
            .post("/auth")
            .send(reqGenerateToken)
            .expect(200)
            .then((response: { body: { data: { token: string; }; }; }) => {
                token = response.body.data.token
            })
    }
    );
});

describe("POST /user/create", () => {
    test("should create a userData", async () => {
        return request(app)
            .post("/user/create")
            .set('Authorization',  `Bearer ${token}`)
            .send(reqCreateUserData)
            .expect(200)
    });
});

describe("GET /user/data", () => {
    test("should get all userData", async () => {
        return request(app)
            .get("/user/data")
            .set('Authorization',  `Bearer ${token}`)
            .expect(200)
    });
});

describe("PUT /user/update", () => {
    test("should update a userData", async () => {
        return request(app)
            .put("/user/update")
            .set('Authorization',  `Bearer ${token}`)
            .send(reqUpdateUserData)
            .expect(200)
    });
});

describe("DELETE /user/delete", () => {
    test("should delete a userData", async () => {
        return request(app)
            .delete("/user/delete")
            .set('Authorization',  `Bearer ${token}`)
            .send(reqDeleteUserData)
            .expect(200)
    });
});
