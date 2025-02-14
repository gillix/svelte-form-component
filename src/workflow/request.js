import axios from "axios";

export async function request(url, data = {}, callback = null) {
    try {
        return (await axios.post(url, data, {withCredentials: true})).data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}
