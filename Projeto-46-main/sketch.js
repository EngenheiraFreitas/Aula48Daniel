var END =0;
var PLAY =1;
var gameState = PLAY;
var skatistaImg, skatista;
var pracaImg, praca;
var lataImg, lata,latasGroup,pedraImg, pedra, pedrasGroup;
var pista, pistaImg;
var fundo, fundoImg;
var coin, coinImg, coinGroup;
var nuvem;
var pistaInvis;
var nuvemGroup;
var distancia=0;
var coin = 0;
var colindindoImg;




function preload()
{
   pistaImg = loadImage("image/pista2.jpg");
   fundoImg = loadImage("image/fundo.jpg");
   pedraImg = loadImage("image/pedra.png");
   lataImg = loadImage("image/lata.png");
   skatistaImg = loadAnimation("image/1.png","image/2.png","image/3.png");
   nuvemImage = loadImage("image/nuvem.png");
   coinImg = loadImage("image/coin.png");
   colindindoImg = loadImage("image/4.png");
}

function setup() {
	createCanvas(800, 500);
  
   pista = createSprite(0,height-40,width*2,1);
   pista.addImage("pista",pistaImg);
   //pista.x = pista.width/2;
   backgroundImg = loadImage("image/bg.gif");
   pista.scale = 0.18;
   
   
   skatista = createSprite(150,350,400,50);
   skatista.addAnimation("SkatistaRunner", skatistaImg);
   skatista.scale = 0.25   ;
   
   pistaInvis = createSprite(300,500 ,1000,40);

   //skatista.setCollider("rectangle",0,0,10,10);

   pedrasGroup = new Group(); 
   nuvemGroup = new Group();
   latasGroup = new Group();
   coinGroup = new Group();
}


function draw() {
  background(0);
  image(backgroundImg,0,0,800,500);
  textSize(30);
  fill(0);
  text("Distância: "+ distancia, 520,50);
  text("Coin: "+ coin, 520,80);

  skatista.x = World.mouseX;

  if (gameState === PLAY) {
   distancia = distancia + Math.round(getFrameRate()/60);
   pista.velocityX = -(4 + 1.8*distancia/150);  
   skatista.collide(pistaInvis);
   if(keyDown("space") && skatista.y >= 159) {
      skatista.velocityY = -12;
   }
   skatista.velocityY = skatista.velocityY + 0.8;
   
   if(pista.x < 350){
      pista.x = pista.width/14;
   }

  var obstaculos = Math.round(random(1,3));
  if (World.frameCount % 150 == 0) {
    if (obstaculos == 1) {
      gerarPedra();
    } else if (obstaculos == 2) {
      gerarLata();
    } else {
      gerarCoin();
    }
  }

  if(coinGroup.isTouching(skatista)){
      coin = coin + 2;
      coin.destroy();
      
  }

  if(latasGroup.isTouching(skatista)){
      gameState = END;
      latasGroup.destroyEach();
      skatista.addAnimation("colidindo",colindindoImg);
  }

  if(pedrasGroup.isTouching(skatista)){
      gameState = END;
      pedrasGroup.destroyEach();
      skatista.addAnimation("colidindo",colindindoImg);
   }


  } else if(gameState === END){
     
   textSize(30);
   fill(0);
   text("Pressione Seta para Cima para Reiniciar o jogo!", 100,200);
   pista.velocityX = 0; 
   skatista.changeAnimation(colindindoImg);
   pedrasGroup.setVelocityXEach(0);
   pedrasGroup.setLifetimeEach(-1);

   latasGroup.setVelocityXEach(0);
   latasGroup.setLifetimeEach(-1);

   coinGroup.setVelocityXEach(0);
   coinGroup.setLifetimeEach(-1);

   if(keyDown("UP_ARROW")) {
      reset();
    }

  }

  //gerarNuvens();
  
  drawSprites();
 
}



function reset(){
   gameState = PLAY;
   skatista.addAnimation("SkatistaRunner", skatistaImg); 
   
   latasGroup.destroyEach();
   pedrasGroup.destroyEach();
   coinGroup.destroyEach();
   
   distancia = 0;
}



function gerarCoin(){
   var coin =createSprite(800,Math.round(random(350, 450)));
   coin.scale =0.003;
   coin.velocityX = -(6 + 2*coin/150);
   coin.addImage(coinImg);
   coin.setLifetime=170;
   coinGroup.add(coin);
}

function gerarPedra(){
   pedra =createSprite(800,Math.round(random(350, 450)));
   pedra.scale =0.06;
   pedra.velocityX = -(6 + 2*distancia/150);
   pedra.addImage(pedraImg);
   pedra.setLifetime=170;
   pedrasGroup.add(pedra);
}

function gerarLata(){
   lata =createSprite(800,Math.round(random(350, 450)));
   lata.scale =0.06;
   lata.velocityX = -(6 + 2*distancia/150);
   lata.addImage("lataan",lataImg);
   lata.setLifetime=170;
   latasGroup.add(lata);
}


function gerarNuvens() {
   //escreva o código aqui para gerar as nuvens
   if (frameCount % 120 === 0) {
     var nuvem = createSprite(600,80,40,10);
     nuvem.y = Math.round(random(20,120));
     nuvem.addImage(nuvemImage);
     nuvem.scale = 0.15 ;
     nuvem.velocityX = -1  ;
     
      //atribua tempo de vida à variável
     nuvem.lifetime = 600;
     
     //ajuste a profundidade (depth)
     nuvem.depth = skatista.depth;
     skatista.depth = skatista.depth + 1;
     
     //adicione cada nuvem ao grupo
     nuvemGroup.add(nuvem);  
   }   
}

