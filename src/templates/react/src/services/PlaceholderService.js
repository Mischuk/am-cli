export default class PlaceholderService {
  API_URL = "https://jsonplaceholder.typicode.com";

  async getResource(url) {
    const res = await fetch(`${this.API_URL}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    const body = await res.json();
    return body;
  }

  getUser = async id => {
    return await this.getResource(`/users/${id}`);
  };
}
