const BASE_URL = "production"
  ? "https://api.book-finder.crabdance.com"
  : "http://localhost:3001";

const checkServerResponce = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

function getCurrentUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponce);
}

function updateCurrentUser(data, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(checkServerResponce);
}

function addFavoriteBook(data, token) {
  return fetch(`${BASE_URL}/books/me/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(checkServerResponce);
}

function addReadBook(data, token) {
  return fetch(`${BASE_URL}/books/me/read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(checkServerResponce);
}

function removeFavoriteBook(id, token) {
  console.log("Book ID to be removed:", id);
  return fetch(`${BASE_URL}/books/me/favorite/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponce);
}

function removeReadBook(id, token) {
  console.log("Book ID to be removed:", id);
  return fetch(`${BASE_URL}/books/me/read/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponce);
}

function getUserFavoriteBooks(token) {
  return fetch(`${BASE_URL}/books/me/favorite`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponce);
}

function getUserReadBooks(token) {
  return fetch(`${BASE_URL}/books/me/read`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkServerResponce);
}

export {
  checkServerResponce,
  updateCurrentUser,
  getCurrentUser,
  addFavoriteBook,
  addReadBook,
  removeFavoriteBook,
  removeReadBook,
  getUserFavoriteBooks,
  getUserReadBooks,
};
