var ball,node,database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();

    node = database.ref("ball/position");

    node.on("value", readValue, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePos(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePos(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePos(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePos(0,+1);
    }
    drawSprites();
}

function writePos(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    database.ref("ball/position").set({
    x : ball.x + 1,
    y : ball.y + 1
    })
}

function readValue(details){
    position = details.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("ERROR");
}
