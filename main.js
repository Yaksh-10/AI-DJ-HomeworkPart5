song1 = "";
song2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1_status = "";
song2_status = "";

function setup()
{
    canvas = createCanvas(400,300)
    canvas.position(550,300);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotResults)
}
function modelLoaded()
{
    console.log("model Loaded")
}
function gotResults(results)
{
    if (results.length > 0)
    {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}
function preload()
{
    song1 = loadSound("harrypotter.mp3");
    song2 = loadSound("music.mp3");
}
function draw()
{
    image(video,0,0,400,300)
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("red")
    stroke("red")
    if (scoreLeftWrist > 0.01)
    {
        circle(leftWristX,leftWristY,40)
        song2.stop()
        if (song1_status == false)
        {
            song1.play()
        }
    }
    if (scoreRightWrist > 0.01)
    {
        circle(rightWristX,rightWristY,40)
        song1.stop()
        if (song2_status == false)
        {
            song2.play()
        }
    }
}