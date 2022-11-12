
import {Observable} from 'rxjs';


export const Download = async (data) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url= window.URL.createObjectURL(blob);
        window.open(url);
}
