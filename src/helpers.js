const createRecordGetURL = (genre) => 
    genre? `http://127.0.0.1:3001/records/genre/${genre}`: `http://127.0.0.1:3001/records/`
//both arrays

const baseURL = 'http://localhost:3001/'


module.exports = {createRecordGetURL, baseURL};

