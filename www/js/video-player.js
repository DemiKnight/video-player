document.addEventListener("DOMContentLoaded", () =>
{
    const videoElement = document.getElementById("main-video");
    const videoElementControls = document.getElementById("main-video-controls");

    addListeners(videoElement, videoElementControls)
});

function videoToggleMute(videoE)
{
    if(videoE === undefined)
    {
        //Stop the function if the video is null/undefined, will stop errors occurring in the chat.
        console.error(videoE);
        return;
    }
    //Toggle the mute
    videoE.muted = !videoE.muted;
}

function videoTogglePlay(videoE) 
{
    if(videoE === undefined)
    {
        //Stop the function if the video is null/undefined, will stop errors occurring in the chat.
        console.error(videoE);
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
    function bindClick(element, functionTOAdd, ... funcToAddParamaters)
    {
        console.log(funcToAddParamaters);
        element.addEventListener("click", function () {
            functionTOAdd(funcToAddParamaters[0]);
        })
    }
    // Iterate through each child tag of the visual controls, finding each button and then binding the relevant function.
    videoControls.childNodes.forEach((element) => {
        switch (element.id)
        {
            case "main-video-controls-play":
                // The Play button.
                bindClick(element,videoTogglePlay,videoElement);
                // element.addEventListener("click", function () { videoTogglePlay(videoElement); });
                break;
            case "main-video-controls-mute":
                // The mute button
                element.addEventListener("click", function () { videoToggleMute(videoElement); });
                break;
            case "main  -video-controls-fullscreen":
                console.log("Full-screen");
                break;
            case "main-video-controls-backward":
                console.log("Backward");
                break;
            case "main-video-controls-backward-step":
                console.log("Backward-Step");
                break;
            case "main-video-controls-forward":
                console.log("Forward");
                break;
            case "main-video-controls-forward-step":
                console.log("Forward-Step");
                break;
        }
    });
}