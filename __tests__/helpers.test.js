
//Here we have initialized our test suite for our helper functions
//When outside of the React module we need to use require instead of import
//lets declare a destructured method by using require and the path for our helpers file 
const { total, createURL } = require("../src/helpers");

const arrayOfRecords = [{artist: 'artist 1', title: 'album 1', price: 10},
{artist: 'artist 2', title: 'album 2', price: 20 },
{artist: 'artist 3', title: 'album 3', price: 30},
{artist: 'artist 4', title: 'album 4', price: 50},
]

describe("total function test suite", function () {
    //here we use describe to add text to a run of tests, the first argument is the text description
    //second argument is the callback function which will execute our tests, lets write one 
    test('add total price of array of items', function () {
        //we name our test with the first argumnent, then the second is the callback to execute
        let totalPrice = total(arrayOfRecords)
        expect(totalPrice).toEqual(110)
    })
});

describe("createURL function test suite", function () {
    //tests to check our dynamic URL creator
    test('create genre specific URL when argument passed', function () {
        let url = createURL("rock")
        let url2 = createURL ("funk")
        expect(url).toEqual('http://127.0.0.1:3001/records/genre/rock')
        expect(url2).toEqual('http://127.0.0.1:3001/records/genre/funk')
    })

    test('create non genre routed URL when no genre argument passed', function () {
        let genericUrl = createURL()
        expect(genericUrl).toEqual('http://127.0.0.1:3001/records/')
    })
})
