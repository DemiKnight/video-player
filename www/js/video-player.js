document.addEventListener("DOMContentLoaded", () =>
{
    const videoElement = document.getElementById("main-video");
    const videoElementControls = document.getElementById("main-video-controls");

    //Make sure all the video information is ready to be accessed.
    videoElement.addEventListener("loadeddata", () =>
    {
        addListeners(videoElement, videoElementControls);
    });
});

/**
 * Will toggle the muted state of the video.
 * @param {HTMLMediaElement} videoElement Video to toggle the mute on.
 */
function videoToggleMute(videoElement)
{
    //As a precaution, stop anything other than a video element from being "muted". In case another developer uses this function incorrectly.
    if (videoElement instanceof HTMLMediaElement)
    {
        videoElement.muted = !videoElement.muted;
    } else {
        //Stop the function if the video is null/undefined, .
        console.error("Invalid element passed to mute.");
        console.error(videoElement);
    }
}

/**
 * Will will toggle between pause and play for the specified video.
 * @param {HTMLMediaElement} videoElement
 */
function videoTogglePlay(videoElement)
{
    if(videoElement instanceof HTMLMediaElement)
    {
        /*
        Alternative to the if below, using the with statement will require less calls to the original object, potentially a
        performance increase. WIP TODO Test whether there is any point in using this statement
        The witch statement will extend the scope of the HTMLMediaELement object and will allow direct access to the methods
        inside.
        with(videoElement)
        {
            if(paused)
            {
                play();
            }else
            {
                pause();
            }
        }
        */
        if (videoElement.paused)
        {
            videoElement.play();
        }
        else
        {
            videoElement.pause();
        }

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
 * @param {HTMLMediaElement} videoElement The video to apply this function to.
 */
function videoToggleFullScreen(videoElement) {
    if(videoElement instanceof HTMLMediaElement)
    {
        if(!videoElement.fullscreenElement)
        {
            if(videoElement.requestFullscreen !== undefined) videoElement.requestFullscreen();
            if(videoElement.webkitRequestFullScreen !== undefined) videoElement.webkitRequestFullScreen();
        }
        else
        {
            if(videoElement.exitFullscreen !== undefined) videoElement.exitFullscreen();
            if(videoElement.webkitExitFullscreen() !== undefined) videoElement.webkitExitFullscreen();
        }
    }
}

/**
 * Add the changeAmount given to the timestamp of the video, moving it forward or backwards.
 *
 * @param {HTMLMediaElement} videoElement The video to modify
 * @param {int} changeAmount index 1, the changeAmount The changeAmount of time to take/add.
 */
function videoTimeStampAdder(videoElement, changeAmount)
{
    videoElement.currentTime += changeAmount;
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

/**
 *
 * @param videoElement
 * @param target
 */
function videoLocationSlider(videoElement, target)
{
    videoElement.currentTime = (videoElement.duration * (target/100));
}

/**
 * Change inner HTML of a element to the current value of an input
 * @param {HTMLElement} elementToWatch Input element
 * @param {HTMLInputElement} valueToChangeTo
 */
function videoVolumeValueChange(elementToWatch, valueToChangeTo) {
    elementToWatch.innerHTML = (Math.round(valueToChangeTo.value * 100)).toString() ;
}

/**
 * Will add functionality to the controls for the given video. Will also set values for the input controls based on the video.
 *
 * This function also makes use of closure[1] (specifically Lexical scoping) to reduce repeated code and make user of variables in scope.
 *
 * -1- 'Closures' (28/05/2018), Mozilla Developer Network [online] 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures>
 * @param {HTMLMediaElement} videoElement Reference to the main video tag.
 * @param {HTMLDivElement} videoControls Reference to the controls for the previous video.
 */
function addListeners(videoElement, videoControls)
{
    /**
     * Used to bind the video control buttons to the correct video and functionality.
     *
     * Using the Spread operator [1] to take in excess parameters that will then be passed to the given function.
     *
     * -1- 'Spread syntax' (13-11-18), Mozilla Developer Network [online] Accessed 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax> ---
     *
     * @param {ChildNode} element Button to bind
     * @param {function} functionTOAdd The function to call when the button is clicked.
     * @param funcToAddParamaters The parameters to pass to the aforementioned function. Needs to include the video reference.
     */
    function bindClick(element, functionTOAdd, ... funcToAddParamaters)
    {
        // Bind to the 'click'
        element.addEventListener("click", () =>
        {
            //Any excess parameters pass into function, should always include a reference to the video.
            functionTOAdd(videoElement, ... funcToAddParamaters);
        });
    }

    /**
     * Used to add the double click event to a specified input device.
     *
     * @param {ChildNode} element Input element to add event.
     * @param {function} functionToCall Function to call when event is fired.
     * @param {... args} funcToAddParamaters Paramaters to pass to the functionToCall
     */
    function bindDoubleClick(element, functionToCall, ... funcToAddParamaters)
    {
        element.addEventListener("dblclick", () =>
        {
            functionToCall(videoElement, ... funcToAddParamaters)
        });
    }


    /**
     * Binds functions relevant to the slider value changing.
     *
     * @param {HTMLInputElement} element The (slider input) element to bind the function to.
     * @param functionToAdd The function to call when event is fired.
     * @param {function} functionOnChange
     * @param functionValues 
     */
    function bindSlider(element, functionToAdd, functionOnChange, ... functionValues)
    {
        element.addEventListener("input", () => {
            functionToAdd(videoElement, element.value);
        });

        //If there is no function provided, don't add the change Event.
        if(functionOnChange!==undefined)
            element.addEventListener("change", () => {
                functionOnChange( ... functionValues)
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
    videoControls.childNodes.forEach((element) =>
    {
        /*
        videoControls is a dom object that is a static reference to the div containing all controls for the relative video.
        As a dom object, it also contains a list with every child elements; in this case these are the controls we need to add events to.

        Due to this, I don't feel the need to query the main DOM page any further, as we already have the elements. So instead,
        iterate over every child element and attach the relevant events. Also, because we are using a reference to a specific
        element, it can be re-usued for many videos on the same page.

        I chose to use a switch statement because we will be comparing . It also naturally uses a 'strict comparison'[1]
        for every case which is preferred Style Guide.  Though I was not aware of this when first implementing the switch statement,
        there is a speed improvement when using switch over if...else [2], according to one source.

        -1- 'switch' 9/08/2018, 'Mozilla Developer Network' [online] Accessed 22/11/2018 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch> ---
        -2- {switch benchmark} ~2016, 'Sam Allen'           [online] Accessed 22/11/2018 <https://www.dotnetperls.com/switch-js> ---
         */
        switch (element.id)
        {
            case "main-video-controls-play": // The Play button.

                bindClick(element, videoTogglePlay,videoElement);

                break;
            case "main-video-controls-mute": // The mute button

                bindClick(element, videoToggleMute, videoElement);

                break;
            case "main-video-controls-fullscreen": //Full screen button

                bindClick(element, videoToggleFullScreen, videoElement);
                break;
            case "main-video-controls-backward": //Backwards button

                bindClick(element, videoTimeStampAdder, -10); //On single click, move current time back 10 seconds

                bindDoubleClick(element, videoTimeStampAdder, -(videoElement.duration - videoElement.currentTime)); //On double click, move back to beginning

                break;
            case "main-video-controls-forward": // Forward button

                bindClick(element, videoTimeStampAdder, 10);

                bindDoubleClick(element, videoTimeStampAdder, videoElement.currentTime + (0.25 * videoElement.duration) );

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

                bindSlider(
                    element.firstElementChild,
                    videoVolumeChange,
                    videoVolumeValueChange,
                    element.children.namedItem("main-video-controls-volumeSlider-value"),
                    element.firstElementChild);
                videoVolumeValueChange(element.children.namedItem("main-video-controls-volumeSlider-value"),element.firstElementChild);
                break;

            case "main-video-controls-locationSlider":
                // bindLoad(element, videoElement,{
                //     max: (videoElement) => {
                //         return videoElement.duration;
                //     },
                //     step: (videoElement) => {
                //         return videoElement.duration/100;
                //     }
                // });
                bindSlider(element.firstElementChild, videoLocationSlider);
                break;
        }
    });
}
