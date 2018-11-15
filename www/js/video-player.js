document.addEventListener("DOMContentLoaded", () => {

    const videoElement = document.getElementById("main-video");
    const videoElementControls = document.getElementById("main-video-controls");

    addListeners(videoElement, videoElementControls)
});

function videoToggleMute(videoE)
{
    if(videoE === undefined) {
        //Stop the function if the video is null/undefined, will stop errors occurring in the chat.
        console.log(videoE);
        return;
    }
    //Toggle the mute
    videoE.muted = !videoE.muted;
}

function videoTogglePlay(videoE) 
{
    if(videoE === undefined) {
        //Stop the function if the video is null/undefined, will stop errors occurring in the chat.
        console.log(videoE);
        return;
    }
    if (videoE.paused)
    {
        videoE.play();
    }
    else
    {
        videoE.pause();
    }
}
/**
 * Will add functionality to the buttons controlling the given video.
 * @param videoElement Reference to the main video tag.
 * @param videoControls Reference to the controls for the previous video.
 */
function addListeners(videoElement, videoControls)
{
    // Iterate through each child tag of the visual controls, finding each button and then binding the relevant function.
    videoControls.childNodes.forEach((element) => {
        switch (element.id)
        {
            case "main-video-controls-play":
                // The Play button.
                element.addEventListener("click", function () { videoTogglePlay(videoElement); });
                break;
            case "main-video-controls-mute":
                // The mute button
                element.addEventListener("click", function () { videoToggleMute(videoElement); });
                break;
            case undefined:
                break;
        }
    });
}