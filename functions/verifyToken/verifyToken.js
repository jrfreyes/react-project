import jwt from "jsonwebtoken"

const secret = 'ThisIsASecret'

export async function handler(event, context) {
    const {token} = JSON.parse(event.body);
    try {
        const {username} = jwt.verify(token, secret);
        return {
            statusCode: 200,
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({username: username})
        }

    } catch(err) {
        return {
            statusCode: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="health-monitoring"'
            },
            body: {error: "Invalid Token"}
        }
    }
}