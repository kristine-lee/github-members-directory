import axios from "axios";
import { fetchUsers, extractNextPageSince } from "./utils";

jest.mock("axios");

describe("fetchUsers", () => {
  it("should fetch users and linkHeader", async () => {
    const mockData = [
      { login: "foo", id: 1 },
      { login: "bar", id: 4 },
      { login: "baz", id: 5 },
      { login: "wheeee", id: 6 },
      { login: "yo!", id: 8 },
      { login: "enum", id: 9 },
      { login: "hmmmm", id: 11 },
      { login: "bird", id: 14 },
      { login: "hi", id: 17 },
      { login: "ybye", id: 18 },
    ];
    const mockResponse = {
      headers: { get: jest.fn().mockReturnValue("mock link header") },
      data: mockData,
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await fetchUsers(1);

    expect(axios.get).toHaveBeenCalledWith("https://api.github.com/users", {
      params: {
        per_page: 10,
        since: 1,
      },
      headers: {
        Authorization: "Bearer undefined",
      },
    });
    expect(response.members).toEqual(mockData);
    expect(response.linkHeader).toEqual("mock link header");
  });
});

describe("extractNextPageSince", () => {
  it("should return null when no next page URL is found in linkHeader", () => {
    const linkHeader =
      '<https://api.github.com/users?per_page=10&since=12345>; rel="last"';
    const result = extractNextPageSince(linkHeader);
    expect(result).toBe(null);
    expect(result).not.toBe(12345);
  });

  it("should extract the next page since value when linkHeader is valid", () => {
    const linkHeader =
      '<https://api.github.com/users?per_page=10&since=34534>; rel="next" <https://api.github.com/users?per_page=10&since=0>; rel="first"';
    const result = extractNextPageSince(linkHeader);
    expect(result).toBe(34534);
    expect(result).not.toBe(0);
  });
});
