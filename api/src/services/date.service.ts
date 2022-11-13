
export class DateService {
        // Generates today's date to be appended to the comments namespace
        getTodaysDate() {
                let date = new Date();
                const month = date.getUTCMonth() + 1;
                const day = date.getUTCDate();
                const year = date.getUTCFullYear();
                const newdate = year + "-" + month + "-" + day;
                return newdate;
        }
}

