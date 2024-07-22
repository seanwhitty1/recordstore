const createRecordGetURL = (genre) => 
    genre? `http://127.0.0.1:3001/records/genre/${genre}`: `http://127.0.0.1:3001/records/`
//both arrays

const baseURL = 'http://127.0.0.1:3001/'



module.exports = {total,createRecordGetURL, baseURL, addToCart};

