import { test, expect} from '@playwright/test'

test.describe("Full Stack micro-services health check", () => {
    test('Should confirm Node/Express MERN gateway is live', async ({request}) => {
        // Sending a direct HTTP GET request to your node server port
        const response = await request.get('http://127.0.0.1:5000/ping')

        // Assert that the server handles network traffic with a 200 ok success code
        expect(response.ok()).toBeTruthy()

        // Unpacking json data payload response
        const data = await response.json()

        // Validating explicit backend text output contract
        expect(data.message).toBe("Express backend is Live and Listening!")
    })

    test('Should confirm Python FastAPI graph engine is Live', async({request}) => {
        // Sending a direct HTTP GET request to Python server port
        const response = await request.get('http://127.0.0.1:8000/health')

        // Assert that Python app responds successfully
        expect(response.ok()).toBeTruthy()

        const data = await response.json()

        // Validating structural key properties returned by FastAPI dictionary model
        expect(data.status).toBe("Online")
        expect(data.service).toBe("graph-service")
    })
})