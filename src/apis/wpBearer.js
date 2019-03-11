import axios from 'axios'

const Auth  = `Bearer ${localStorage.getItem("authToken")}`;

export default axios.create({
    baseURL: 'http://10.10.10.224/restapi/wp-json',
    headers : {
        "Content-Type" : "application/json",
        "Authorization": Auth
      }
})
