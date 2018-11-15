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
 * Will toggle fullscreen, using the Fullscreen API [1,2].
 *
 * TODO Find a way to overwrite default controls when in fullscreen mode.vid
 *
 * -1- 'Fullscreen API' (13/11/18), Mozilla Developer Network [online] Accessed 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API> ---
 * -2- 'Fullscreen API' (02/11/18), whatwg <https://fullscreen.spec.whatwg.org/> ---
 * @param videoE
 */
function videoToggleFullScreen(videoE) {
    console.log("Fullscreen");
    if(!videoE.fullscreenElement)
    {
        if(videoE.requestFullscreen !== undefined) videoE.requestFullscreen();
        if(videoE.webkitRequestFullScreen !== undefined) videoE.webkitRequestFullScreen();
    }
    else
    {
        if(videoE.exitFullscreen !== undefined) videoE.exitFullscreen();
        if(videoE.webkitExitFullscreen() !== undefined) videoE.webkitExitFullscreen();
    }
}

function videoSkipBackward(videoE)
{
    console.log("Backward");
}
function videoSkipBackwardStep(videoE)
{
    console.log("Backward Step");
}
function videoSkipForward(videoE)
{
    console.log("Forward");
}
function videoSkipForwardStep(videoE)
{
    console.log("Forward Step");
}
/**
 * Will add functionality to the buttons controlling the given video.
 *
 * This function also makes use of closure[1] (specifically Lexical scoping) to reduce repeated code and make user of variables in scope.
 *
 * -1- 'Closures' (28/05/2018), Mozilla Developer Network [online] 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures>
 * @param videoElement Reference to the main video tag.
 * @param videoControls Reference to the controls for the previous video.
 */
function addListeners(videoElement, videoControls)
{
    /**
     * Used to bind the video control buttons to the correct video and functionality.
     *
     * Using the Spread operator to take in excess parameters that will then be passed to the given function. Refereed to [1] when
     * trying to fix the issue from the previous commit 'ccc85c7f51ca3f8bd762bd0d1a75137fd71d3009'
     * -1- 'Spread syntax' (13-11-18), Mozilla Developer Network [online] Accessed 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax> ---
     * @param element Button to bind
     * @param functionTOAdd The function to call when the button is clicked.
     * @param funcToAddParamaters The parameters to pass to the aforementioned function. Needs to include the video reference.
     */
    function bindClick(element, functionTOAdd, ... funcToAddParamaters)
    {
        // Bind to the 'click'
        element.addEventListener("click", function () {
            //Any excess parameters pass into function, should always include a reference to the video.
            functionTOAdd(videoElement,...funcToAddParamaters);
        })
    }
    // Iterate through each child tag of the visual controls, finding each button and then binding the relevant function.
    videoControls.childNodes.forEach((element) => {
        switch (element.id)
        {
            case "main-video-controls-play":
                // The Play button.
                bindClick(element, videoTogglePlay,videoElement);
                // element.addEventListener("click", function () { videoTogglePlay(videoElement); });
                break;
            case "main-video-controls-mute":
                // The mute button
                bindClick(element, videoToggleMute, videoElement);
                // element.addEventListener("click", function () { videoToggleMute(videoElement); });
                break;
            case "main-video-controls-fullscreen":
                console.log("Full-screen");
                bindClick(element, videoToggleFullScreen, videoElement);
                break;
            case "main-video-controls-backward":
                console.log("Backward");
                bindClick(element, videoSkipBackward, videoElement);
                break;
            case "main-video-controls-backward-step":
                console.log("Backward-Step");
                bindClick(element, videoSkipBackwardStep, videoElement);
                break;
            case "main-video-controls-forward":
                console.log("Forward");
                bindClick(element, videoSkipForward, videoElement);
                break;
            case "main-video-controls-forward-step":
                console.log("Forward-Step");
                bindClick(element, videoSkipForwardStep, videoElement);
                break;
        }
    });
}