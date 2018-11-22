document.addEventListener("DOMContentLoaded", () =>
{
    const videoElement = document.getElementById("main-video");
    const videoElementControls = document.getElementById("main-video-controls");

    //Make sure all the video information can be accessed first.
    videoElement.addEventListener("loadeddata", () => {
        addListeners(videoElement, videoElementControls);
    });
});

function videoToggleMute(videoE)
{
    if (videoE !== undefined) {
        videoE.muted = !videoE.muted;
    } else {
        //Stop the function if the video is null/undefined, will stop errors occurring in the chat.
        console.error(videoE);
    }
    //Toggle the mute
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
 * Will toggle fullscreen, using the Fullscreen API [1,2]. Need to find a better way of implementing this feature due to it being discontinued [3]
 *
 * TODO Find a way to overwrite default controls when in fullscreen mode.vid
 *
 * -1- 'Fullscreen API' (13/11/18), Mozilla Developer Network [online] Accessed 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API> ---
 * -2- 'Fullscreen API' (02/11/18), whatwg <https://fullscreen.spec.whatwg.org/> ---
 * -3- 'Fullscreen' (18/11/14), W3C [online] Accessed 15/11/18 <https://www.w3.org/TR/fullscreen/> ---
 * @param videoE The video to apply this function to.
 * @deprecated
 */
function videoToggleFullScreen(videoE) {
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

/**
 *
 * @param videoE The video to modify
 * @param {array} From index 1, the amount The amount of time to take/add.
 */
function videoSkip(videoE, amount) {
    console.log(amount);
    videoE.currentTime += amount; // Adds the amount passed in to the function.
}
/**
 * Will add functionality to the buttons controlling the given video.
 *
 * This function also makes use of closure[1] (specifically Lexical scoping) to reduce repeated code and make user of variables in scope.
 *
 * -1- 'Closures' (28/05/2018), Mozilla Developer Network [online] 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures>
 * @param {HTMLMediaElement} videoElement Reference to the main video tag.
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
        element.addEventListener("click", () => {
            //Any excess parameters pass into function, should always include a reference to the video.
            functionTOAdd(videoElement, ... funcToAddParamaters);
        });

        // if(typeof functionOnDoubleClick === "function")
        // element.addEventListener("dblclick", () => {
        //     functionOnDoubleClick(videoElement, ... funcToAddParamaters)
        // })
    }

    function bindDoubleClick(element, functionToCall, ... funcToAddParamaters)
    {
        element.addEventListener("dblclick", () => {
                functionToCall(videoElement, ... funcToAddParamaters)
            });
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
                // console.log("Backward");
                bindClick(element, videoSkip, -10);
                bindDoubleClick(element, videoSkip, -(videoElement.duration - videoElement.currentTime));
                break;


            case "main-video-controls-forward":
                console.log(videoElement.duration);
                bindClick(element, videoSkip, 10);
                bindDoubleClick(element, videoSkip, videoElement.currentTime + (0.25 * videoElement.duration) );
                break;
        }
    });
}
