const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())

let accessToken = null
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const getAccessToken = async () => {
    try {
        const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            }),
        })
        const data = await response.json();
        accessToken = data.access_token
        console.log("Access Token:", accessToken)
    } catch (error) {
        console.error("Error fetching access token:", error)
        throw error
    }
}

getAccessToken()

app.get("/dogs", async (req, res) => {
    try {
        const animalsList = await fetch('https://api.petfinder.com/v2/animals?type=dog', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const animalData = await animalsList.json()
        res.json(animalData)
    } catch (error) {
        console.error("Error Fetching Dogs", error)
    }
})

app.get("/cats", async (req, res) => {
    try {
        const animalsList = await fetch('https://api.petfinder.com/v2/animals?type=cat', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const animalData = await animalsList.json()
        res.json(animalData)
    } catch (error) {
        console.error("Error Fetching Cats", error)
    }
})
//Test Call
app.get("/", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.listen(5050, () => { console.log("Server has started on port 5050") })
