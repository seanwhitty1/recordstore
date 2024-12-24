const handleInputChange = (e) => { 
    setSearchItem( e.target.value)
    const regex = new  RegExp(`${e.target.value}`)
    if (recs.filter((record) => regex.test(record.title) == true)){
        console.log("found", recs.filter((record) => regex.test(record[inputQuery])))
      setRecordsByLetter(recs.filter((record) => regex.test(record[inputQuery])))

    } else {
      console.log("nothing found")
    }
}

exports