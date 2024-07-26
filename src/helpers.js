const createRecordGetURL = (genre) => 
    genre? `http://127.0.0.1:3001/records/genre/${genre}`: `http://127.0.0.1:3001/records/`
const baseURL = 'http://localhost:3001/'
const baseURLFront = 'http://localhost:3000/'
const total = (arr) => arr.reduce(function(acc, curr){ return acc += curr.price * curr.quantity; },0); 

module.exports = {createRecordGetURL, baseURL, baseURLFront, total};

