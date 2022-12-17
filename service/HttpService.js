/*-- Axios --*/
import axios from "axios";

export const callApi = async (HTTPmethod, apiBody, url) => {
    return (await axios({
        method: HTTPmethod,
        url: url,
        data: apiBody
    }).then(res => {
        if (res.status === 404) {
            return { responseCode: 0 }
        }
        else if (res.status >= 200 && res.status < 300) {
            return { responseCode: 1, response: res.data };
        }
    })
        .catch(error => {
            return { responseCode: 400 }
        }));
}