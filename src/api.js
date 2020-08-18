const BASE_URL = 'https://thinkful-list-api.herokuapp.com/BrunoM';


const apiFetch = function (...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };

        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }

      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
};

const getItems = function () {
  return apiFetch(`${BASE_URL}/items`);
};

const createItem = function (name) {
  const newItem = JSON.stringify({ name });
  return apiFetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  });
};

const deleteItem = function (id) {
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE'
  });
};

const updateItem = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};