import os
from fastapi import FastAPI, HTTPException
from neo4j import GraphDatabase
from dotenv import load_dotenv

# Explicitly loading local environmental files
load_dotenv()

app = FastAPI(
    title="Knowledge Graph Service",
    description="Python FastAPI computational engine handling Neo4j graph traversals",
    version="1.0.0"
)

# Pull env variables
NEO4J_URI=os.getenv("NEO4J_URI")
NEO4J_USER= os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

# Initializing long-lived/heavyweighted Neo4j driver connection pool instance
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

# Python decorators [@app.get()] - its functions as an event listeners.
# Get API Method
@app.get("/health")
def health_check():
    # Base API microservice health check indicator loop
    return {
        "status": "Online",
        "service": "graph-service",
        "message": "FastAPI service is running and listening!"
    }

# POST API method
@app.post("/graph/seed")
def seed_initial_graph():
    """ 
    Executes raw Cypher queries via the persistent connection pool
    to seed baseline tracking nodes and relational vertices
    """
    # 1. Opening a live database transactional stream
    with driver.session() as session:
        try:
            # 2. Running a query to wipe out old test nodes safely (Clean slate)
            session.run("MATCH (n) DETACH DELETE n")

            # 3. Define a cypher string to create nodes and arrow between them
            seeding_query = """
            CREATE (f:Concept {name: 'FastAPI', language: 'Python', category: 'Backend'})
            CREATE (m:Concept {name: 'Express.js', language: 'TypeScript', category: 'Backend'})
            CREATE (p:Project {name: 'Knowledge Graph Platform', status: 'In Development'})

            CREATE (m)-[:IS_USED_IN]->(p)
            CREATE (f)-[:IS_USED_IN]->(p)
            """

            session.run(seeding_query)

            return {
                "status": "success",
                "message": "Neo4j AuraDB graph network successfully seeded with core concepts!"
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Database transaction aborted: ${str(e)}")

# Also known as plumbing infrastructure
@app.on_event("shutdown")
def shutdown_event():
    # Tears down the global Neo4j connection pool sockets when the server closes
    driver.close()
    print("Closed all activer Neo4j connection pool streams cleanly!")