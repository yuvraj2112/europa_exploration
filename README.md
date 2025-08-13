# Europa Exploration (Node.js)

A simple Node.js project that simulates a navigation module for a robot on Europa.  
The program reads a plateau size, initial robot position, and movement commands, then calculates the final robot position.

## Prerequisites

- **Node.js** version 20 or higher

## Installation

```bash
git clone https://github.com/yuvraj2112/europa_exploration
cd europa_exploration_nodejs
npm install
```

---

## Running Modes

This project supports two main modes for running the application:

### 1. **Production Mode (`npm start`)**

- Runs the app as it would be used in production.
- Expects input via standard input (file or interactive).
- Minimal logging, only essential output.

**Usage:**

```bash
npm start < input.txt      # From a file
npm start                 # Interactive mode
```

### 2. **Development Mode (`npm run dev`)**

- Runs the app with extra logging and developer-friendly output.
- Useful for debugging, development, and seeing more detailed logs.

**Usage:**

```bash
npm run dev < input.txt   # From a file, with dev logs
npm run dev               # Interactive mode, with dev logs
```

---

## Assumptions

- If the robot encounters the edge of the plateau and a move would take it outside the boundaries, **the robot does not move** and simply skips that instruction.
- In **production mode**, this skipped move is silent (no output).
- In **development mode**, an error message is printed to indicate the robot attempted to move beyond the edge.

---

## Input Format

The program processes robot navigation instructions in the following sequence:

1. **Plateau size**  
   Format: `<maxX> <maxY>`  
   Defines the upper-right coordinates of the plateau grid. The lower-left corner is assumed to be `(0, 0)`.

2. **Initial robot position**  
   Format: `<x> <y> <direction>`

   - `x`, `y` → Starting coordinates of the robot
   - `direction` → One of `N`, `E`, `S`, `W` (North, East, South, West)

3. **Movement commands**  
   A string containing any combination of:

   - `L` → Turn left 90° without moving
   - `R` → Turn right 90° without moving
   - `M` → Move forward one grid unit in the current direction

4. **Multiple robots**  
   Steps **2** and **3** can be repeated for each additional robot.  
   The program supports up to **5000 robots** in a single run.

### Example

```
5 5
1 2 N
LMLMLMLMM
3 3 E
```

---

## Running the Program

### 1. From a file

```bash
npm start < input.txt
```

### 2. Interactive mode

```bash
npm start
```

Then type each line of input and press **Enter**.  
Submit an empty line to terminate input.

## Example Output

If the above example input is given, the output might be:

```
1 3 N
5 1 E
```
