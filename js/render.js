import Action from './action.js';

class Render {
  constructor(ctx, arr) {
    this.ctx = ctx;
    this.data = arr;
    this.margin = 20;
    this.top = 200;
    this.space = 13;
    this.dot = {};
    this.action = new Action(arr);
  }

  drawSquare() {
    this.ctx.fillStyle = '#CDC1B4';
    this.data.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        let edge = (this.ctx.canvas.width - 2 * this.margin - 5 * this.space) / 4;
        let x = this.margin + this.space + (edge + this.space) * columnIndex;
        let y = this.top + this.space + (edge + this.space) * rowIndex;
        this.ctx.fillStyle = '#CDC1B4';
        if (column === 2) {
          this.ctx.fillStyle = '#eee4da';
        } else if (column === 4) {
          this.ctx.fillStyle = '#ede0c8';
        } else if (column === 8) {
          this.ctx.fillStyle = '#f2b179';
        } else if (column === 16) {
          this.ctx.fillStyle = '#f59563';
        } else if (column === 32) {
          this.ctx.fillStyle = '#f67c5f';
        } 
        this.ctx.fillRect(x, y, edge, edge);
        if (column > 0) {
          this.ctx.fillStyle = '#fff';
          this.ctx.font = '28px 微软雅黑';
          this.ctx.textAlign = 'center';
          this.ctx.fillText(column, x + edge / 2, y + edge / 1.5);
        }
      })
    });

  }

  drawBg() {
    this.ctx.fillStyle = '#FAF8EF';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = '#BBADA0';
    let edge = this.ctx.canvas.width - 2 * this.margin
    this.ctx.fillRect(this.margin, this.top, edge, edge);
    this.ctx.lineWidth = 10;
    this.ctx.lineJoin = 'bevel';
    this.ctx.strokeStyle = '#BBADA0';
    this.ctx.strokeRect(this.margin, this.top, edge, edge);
  }

  listen() {
    this.ctx.canvas.addEventListener('touchstart', (e) => {
      let touch = e.changedTouches[0];
      this.dot.x = touch.clientX;
      this.dot.y = touch.clientY;

    })
    this.ctx.canvas.addEventListener('touchend', (e) => {
      let touch = e.changedTouches[0];
      let x = touch.clientX;
      let y = touch.clientY;
      if (Math.abs(x - this.dot.x) - Math.abs(y - this.dot.y) > 0) {
        if (x > this.dot.x) {
          this.action.rightAction();
          this.action.insertNumber();
          this.drawSquare();
        } else {
          this.action.leftAction();
          this.action.insertNumber();
          this.drawSquare();
        }
      } else {
        if (y > this.dot.y) {
          this.action.downAction();
          this.action.insertNumber();
          this.drawSquare();
        } else {
          this.action.upAction();
          this.action.insertNumber();
          this.drawSquare();
        }
      }
      if (this.action.morepositions.length === 0 && this.action.isOver === false) {
        wx.showModal({
          title: '提示',
          content: '游戏结束，是否再来一局',
          success: (res) => {
            if (res.confirm) {
              this.data = [
                [0, 2, 0, 0],
                [0, 0, 4, 0],
                [0, 8, 0, 0],
                [0, 0, 0, 0]
              ]
              this.drawBg()
              this.drawSquare()
              this.action = new Action(this.data)
            } else {
              wx.showToast({
                title: '游戏结束',
              })
            }
          }
        })
      }
      this.drawSquare();
    })
  }

}

export default Render;