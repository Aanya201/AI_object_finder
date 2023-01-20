video ="";
objects = [];


function setup() {
    canvas = createCanvas(350,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide();
}

function draw() {
    image(video, 0,0, 400, 400);
    
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            

            fill("#7a34eb");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#7a34eb");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name){
                video.stop();
                document.getElementById("number_of_objects").innerHTML = object_name + " found";
                synth = window.speechSynthesis; 
                utterThis = new SpeechSynthesisUtterance(object_name + "Found"); 
                synth.speak(utterThis);

            } else {
                document.getElementById("number_of_objects").innerHTML = object_name + " not found";
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById('object').value;
}

function gotResult(error, results){
    if(error) {
     console.log(error);
    } else {
     console.log(results);
     objects = results;
    }
 }

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
