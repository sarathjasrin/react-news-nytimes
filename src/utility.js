import request from 'axios';
import { MONTHS, API_KEY, API_ENDPOINT } from "./constants";

class Utility {
    postDate(date) {
        let d = typeof date == "object" ? date : new Date(date);
        return `${MONTHS[d.getMonth()] + " " + d.getDate()}, ${d.getFullYear()}`;
    }

    sendRequest(url, data = [], type = "get") {
        return new Promise((resolve, reject) => {
            url = API_ENDPOINT + url + "?api-key=" + API_KEY+"&"
            if (type === "get") {
                request.get(url+data)
                    .then(res => resolve(res)).catch(err =>reject(err))
            } else if (type === 'post') {
               // request.get(API_ENDPOINT + url)
            }else{
                return reject("Invalid requests")
            }
        });
    }

    getPager(total,count){
        return Math.ceil(total/count);
    }
}

export default new Utility();