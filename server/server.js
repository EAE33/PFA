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
    }
}

// Fetch Dog/Cat List
async function fetchAnimalList(animalType, res) {
    try {
        if (!accessToken) {
            await getAccessToken()
        }
        const animalsList = await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const animalData = await animalsList.json()
        res.json(animalData)
    } catch (error) {
        console.error(`Error Fetching ${animalType}`, error)
    }
}

//Fetch Random Dog
async function fetchRandomDog(req, res) {
    try {
        if (!accessToken) {
            await getAccessToken()
        }
        const dogList = await fetch('https://api.petfinder.com/v2/animals?type=dog', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await dogList.json()
        if (data.animals && data.animals.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.animals.length)
            const randomDogDetails = data.animals[randomIndex]
            res.json(randomDogDetails)
        } else {
            console.log('Error fetching random dog details', error)
        }
    } catch (error) {
        console.error('Error Fetching', error)
    }
}

// Fetch Random Cat
async function fetchRandomCat(req, res) {
    try {
        if (!accessToken) {
            await getAccessToken()
        }
        const catList = await fetch('https://api.petfinder.com/v2/animals?type=cat', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await catList.json()
        if (data.animals && data.animals.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.animals.length)
            const randomCatDetails = data.animals[randomIndex]
            res.json(randomCatDetails)
        } else {
            console.log('Error fetching random cat details', error)
        }
    } catch (error) {
        console.log('Error Fetching', error)

    }
}

app.get("/dogs", async (req, res) => {
    await fetchAnimalList('dog', res)
})

app.get("/cats", async (req, res) => {
    await fetchAnimalList('cat', res)
})

app.get("/rdmdog", async (req, res) => {
    await fetchRandomDog(req, res)
})

app.get("/rdmcat", async (req, res) => {
    await fetchRandomCat(req, res)
})

//Test Call
app.get("/", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.listen(5050, () => { console.log("Server has started on port 5050") })
