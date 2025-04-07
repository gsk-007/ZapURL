import { describe, expect, test } from "vitest";
import app from "../../server";
import request from "supertest";

describe("shotenUrl endpoint tests", () => {
  test("fails when a long url is not provided", async () => {
    await request(app).post("/api/shorten").send({}).expect(400);
  });

  test("fails when an invalid url is provided", async () => {
    await request(app)
      .post("/api/shorten")
      .send({ long_url: "invalid_url" })
      .expect(400);
  });

  test("creates a new short url", async () => {
    const payload = { long_url: "https://github.com" };
    const response = await request(app)
      .post("/api/shorten")
      .send(payload)
      .expect(201);

    expect(response.body.original_url).toBe(payload.long_url);
  });

  test("responds with the short for an existing url", async () => {
    const payload = { long_url: "https://github.com" };
    await request(app).post("/api/shorten").send(payload).expect(201);

    const response = await request(app)
      .post("/api/shorten")
      .send(payload)
      .expect(200);
    console.log(response);
    expect(response.body.original_url).toBe(payload.long_url);
  });
});
