document.addEventListener("DOMContentLoaded", () => {

    const videoElement = document.getElementById("main-video");
    const videoElementControls = document.getElementById("main-video-controls");

    addListeners(videoElement, videoElementControls)
});

function videoToggleMute(videoE)
{
    if(videoE !== undefined && videoE.muted )
    {
        videoE.muted = false;
    }
    {
        videoE.muted = true;
    }
}

function videoTogglePlay(videoE) 
{
    console.log(videoE);
    if (videoE !== undefined && videoE.isPaused)
    {
        console.log("Toggling to play");
        videoE.pause();
    }else if (videoE !== undefined)
    {
        console.log("Toggling to pause");
        videoE.play();
    }else{
        console.log(videoE);
    }
}
/**
 * Will add functionality to the buttons controlling the given video.
 * @param videoElement Reference to the main video tag.
 * @param videoControls Reference to the controls for the previous video.
 */
function addListeners(videoElement, videoControls)
{
    // console.log(videoControls.childNodes);
    videoControls.childNodes.forEach((element) => {
        switch (element.id)
        {
            case "main-video-controls-play":
                // console.log(element);
                // element.addEventListener("click", console.log("click"));
                // element.addEventListener("click", videoTogglePlay(videoElement));
                element.addEventListener("click", function(){
                    videoTogglePlay(videoElement);
                });
                break;
            case "main-video-controls-mute":
                // console.log("Mute Button");
                // console.log(element);
                element.addEventListener("click", function () {
                    videoToggleMute(videoElement);
                });
                break;
            case undefined:
                break;
        }

    });
}