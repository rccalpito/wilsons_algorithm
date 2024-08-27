// game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const numColumns = 10; // the smaller this number, the larger the column size.
const mazeCellSize = canvas.width / numColumns;
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
let grid = [];
