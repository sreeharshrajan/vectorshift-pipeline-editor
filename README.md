# VectorShift Frontend Technical Assessment

This repository contains my submission for the **VectorShift Frontend Technical Assessment**.  
The project implements a React-based pipeline editor with reusable node abstractions, unified styling, dynamic text node behavior, and frontend–backend integration using FastAPI.

---

## Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- React Flow

### Backend
- Python
- FastAPI

---

## Project Overview

The application allows users to construct a pipeline using connected nodes and edges, visualize the pipeline structure, and submit it for backend analysis.  
Upon submission, the backend calculates:
- Total number of nodes
- Total number of edges
- Whether the pipeline forms a Directed Acyclic Graph (DAG)

The results are displayed to the user via a frontend alert.

---

## Assessment Scope

This project addresses the following assessment requirements:

1. **Node Abstraction**
   - Introduced a reusable abstraction to reduce duplication across node types
   - Enabled faster creation of new node types with consistent behavior and styling
   - Demonstrated flexibility by adding multiple new node types

2. **Styling**
   - Applied a unified and visually consistent design across the editor and nodes
   - Improved layout clarity and usability

3. **Text Node Logic**
   - Text node dynamically resizes based on user input
   - Variables defined using `{{variableName}}` automatically generate input handles
   - Handles update in real time as text changes

4. **Backend Integration**
   - Frontend submits pipeline data (nodes and edges) to the backend
   - Backend validates structure and checks DAG correctness
   - Results are returned and displayed in a user-friendly format

---

## Screenshots / Demo Plan

> _Screenshots can be added to the `/screenshots` folder and referenced here._

### 1. Pipeline Editor – Initial State
- Empty editor with input and output nodes visible

### 2. Node Abstraction in Action
- Multiple custom node types created using the shared abstraction

### 3. Text Node Behavior
- Auto-resizing text node as content increases
- Dynamic handles generated from `{{variable}}` syntax

### 4. Styled UI
- Overview of unified node styling and editor layout

### 5. Backend Response Alert
- Alert displaying:
  - Number of nodes
  - Number of edges
  - DAG validation result

---

## How to Run the Project

### Frontend
```bash
cd frontend
npm install
npm start
