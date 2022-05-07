import jwt from "jsonwebtoken"

const secret = 'ThisIsASecret'

export async function handler(event, context) {
    const {token} = JSON.parse(event.body);
    console.log(`Verifying token: ${token}`)
    try {
        const {username} = jwt.verify(token, secret);
        console.log(`Token successfully verified. username: ${username}`)
        return {
            statusCode: 200,
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({username: username})
        }

    } catch(err) {
        console.log("Token was invalid")
        return {
            statusCode: 401,
            body: JSON.stringify({error: "Invalid Token"})
        }
    }
}