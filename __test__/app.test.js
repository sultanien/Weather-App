/** @format */

import app from "../app.js";
import { KelvinToCelsius, setImplementation } from "../app.js";
import supertest from "supertest";

const request = supertest(app);


describe("POST / weather", () => {
  describe("given a city name", () => {
    test("should response with a 200 status code", async () => {
      const response = await request.post("/weather").send({
        city: "Arnhem",
      });
      expect(response.statusCode).toBe(200);
    });

    test("should specify json in the content type header", async () => {
      const response = await request.post("/weather").send({
        city: "Arnhem",
      });
      expect(response.header['content-type']).toEqual(expect.stringContaining("json"))
    });

    test("should KelvinToCelsius() function works properly", () =>{
      expect( KelvinToCelsius(300)).toBe("27.85")
    });
  });

  describe("when the city name is missing", () => {
    test("should response with a 400 status code", async () => {
      const response = await request.post("/weather").send({});
      expect(response.statusCode).toBe(400);
    });
    test("should response with message", async () => {
      const response = await request.post("/weather").send({});
      expect(response.body).toStrictEqual({ msg: "Please enter a city" });
    });
  });

  describe("when the city name is not found", () => {
    test("should response with a 400 status code", async () => {
      const response = await request.post("/weather").send({
        city: "Abc",
      });
      expect(response.statusCode).toBe(400);
    });

    test("should response with message", async () => {
      const response = await request.post("/weather").send({
        city: "Abc",
      });
      expect(response.body).toStrictEqual({ weatherText: "City is not found!" });
    });
  });
});
