import os
from fastapi import FastAPI
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

@app.on_event("shutdown")
def shutdown_event():
    # Tears down the global Neo4j connection pool sockets when the server closes
    driver.close()
    print("Closed all activer Neo4j connection pool streams cleanly!")

@app.get("/health")
def health_check():
    # Base API microservice health check indicator loop
    return {
        "status": "Online",
        "service": "graph-service",
        "message": "FastAPI service is running and listening!"
    }