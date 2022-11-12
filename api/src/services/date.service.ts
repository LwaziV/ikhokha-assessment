
export class DateService {
        getTodaysDate() {
                let date = new Date();
                const month = date.getUTCMonth() + 1;
                const day = date.getUTCDate();
                const year = date.getUTCFullYear();
                const newdate = year + "-" + month + "-" + day;
                return newdate;
        }
}

