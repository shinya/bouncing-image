const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;
const RECT_WIDTH = 50;

//
// 前準備。
//

// canvas要素を作る。
const canvas = document.createElement('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

// コンテキストを取得しておく。
const context = canvas.getContext('2d');

// body要素に追加する。
document.body.appendChild(canvas);

class SpriteImage {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      
      this.velocityX = 3; // この速度で横に移動する。
      this.velocityY = 3; // この速度で横に移動する。

      this.image = new Image();
      this.image.src = "./image/logo.png";
    }
  
    update() {
      if(this.x < 0 || this.x > WIDTH - this.width) {
        this.velocityX = -this.velocityX;
      }
      this.x += this.velocityX;

      if(this.y < 0 || this.y > HEIGHT - this.height){
        this.velocityY = -this.velocityY;
      }
      this.y += this.velocityY;

    }
  
    render(context) {
      context.beginPath();
      context.drawImage(this.image, this.x, this.y)
    }
  }

  class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.velocityX = 2; // この速度で横に移動する。
        this.velocityY = 2; // この速度で横に移動する。
    }

    update() {
        if(this.x < 0 || this.x > WIDTH - RECT_WIDTH) {
          this.velocityX = -this.velocityX;
        }
        this.x += this.velocityX;
  
        if(this.y < 0 || this.y > HEIGHT - RECT_WIDTH){
          this.velocityY = -this.velocityY;
        }
        this.y += this.velocityY;
  
      }
    
      render(context) {
        context.beginPath();
        context.fillStyle = 'rgb(0, 0, 255)'; // 青色
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();
      }

  }
  
  //
  // メイン処理。
  //
  
  // オブジェクトを管理する配列。
  const objects = [];
  
  // 円と四角形を1個ずつ追加。
//  objects.push(new Rectangle(350, 350, RECT_WIDTH, RECT_WIDTH));
  objects.push(new SpriteImage(0, 0, 320, 272));
  
  // ループさせる関数。
  function loop(timestamp) {
    // 前の描画を消す。
    context.clearRect(0, 0, WIDTH, HEIGHT);
    
    // 各オブジェクトの状態を更新する。
    objects.forEach((obj) => obj.update());
  
    // 各オブジェクトを描画する。
    objects.forEach((obj) => obj.render(context));
    
    // requestAnimationFrameを呼び出す。
    window.requestAnimationFrame((ts) => loop(ts));
  }
  
  // アニメーションを開始する。
  window.requestAnimationFrame((ts) => loop(ts));