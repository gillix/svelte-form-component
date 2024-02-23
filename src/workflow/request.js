import axios from "axios";

export async function request(url, data = {}, callback = null) {
    try {
        const response = await axios.post(url, data);
        if (typeof callback === "function")
            return callback(response.data);
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}
