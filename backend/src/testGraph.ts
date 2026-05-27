import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.NEO4J_URI || 'bolt://localhost:7687'
const user = process.env.NEO4J_USERNAME || 'neo4j'
const password = process.env.NEO4J_PASSWORD || 'password'

// Initializing central database connection driver
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

async function verifyGraphConnection() {
    // Open a lightweight database query execution session wrapper
    const session = driver.session()
    try {
        // Running a basic cypher system status check query to echo text back
        const result = await session.run('RETURN "Graph Connection is Active" as message')

        const singleRecord = result.records[0]
        const greeting = singleRecord.get('message')

        console.log(`Neo4j Success: ${greeting}`)
    } catch(error) {
        console.error("Neo4j connection failed: ", error)
    } finally {
        await session.close()
        await driver.close()
    }
}

verifyGraphConnection()