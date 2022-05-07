import jwt from "jsonwebtoken"

const secret = 'ThisIsASecret'

export async function handler(event, context) {
    const {username} = JSON.parse(event.body);
    
    if (username) {
        console.log(`Providing token to user: ${username}`)
        return {
            statusCode: 200,
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ 
                token: jwt.sign({
                    username: username
                }, secret, { expiresIn: '1h', algorithm: 'RS256' }) 
            })
        }
    } else {
        return {
            statusCode: 401,
            headers: {
                "Content-Type": 'application/json',
                "WWW-Authenticate": 'Basic realm="health-monitoring"'
            },
            body: JSON.stringify({error: "Request must contain username"})
        }
    }
}