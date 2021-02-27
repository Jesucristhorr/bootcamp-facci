import axios from "axios";

const BASE_URL = "https://603a5abff1d6aa0017a10811.mockapi.io/api/v1/";

export class MockApiService {
  constructor() {}

  static async getUsers() {
    const request = await axios.get(`${BASE_URL}users`);

    return request.data;
  }

  static async postUser(user) {
    const request = await axios.post(`${BASE_URL}users`, user);

    return request.data;
  }

  static async deleteUser(id) {
    const request = await axios.delete(`${BASE_URL}users/${id}`);

    return request.data;
  }
}
