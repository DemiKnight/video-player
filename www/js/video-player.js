document.addEventListener("DOMContentLoaded", () =>
{
    const videoElement = document.getElementById("main-video");
    const videoElementControls = document.getElementById("main-video-controls");

    console.log(videoElement.duration);

    addListeners(videoElement, videoElementControls);
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

/**
 *
 * @param videoE The video to modify
 * @param {array} amount index 1, the amount The amount of time to take/add.
 */
function videoSkip(videoE, amount) {
    videoE.currentTime += amount[1]; // Adds the amount passed in to the function.
}

/**
 * Changes the volume based on the amount given.
 * @param videoE The video element to change.
 * @param amount The value to change the volume to.
 */
function videoVolumeChange(videoE, amount)
{
    videoE.volume = amount;
}

function videoLocationSlider(videoE, target)
{
    videoE.currentTime = videoE.duration * (target/100);
}

/**
 * Will add functionality to the controls for the given video. Will also set values for the input controls based on the video.
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
        element.addEventListener("click", () => {
            //Any excess parameters pass into function, should always include a reference to the video.
            functionTOAdd(videoElement, funcToAddParamaters);
        });
    }

    /**
     * Binds functions relevant to the slider value changing.
     *
     * @param element The (slider input) element to bind the function to.
     * @param functionToAdd The function to call when event is fired.
     */
    function bindSlider(element, functionToAdd)
    {
        element.addEventListener("input", () => {
            functionToAdd(videoElement, element.value);
        });
    }

    /**
     * Will apply default values to a element, when a given element has fully loaded.
     *  TODO WIP Make this work
     * @param element
     * @param elementToCheck
     * @param defaultValueObject
     */
    function bindLoad(element, elementToCheck, defaultValueObject)
    {
        elementToCheck.addEventListener("loadeddata", () => {
            console.log(element);
            // element = Object.assign(element,defaultValueObject);
            const tempjsonStore = Object.entries(defaultValueObject);
            // with(element){
            //      for (const [propertyToChange, valueToChangeWith] in defaultValueObject)
            //      {
            //          propertyToChange.valueOf() = valueToChangeWith;
            //      }
            // }
            console.log(element);
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
                console.log("Backward");
                bindClick(element, videoSkip, videoElement, -10);
                break;
            case "main-video-controls-backward-step":
                console.log("Backward-Step");
                bindClick(element, videoSkip, videoElement, -1);
                break;
            case "main-video-controls-forward":
                console.log("Forward");
                bindClick(element, videoSkip, videoElement, 1);
                break;
            case "main-video-controls-forward-step":
                console.log("Forward-Step");
                bindClick(element, videoSkip, videoElement, 10);
                break;
            case "main-video-controls-volumeSlider":
                console.log("Volume Slider");

                bindSlider(element,videoVolumeChange);
                break;

            case "main-video-controls-locationSlider":
                //Todo Validate whether this works.

                // bindLoad(element, videoElement,{
                //     max: (videoElement) => {
                //         return videoElement.duration;
                //     },
                //     step: (videoElement) => {
                //         return videoElement.duration/100;
                //     }
                // });
                bindSlider(element, videoLocationSlider);
                break;
        }
    });
}
