const total = (arr) => arr.reduce(function(acc, curr){ return acc += curr.price * curr.quantity; },0); 
//for our arr.reduce function, it is a higher order function 
//our first argument is the callback functionc (which takes two arguments, accumulator + currentvalue)
//its function is that it will add the current value to the accumulator and return the accumulated result
//the second (optional) argument is our initializing value which we can set at 0 
/*
const deleteHandler = async(id) => {
    let selectedRecord = $(`#${recordID}`)
    selectedRecord.fadeOut(400);
    await axios.delete(`http://127.0.0.1:3001/records/delete/${id}`);  
    setTimeout(async() => {   
        //here we want to refetch the records. we can do this with redux
        fetch(`http://127.0.0.1:3001/records/`)
        .then(response => response.json())
        .then(res => setCount(res))
    },3000)
}*/

const createURL = (genre) => 
    genre? `http://127.0.0.1:3001/records/genre/${genre}`: `http://127.0.0.1:3001/records/`

const baseURL = 'http://127.0.0.1:3001/'


module.exports = {total,  createURL, baseURL}

