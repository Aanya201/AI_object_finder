video ="";

function setup() {
    canvas = createCanvas(350,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide();
}

function draw() {
    image(video, 0,0, 400, 400);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById('object').value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}