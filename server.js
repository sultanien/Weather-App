import app from "./app.js";

//Creates our express server
const PORT = process.env.PORT || 3000;

//Makes the app listen to port 3000
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));

