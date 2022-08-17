
song = "";

leftwristX = 0;
leftwristY = 0;

rightwristY = 0;
rightwristX = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");

}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#5d00ff");
    stroke("#5d00ff");
    if (scoreRightWrist > 0.2) {
        circle(rightwristX, rightwristY, 20);
        if (rightwristY > 0 && rightwristY <= 100) {
            document.getElementById("fast").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        }
        else if (rightwristY >= 100 && rightwristY <= 200) {
            document.getElementById("fast").innerHTML = "Speed: Normal";
            song.rate(1);
        }
        else if (rightwristY >= 200 && rightwristY <= 300) {
            document.getElementById("fast").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        }
        else if (rightwristY >= 300 && rightwristY <= 400) {
            document.getElementById("fast").innerHTML = "Speed: 2x";
            song.rate(2);
        }
        else if (rightwristY >= 400 && rightwristY <= 500) {
            document.getElementById("fast").innerHTML = "Speed: Speedy";
            song.rate(2.5);
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftwristX, leftwristY, 20)
        inNumberLeftWristY = Number(leftwristY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimals / 500;
        document.getElementById("sound").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}
function modelLoaded() {
    console.log("The Posenet is Loaded")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log("Results are " + results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);



        leftwristX = results[0].pose.leftWrist.x;
        rightwristX = results[0].pose.rightWrist.x;

        leftwristY = results[0].pose.leftWrist.y;
        rightwristY = results[0].pose.rightWrist.y;

        console.log("leftwristX is " + leftwristX + "leftwristY is " + leftwristY + "rightwristX is " + rightwristX + "rightwristY is " + rightwristY);

    }
}