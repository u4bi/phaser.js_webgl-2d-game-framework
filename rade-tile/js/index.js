/* rade-tile index.js*/
	
var game, game_data;
var radeTile = function(){}; /* 클래스로 초기화*/

function init(){
  game_data = {width: 750, height: 700, tileSize: 140, fieldSize: 5};
  
  game = new Phaser.Game(game_data.width, game_data.height);
  game.state.add("radeTile", radeTile); /* 클래스 정의후 타입줌*/
  game.state.start("radeTile"); /* 정의된 타입호출*/
}

radeTile.prototype = { /* 클래스 호출됨 prototype에 모두 담음*/
  preload : function(){
    game.stage.backgroundColor = 0x333333; /* css 문법 이용해 컬러 변경 가능 'rgba(245, 245, 245, 1)' '#ffff00' */
    game.load.image("tiles", "images/tiles.png"); /* 이미지 불러오고 titles이란 id를 줌*/
    game.load.spritesheet("arrows", "images/arrows.png", 420, 420); /* 스프라이트시트 이미지 불러오고 arrows이란 id를 줌*/
  },
  create: function(){
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; /* 종횡비 설정*/
    /* ScaleManager
      @ NO_SCALE  : 아무것도 안함
      @ EXACT_FIT : 종횡비 유지안함 가로로 꽉채움
      @ SHOW_ALL  : 이미지나 화면이 왜곡되지 않게 가로 세로 비율을 유지하며 캔버스 크기를 채움
      @ RESIZE    : 최대 가능한 폭과 높이로 캔버스 크기를 동적으로 만듬
			@ USER_SCALE: 자신이 설정한 크기 사용자가 정의한 동적 크기로 조정
    */
    game.scale.pageAlignHorizontally = true; /* 가로 정렬 */
    game.scale.pageAlignVertically = true; /* 세로 정렬 */
    this.initTile(); /* 타일 초기화함*/
  },
  update: function(){},
  initTile: function(){
    this.tilesArray = []; /* tiles 어레이 */
    this.arrowsArray = []; /* arrow 어레이 */
    
    this.tileGroup = game.add.group(); /* 그룹화함*/
    this.arrowsGroup = game.add.group(); /* 그룹화함*/
    
    var groupSize = game_data.tileSize * game_data.fieldSize; /*그룹내 x,y값 사이즈 리턴*/
    this.tileGroup.x = (game.width - groupSize) / 2;
    this.tileGroup.y = (game.height - groupSize) / 2;
    this.arrowsGroup.x = (game.width - groupSize) / 2;
    this.arrowsGroup.y = (game.height - groupSize) / 2;
    
    for(var i = 0; i < game_data.fieldSize; i++){ /* 포문루프*/
      this.tilesArray[i] = []; /* */
      for(var j = 0; j < game_data.fieldSize; j++){
        this.addTile(i, j); /*루프값에 따른 로우 컬럼을 매개변수로 주입하여 함수 호출*/
      }
    }
  },
  addTile: function(row, col){ /* 로우 컬럼을 인자로 받아 어레이 정의*/
    var tileXPos = col * game_data.tileSize + game_data.tileSize / 2;
    var tileYPos = row * game_data.tileSize + game_data.tileSize / 2;
    var theTile = game.add.sprite(tileXPos, tileYPos, "tiles");
    
    theTile.anchor.set(0.5); /* add한 지정 위치에 대한 x, y 앵커지정 */
    theTile.coordinate = new Phaser.Point(col, row);
    
    this.tilesArray[row][col] = theTile;
    this.tileGroup.add(theTile);
  },
  pickTile: function(){},
  moveTile: function(){},
  releaseTile: function(){},
  addArrow: function(){}
};