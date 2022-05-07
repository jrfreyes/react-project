import jwt from "jsonwebtoken"

const secret = 'ThisIsASecret'

export async function handler(event, context) {
    try {
        const {username} = JSON.parse(event.body);
        if (username) {
            console.log(`Providing token to user: ${username}`)
            let token
            try {
                token = jwt.sign({
                    username: username
                }, secret, { expiresIn: '1h' })
            } catch (error) {
                console.log(error)
            }
            console.log(`Token: ${token}`)
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ 
                    token: token
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
    return {
        statusCode: 401,
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({error: "Request must contain username"})
    }

}