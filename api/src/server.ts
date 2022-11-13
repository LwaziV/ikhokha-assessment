import app from "./config/app";
import * as dotenv from 'dotenv';
dotenv.config();
const environment = process.env.environment || 'development';
const PORT: any = process.env.PORT || 3000;

    // Start the express server
    app.listen(PORT, () => {
      console.log('Express server listening on port ' + PORT);
    });
    if(environment !== 'development') {
      console.log = () => {};
    }



