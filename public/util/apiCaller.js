import _ from 'underscore'
import fetch from 'isomorphic-fetch'

export const API_URL = "http://localhost:3000/api"

export default async function callApi (endpoint, method = 'get', body) {
  let payload = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (_.includes(['post', 'put', 'patch'], method)) {
    _.extend(payload, { body: JSON.stringify(body) })
  }

  return fetch(`${API_URL}/${endpoint}`, payload)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    });
}
