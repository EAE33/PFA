const express = require('express')

const app = express()

//Test Call
app.get("/", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.listen(5050, () => { console.log("Server has started on port 5050") })
