import { checkServerResponce } from "./Api";

const BASE_URL = process.env.NODE_ENV === 'true'
  ? "https://api.book-finder.crabdance.com"
  : "http://localhost:3001";


export const registration = ({ name, yearOfBirth, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, yearOfBirth, email, password }),
  }).then(checkServerResponce);
};

export const authorization = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkServerResponce);
};

export const isTokenValid = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponce);
};
