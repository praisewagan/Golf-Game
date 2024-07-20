var canvas = new fabric.Canvas('myCanvas');

var ball_width = 100;
var ball_height = 90;
var hole_width = 100;
var hole_height = 90;

var ball_x = 10;
var ball_y = 10;
var hole_x = 100;
var hole_y = 0;

var background_image = "Grass.jpg";
var ball_image = "ball.png";
var hole_image = "golf-h.png";

var ball_object = null;
var hole_object = null;

function ball_update() {
    fabric.Image.fromURL(ball_image, function(Img) {
        if (ball_object) {
            canvas.remove(ball_object);
        }
        ball_object = Img;
        ball_object.scaleToWidth(ball_width);
        ball_object.scaleToHeight(ball_height);
        ball_object.set({
            top: ball_y,
            left: ball_x
        });
        canvas.add(ball_object);
        canvas.renderAll(); 
    });
}

function add() {
    fabric.Image.fromURL(background_image, function(img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
}


fabric.util.loadImage(background_image, function(img) {
    fabric.Image.fromURL(img.src, add);
});
fabric.util.loadImage(ball_image, function(img) {
    fabric.Image.fromURL(img.src, ball_update);
});

document.addEventListener('keydown', function(event) {
    var keyPressed = event.keyCode;
    if (keyPressed === 38) {
        up();
    } else if (keyPressed === 40) {
        down();
    } else if (keyPressed === 37) {
        left();
    } else if (keyPressed === 39) {
        right();
    }
});

function up() {
    if (ball_y >= 0) {
        ball_y -= 10; 
        console.log("When Up arrow key is pressed, X = " + ball_x + ", Y = " + ball_y);
        ball_object.set({ top: ball_y });
        canvas.renderAll();
    }
}

function down() {
    if (ball_y <= canvas.height - ball_height) {
        ball_y += 10;
        console.log("When Down arrow key is pressed, X = " + ball_x + ", Y = " + ball_y);
        ball_object.set({ top: ball_y });
        canvas.renderAll();
    }
}

function left() {
    if (ball_x > 0) {
        ball_x -= 10; 
        console.log("When Left arrow key is pressed, X = " + ball_x + ", Y = " + ball_y);
        ball_object.set({ left: ball_x });
        canvas.renderAll();
    }
}

function right() {
    if (ball_x <= canvas.width - ball_width) {
        ball_x += 10; 
        console.log("When Right arrow key is pressed, X = " + ball_x + ", Y = " + ball_y);
        ball_object.set({ left: ball_x });
        canvas.renderAll();
    }
}

function right() {
    if (ball_x <= canvas.width - ball_width) {
        ball_x += 10;
        console.log("When Right arrow key is pressed, X = " + ball_x + ", Y = " + ball_y);
        ball_object.set({ left: ball_x });

        
        if (isColliding(ball_object, hole_object)) {
            canvas.remove(ball_object);  
            ball_object = null;          
            return;                      
        }

        canvas.renderAll();
    }
}



function isColliding(obj1, obj2) {
    
    var obj1Bounds = obj1.getBoundingRect();
    var obj2Bounds = obj2.getBoundingRect();


    return (
        obj1Bounds.left < obj2Bounds.left + obj2Bounds.width &&
        obj1Bounds.left + obj1Bounds.width > obj2Bounds.left &&
        obj1Bounds.top < obj2Bounds.top + obj2Bounds.height &&
        obj1Bounds.top + obj1Bounds.height > obj2Bounds.top
    );
}

fabric.Image.fromURL(hole_image, function(Img) {
    hole_object = Img;
    hole_object.scaleToWidth(hole_width);
    hole_object.scaleToHeight(hole_height);
    hole_object.set({
        top: hole_y,
        left: hole_x
    });
    canvas.add(hole_object);
    canvas.renderAll();
});



