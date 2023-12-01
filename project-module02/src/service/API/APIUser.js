import axios from "axios";

export default {
    register: async (data) => {
        return await axios.post("http://localhost:8200/users", data)
    },
    checkRegister: async (email) => {
        return await axios.get(`http://localhost:8200/users?email=${email}`)
    },

    checkLogin: async (email, password) => {
        // console.log(email, password);
        return await axios.get(`http://localhost:8200/users?email=${email}&&password=${password}`)
    }

}