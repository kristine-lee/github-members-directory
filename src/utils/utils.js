import axios from "axios";
import { API_KEY, GITHUB_URL } from "./constants.js";


export const fetchUsers = async (since) => {
  const response = await axios.get(GITHUB_URL, {
    params: {
      per_page: 10,
      since: since
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  });
  return {
    members: response.data, linkHeader: response.headers.get("Link")
  };
};


//TODO: think about optimizing this function. JS string manipulation is more performant than regex (but this is also basically using regex so idk)
export const extractNextPageSince = (linkHeader) => {
  if (!linkHeader) return 0;

  const nextPageUrl = linkHeader
    .split(',')
    .find((link) => link.includes('rel="next"'));
  if (!nextPageUrl) return 0;

  const nextPageSince = nextPageUrl
    .split(';')[0]
    .match(/since=(\d+)/)[1];

  return parseInt(nextPageSince, 10);
};
