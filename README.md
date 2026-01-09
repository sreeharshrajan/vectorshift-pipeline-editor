# VectorShift Frontend Technical Assessment

This repository contains my submission for the **VectorShift Frontend Technical Assessment**, focused on building a modular, extensible pipeline editor aligned with VectorShift’s node-based orchestration paradigm.

The system enables users to compose pipelines using connected nodes, visualize data flow via directed edges, and submit the pipeline for structural validation. The frontend emphasizes composability and scalability of node definitions, while the backend performs lightweight pipeline analysis and DAG validation.

## System Architecture

The application is composed of two clearly separated layers:

- **Frontend (Pipeline Editor)**
  - Responsible for pipeline construction, visualization, and user interaction
  - Built around reusable node abstractions and consistent styling primitives

- **Backend (Pipeline Analyzer)**
  - Responsible for validating pipeline structure
  - Computes node and edge counts and determines whether the pipeline forms a Directed Acyclic Graph (DAG)

This separation mirrors VectorShift’s model of **authoring pipelines on the client** and **validating/executing workflows on the server**.

## Technology Stack

### Frontend
- React
- JavaScript (ES6+)
- React Flow (node graph rendering and edge management)

### Backend
- Python
- FastAPI

## Core Features

### 1. Node Abstraction Layer

A shared node abstraction was introduced to standardize:
- Layout
- Handle definitions
- Styling
- Data propagation behavior

This approach significantly reduces duplication across node types and enables rapid creation of new nodes with predictable behavior. Multiple additional node types were implemented to demonstrate extensibility and consistency.

This design aligns with VectorShift’s requirement for **scalable node catalogs** that can grow without increasing maintenance overhead.

---

### 2. Unified Visual Design

The editor and nodes are styled as a cohesive system rather than isolated components.  
Styling decisions prioritize:
- Visual hierarchy
- Readability of data flow
- Clear affordances for inputs, outputs, and interactions

The result is a clean, minimal UI that supports complex pipelines without visual clutter.

---

### 3. Dynamic Text Node Semantics

The Text node implements enhanced behavior commonly used in VectorShift pipelines:

- **Auto-resizing input area**  
  The node dynamically adjusts its width and height based on user input, improving readability for longer prompts or templates.

- **Variable-based handles**  
  Variables defined using double curly braces (e.g., `{{input}}`) are parsed in real time.  
  Each valid variable automatically generates a corresponding input handle on the node.

This enables the Text node to function as a **templated transformation node**, dynamically adapting its interface to declared inputs.

---

### 4. Pipeline Submission & Validation

Upon submission:
- The frontend serializes the pipeline graph (nodes and edges)
- The backend analyzes the graph to:
  - Count nodes
  - Count edges
  - Validate whether the graph forms a DAG

The response is surfaced to the user in a concise, human-readable alert, providing immediate feedback on pipeline correctness.

### Pipeline Authoring
- Initial editor state with input and output nodes
- Example of a multi-node pipeline

### Node Abstraction in Practice
- Multiple node types created from the same abstraction
- Consistent layout and handle behavior

### Text Node Dynamics
- Auto-resizing behavior with increasing text
- Variable-driven handle generation (`{{variable}}` syntax)

### Pipeline Validation Feedback
- Alert displaying:
  - Total nodes
  - Total edges
  - DAG validation result

## Run the Application

By following the below commands from the root folder, you can run this application.

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Design Decisions

- Focused on clarity and maintainability over overengineering
- Prioritized reusable abstractions to support future node expansion
- Kept backend logic minimal and explicit for readability
- Ensured frontend and backend responsibilities remain clearly separated

## Summary

This implementation focuses on:

- Scalable node architecture
- Clear separation of concerns
- Predictable pipeline behavior
- Alignment with VectorShift’s node-based workflow model

The result is a maintainable foundation for a pipeline editor that can be extended to support more complex orchestration and execution use cases.

## Author

Sreeharsh Rajan