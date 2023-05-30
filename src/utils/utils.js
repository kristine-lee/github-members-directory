import axios from "axios";
import { API_KEY, GITHUB_URL } from "./constants";

export const fetchUsers = async (since) => {
  const response = await axios.get(GITHUB_URL, {
    params: {
      per_page: 10,
      since: since,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return {
    members: response.data,
    linkHeader: response.headers.get("Link"),
  };
};

export const getUserDetails = async (username) => {
  const response = await axios.get(`${GITHUB_URL}/${username}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const extractNextPageSince = (linkHeader) => {
  if (!linkHeader) return 0;

  const nextPageUrl = linkHeader
    .split(",")
    .find((link) => link.includes('rel="next"'));
  if (!nextPageUrl) return null; // there's no next page. We're at the last page

  const nextPageSince = nextPageUrl.split(";")[0].match(/since=(\d+)/)[1];

  return parseInt(nextPageSince, 10);
};
