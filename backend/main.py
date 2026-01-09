from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from collections import defaultdict, deque

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Models ----------

class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

# ---------- Function ----------

def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Detect if the the given values forms a Directed Acyclic Graph (DAG)
    using Kahn's algorithm (topological sort with cycle detection)
    """
    if not nodes:
        return True

    adjacency = defaultdict(list)
    in_degree = {node.id: 0 for node in nodes}

    for edge in edges:
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque([node_id for node_id, deg in in_degree.items() if deg == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1

        for neighbor in adjacency[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)

# ---------- Routes ----------

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse the pipeline and return analysis results
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_valid_dag = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_valid_dag
    }
