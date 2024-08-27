class Player {
  constructor(canvas, ctx, maze, x, y, size, color) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.maze = maze;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = this.maze.mazeCellSize;
  }

  draw() {
    this.maze.ctx.fillStyle = this.color;
    this.maze.ctx.fillRect(
      this.x + 5,
      this.y + 5,
      this.size - 5,
      this.size - 5
    );
  }

  move(dx, dy) {
    const newX =
      Math.round((this.x + dx * this.speed) / this.maze.mazeCellSize) *
      this.maze.mazeCellSize;
    const newY =
      Math.round((this.y + dy * this.speed) / this.maze.mazeCellSize) *
      this.maze.mazeCellSize;

    if (!this.collidesWithWall(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }

  collidesWithWall(newX, newY) {
    // const currentGridX = Math.floor(this.x / this.maze.mazeCellSize);
    // const currentGridY = Math.floor(this.y / this.maze.mazeCellSize);
    // const newGridX = Math.floor(newX / this.maze.mazeCellSize);
    // const newGridY = Math.floor(newY / this.maze.mazeCellSize);

    // // Check if moving outside the maze
    // if (
    //   newGridX < 0 ||
    //   newGridY < 0 ||
    //   newGridX >= this.maze.gridWidth ||
    //   newGridY >= this.maze.gridHeight
    // ) {
    //   return true;
    // }

    // // If not moving to a new cell, no collision
    // if (currentGridX === newGridX && currentGridY === newGridY) {
    //   return false;
    // }

    // // Check for walls based on movement direction
    // if (newGridX > currentGridX) {
    //   // Moving right
    //   return this.maze.gridDir[currentGridY][currentGridX] !== ">";
    // } else if (newGridX < currentGridX) {
    //   // Moving left
    //   return this.maze.gridDir[newGridY][newGridX] !== "<";
    // } else if (newGridY > currentGridY) {
    //   // Moving down
    //   return this.maze.gridDir[currentGridY][currentGridX] !== "v";
    // } else if (newGridY < currentGridY) {
    //   // Moving up
    //   return this.maze.gridDir[newGridY][newGridX] !== "^";
    // }

    // return false;
  }

  neighbors() {

  }
}
