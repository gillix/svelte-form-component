import axios from "axios";

export async function request(url, data = {}, callback = null) {
    try {
        return (await axios.post(url, data)).data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}
