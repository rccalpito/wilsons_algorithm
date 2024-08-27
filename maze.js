class Maze {
  constructor(canvas, ctx, mazeCellSize) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mazeCellSize = mazeCellSize;
    this.gridWidth = Math.floor(canvas.width / mazeCellSize);
    this.gridHeight = Math.floor(canvas.height / mazeCellSize);
    this.numberOfCells = this.gridWidth * this.gridHeight;
    this.remainingCells = this.numberOfCells - 1;
    this.directions = [
      { x: 0, y: -1, s: "^" }, // up
      { x: 1, y: 0, s: ">" }, // right
      { x: 0, y: 1, s: "v" }, // down
      { x: -1, y: 0, s: "<" }, // left
    ];
    this.grid = this.initializeArray();
    this.visits = this.initializeArray();
    this.gridDir = this.initializeArray();
    this.initMaze();
  }

  initializeArray() {
    let array = [];
    for (let y = 0; y < this.gridHeight; y++) {
      array[y] = [];
      for (let x = 0; x < this.gridWidth; x++) {
        array[y][x] = { dir: null, val: 0 };
      }
    }
    return array;
  }

  randomX() {
    return Math.floor(Math.random() * this.gridWidth);
  }

  randomY() {
    return Math.floor(Math.random() * this.gridHeight);
  }

  shuffleDirections(directionsArr) {
    return directionsArr[Math.floor(Math.random() * directionsArr.length)];
  }

  initMaze() {
    const gridStartX = this.randomX();
    const gridStartY = this.randomY();

    this.grid[gridStartY][gridStartX] = {
      dir: { x: 0, y: 0, s: "s" },
      val: 1,
    };

    this.gridDir[gridStartY][gridStartX] = "s";
    this.visits[gridStartY][gridStartX] = this.grid[gridStartY][gridStartX];

    let initWalkX = this.randomX();
    let initWalkY = this.randomY();

    this.visits[initWalkY][initWalkX] = {
      dir: this.shuffleDirections(this.directions),
      val: 1,
    };

    let dx = initWalkX;
    let dy = initWalkY;

    this.drawGrid();

    while (this.remainingCells > 0) {
      while (this.grid[dy][dx].val == 1) {
        dx = this.randomX();
        dy = this.randomY();
        initWalkX = dx;
        initWalkY = dy;
      }

      while (this.grid[dy][dx].val != 1) {
        let randomDir = this.shuffleDirections(this.directions);
        let newDx = dx + randomDir.x;
        let newDy = dy + randomDir.y;

        this.visits[dy][dx] = {
          dir: randomDir,
          val: 1,
        };

        if (
          newDy < 0 ||
          newDy >= this.gridHeight ||
          newDx < 0 ||
          newDx >= this.gridWidth
        ) {
          continue;
        }

        dx = newDx;
        dy = newDy;
      }

      dx = initWalkX;
      dy = initWalkY;

      while (this.grid[dy][dx].val !== 1) {
        this.remainingCells--;
        this.grid[dy][dx] = this.visits[dy][dx];
        this.gridDir[dy][dx] = this.visits[dy][dx].dir.s;

        let nextY = dy + this.visits[dy][dx].dir.y;
        let nextX = dx + this.visits[dy][dx].dir.x;

        this.carveMaze(this.visits[dy][dx].dir.s, dx, dy);

        if (this.grid[nextY][nextX].val == 1) break;

        dy = nextY;
        dx = nextX;
      }

      this.visits = this.initializeArray();
    }
  }

  drawGrid() {
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 2;

    for (let y = 0; y < this.gridHeight; y++) {
      for (let x = 0; x < this.gridWidth; x++) {
        const cellX = x * this.mazeCellSize;
        const cellY = y * this.mazeCellSize;

        this.ctx.beginPath();

        if (y === 0) {
          this.ctx.moveTo(cellX, cellY);
          this.ctx.lineTo(cellX + this.mazeCellSize, cellY);
        }

        if (x === 0) {
          this.ctx.moveTo(cellX, cellY);
          this.ctx.lineTo(cellX, cellY + this.mazeCellSize);
        }

        this.ctx.moveTo(cellX + this.mazeCellSize, cellY);
        this.ctx.lineTo(cellX + this.mazeCellSize, cellY + this.mazeCellSize);

        this.ctx.moveTo(cellX, cellY + this.mazeCellSize);
        this.ctx.lineTo(cellX + this.mazeCellSize, cellY + this.mazeCellSize);

        this.ctx.stroke();
      }
    }
  }

  carveMaze(direction, dx, dy) {
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineWidth = 3;
    let cellX = dx * this.mazeCellSize;
    let cellY = dy * this.mazeCellSize;

    switch (direction) {
      case "<":
        this.ctx.clearRect(
          cellX - 2,
          cellY,
          this.ctx.lineWidth,
          this.mazeCellSize
        );
        break;
      case ">":
        this.ctx.clearRect(
          cellX + this.mazeCellSize + 2 - this.ctx.lineWidth,
          cellY,
          this.ctx.lineWidth,
          this.mazeCellSize
        );
        break;
      case "^":
        this.ctx.clearRect(
          cellX,
          cellY - 2,
          this.mazeCellSize,
          this.ctx.lineWidth
        );
        break;
      case "v":
        this.ctx.clearRect(
          cellX,
          cellY + this.mazeCellSize + 1 - this.ctx.lineWidth,
          this.mazeCellSize,
          this.ctx.lineWidth
        );
        break;
    }
  }
}
