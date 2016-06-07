/**
 * Created by junyoung on 2016. 5. 27..
 */

var video = document.getElementById("media_video");
var canvas = document.getElementById("media_canvas");
var context = canvas.getContext("2d");
var rotation = 0;

function drawScreen() {
    context.fillStyle="#FFFFF";
    context.fillRect(0,0,900,500);
    context.save();
    context.setTransform(1,0,0,1,0,0);
    var angle = rotation * Math.PI/180;
    context.translate(900/2, 500/2);
    context.rotate(angle);
    context.drawImage(video, 0, 0);
    context.restore();
    rotation++;
}

function buttonclick() {
    video.play();
    setInterval(drawScreen, 33);

}