

const createRecordGetURL = (genre) => 
    genre? `http://127.0.0.1:3001/records/genre/${genre}`:`http://127.0.0.1:3001/records/`
const baseURL = 'http://localhost:3001/'
const baseURLFront = 'http://localhost:3000/'

const total = (arr) => arr.reduce(function(acc, curr){ return acc += curr.price * curr.quantity; }, 0); 

const uniqueSetOfObjects = function(arr){       
    let uniqueArr = [];
    let map = new Map();
    arr.forEach((obj) => {
    const key = obj.id;
     if (!map.has(key)) {
             map.set(key, true);
             uniqueArr.push(obj)
}}); return uniqueArr }

const compareRecords = function(a, b){
  if ( a.records > b.records){
    return -1;
  }
  if ( a.records < b.records){
    return 1;
  }
  return 0;
}





module.exports = {total, createRecordGetURL, compareRecords, baseURL, baseURLFront, uniqueSetOfObjects};

