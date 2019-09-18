class Action {
  constructor(arr) {
    this.arr = arr;
    this.isOver = false;
    this.morepositions = [];
  }

  insertNumber() {
    this.isOver = false;
    let positions = [];
    this.arr.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === 0) {
          let position = {};
          position.i = rowIndex;
          position.j = columnIndex;
          positions.push(position);
        }
      })
    });
    if (positions.length != 0) {
      let index = Math.floor(Math.random() * positions.length);
      let dot = positions[index];
      this.arr[dot.i][dot.j] = 2;
    }
    this.judge();
    this.morepositions = positions;
  }

  leftAction() {
    this.arr.forEach(row => {
      for (let left = 0; left < 3; left++) {
        for (let right = 1; right < 4 - left; right++) {
          if (row[left] != 0 && row[left + right] != 0) {
            if (row[left] == row[left + right]) {
              row[left] = row[left] * 2;
              row[left + right] = 0;
            }
            break;
          }

        }
      }

      for (let left = 0; left < 3; left++) {
        if (row[left] === 0) {
          for (let right = 1; right < 4 - left; right++) {
            if (row[left + right] != 0) {
              row[left] = row[left + right];
              row[left + right] = 0;
              break;
            }
          }
        }
      }
    });
  }

  upAction() {
    let arr = this.arr;
    for (let column = 0; column < 4; column++) {
      for (let top = 0; top < 3; top++) {
        for (let bottom = 1; bottom < 4 - top; bottom++) {
          if (arr[top][column] != 0 && arr[top + bottom][column] != 0) {
            if (arr[top][column] == arr[top + bottom][column]) {
              arr[top][column] = 2 * arr[top + bottom][column];
              arr[top + bottom][column] = 0;
            }
            break;
          }
        }
      }

      for (let top = 0; top < 3; top++) {
        if (arr[top][column] === 0) {
          for (let bottom = 1; bottom < 4 - top; bottom++) {
            if (arr[top + bottom][column] != 0) {
              arr[top][column] = arr[top + bottom][column];
              arr[top + bottom][column] = 0;
              break;
            }
          }
        }
      }
    }
  }

  downAction() {
    let arr = this.arr;
    for (let column = 0; column < 4; column++) {
      for (let bottom = 3; bottom > 0; bottom--) {
        for (let top = 1; top <= bottom; top++) {
          if (arr[bottom][column] != 0 && arr[bottom - top][column] != 0) {
            if (arr[bottom][column] == arr[bottom - top][column]) {
              arr[bottom][column] = arr[bottom][column] * 2;
              arr[bottom - top][column] = 0;
            }
            break;
          }
        }
      }

      for (let bottom = 3; bottom > 0; bottom--) {
        if (arr[bottom][column] == 0) {
          for (let top = 1; top <= bottom; top++) {
            if (arr[bottom - top][column] != 0) {
              arr[bottom][column] = arr[bottom - top][column];
              arr[bottom - top][column] = 0;
              break;
            }
          }
        }
      }
    }
  }

  rightAction() {
    this.arr.forEach(row => {
      for (let right = 3; right > 0; right--) {
        for (let left = 1; left <= right; left++) {
          if (row[right] !== 0 && row[right - left] !== 0) {
            if (row[right] === row[right - left]) {
              row[right] = 2 * row[right];
              row[right - left] = 0;
            }
            break;
          }
        }
      }
      for (let right = 3; right > 0; right--) {
        if (row[right] === 0) {
          for (let left = 1; left <= right; left++) {
            if (row[right - left] !== 0) {
              row[right] = row[right - left];
              row[right - left] = 0;
              break;
            }
          }
        }
      }
    })
  }

  judge() {
    let arr = this.arr
    arr.forEach(row => {
      for (let i = 0; i < 3; i++) {
        if (row[i] === row[i + 1]) {
          this.isOver = true
        }
      }
    })
    for (let colum = 0; colum < 4; colum++) {
      for (let row = 0; row < 3; row++) {
        if (arr[row][colum] === arr[row + 1][colum]) {
          this.isOver = true
        }
      }
    }
  }
}

export default Action;