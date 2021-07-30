import { getAccessTokenApi } from './auth';
import { basePath, apiVersion } from './config';

export function getMenuApi(token) {
    const url = `${basePath}/${apiVersion}/get-menu`

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url)
        .then(response => {
            return response.json()
        }).then(result => {
            return result;
        }).catch(err => {
            return err.message;
        })
}