/**
 * [1] Suggestions to reduce the amount of code to improve readability and speed.
 *
 * -1- J Evans, Loreto Sixth Form College, Code-Up Stockport (26/11/2018) ---
 */

document.addEventListener("DOMContentLoaded", loadVideo); /*() =>
{
    const videoElement = document.getElementById("main-video");
    const videoElementControls = document.getElementById("main-video-controls");

    //Make sure all the video information is ready to be accessed.
    videoElement.addEventListener("loadeddata", () =>
    {
        addListeners(videoElement, videoElementControls);
    });
});*/


function loadVideo()
{
    console.log("Loading video.");
    const videoElement = document.getElementById("main-video");
    // const videoElementControls = document.getElementById("main-video-controls");

    const videoControlLocationSlider = document.getElementById("main-video-controls-locationSlider");
    const videoControlPlayButton = document.getElementById("main-video-controls-play");
    const videoControlMute = document.getElementById("main-video-controls-mute");
    const videoControlFullscreen = document.getElementById("main-video-controls-fullscreen");
    const videoControlBackward = document.getElementById("main-video-controls-backward");
    const videoControlForward = document.getElementById("main-video-controls-forward");
    const videoControlSpeedchanger = document.getElementById("main-video-controls-speedChanger");
    const videoControlVolumeSlider = document.getElementById("main-video-controls-volumeSlider");

    let duration = Math.round(videoElement.duration);

    /**
     * Will will toggle between pause and play for the specified video.
     * @param {HTMLMediaElement} videoElement
     * @param {HTMLButtonElement} controlTag
     */
    function toggleVideoPlay()
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

        if(videoControlPlayButton.children[0].classList[1] === "fa-play")
        {
            videoControlPlayButton.children[0].classList.remove("fa-play");
            videoControlPlayButton.children[0].classList.add("fa-pause");
        }else{
            videoControlPlayButton.children[0].classList.remove("fa-pause");
            videoControlPlayButton.children[0].classList.add("fa-play");
        }
    }

    /**
     * Will toggle the muted state of the video.
     * @param {HTMLMediaElement} videoElement Video to toggle the mute on.
     * @param {HTMLButtonElement} controlTag
     */
    function toggleVideoMute()
    {
        videoElement.muted = !videoElement.muted;
        if(videoControlMute.children[0].classList[1] === "fa-volume-up")
        {
            videoControlMute.children[0].classList.remove("fa-volume-up");
            videoControlMute.children[0].classList.add("fa-volume-slash");
        }else{
            videoControlMute.children[0].classList.remove("fa-volume-slash");
            videoControlMute.children[0].classList.add("fa-volume-up");
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
    function toggleVideoFullScreen()
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

    /**
     * Changes the volume based on the amount given.
     * @param {HTMLMediaElement} videoE The video element to change.
     * @param {HTMLInputElement} inputControl The value to change the volume to.
     * @param {HTMLSpanElement} labelToUpdate Label to represent the video volume.
     */
    function videoVolumeChange()
    {
        videoElement.volume = parseFloat(videoControlVolumeSlider.children[0].value);//Turn string to float for volume usage

        videoControlVolumeSlider.children[1].innerHTML = (videoElement.volume*100).toString();
    }

    function videoLocationChange()
    {
        videoControlLocationSlider.children[1].value = videoElement.currentTime; //Set the slider value to current video frame.

        /*
        Set the span to the current timestamp of the video. In the format hh:mm:ss.
        The hour part is dependent of the video exceeding 3600 hours.
        TODO Reduce the amount of code by adding seperate span tags for each numeric value or a date/time element.
         */
        videoControlLocationSlider.children[0].innerHTML =
            (duration > 3600 ? Math.round(videoElement.currentTime % 3600).toString().padStart(2, '0') +  ":" : "") + //Calcuate the number of hours in video, if exceeds 1 hour
            Math.floor(videoElement.currentTime / 60).toString().padStart(2,'0') + ":" + //Calculate minutes
            Math.round(videoElement.currentTime % 60).toString().padStart(2,'0'); //Calculate seconds
    }

    function videoLocationChangeDrag()
    {
        videoElement.currentTime = videoControlLocationSlider.children[1].value;
    }


    function keyBindings(event)
    {
        switch (event.key)
        {
            case " ": case "Spacebar":

            toggleVideoPlay();

            break;

            case "m":case "M":

            toggleVideoMute();

            break;

            case "ArrowRight": case "Right":

            videoTimeForwardClick();

            break;

            case "ArrowLeft": case "Left":

            videoTimeBackwardClick();

            break;

            case "f": case "F":

            toggleVideoFullScreen();

            break;

            case "ArrowUp": case "Up":

            if(!((videoElement.volume + 0.1) > 1))
            {

                // videoElement.volume += parseFloat(0.1.toFixed()); //increment by 0.1
                videoElement.volume = parseFloat((videoElement.volume + 0.1).toFixed(2));

                videoControls.children[7].children[1].innerHTML = Math.round(videoElement.volume*100).toString(); //Change the label value

                videoControls.children[7].children[0].value = videoElement.volume; //Change the slider value to the video control.
            }

            break;


            case "ArrowDown": case "Down":

            if(!((videoElement.volume-0.1) < 0))
            {
                // -= parseFloat(0.1.toFixed());

                videoElement.volume = parseFloat((videoElement.volume - 0.1).toFixed(2));

                videoControls.children[7].children[1].innerHTML = Math.round(videoElement.volume*100).toString(); //Change the label value
                videoControls.children[7].children[0].value = videoElement.volume; //Change the slider value to the video control.

            }

            break;
        }
    }

    function changeVisability()
    {
        switch (document.visibilityState)
        {
            case "hidden":
                ///
                if (!videoElement.paused) toggleVideoPlay(videoElement);


                break;
            case "visible":
                //

                toggleVideoPlay(videoElement);

                break;
        }
    }

    function videoTimeBackwardClick(){videoElement.currentTime -= 10;}
    function videoTimeBackwardDoubleClick(){videoElement.currentTime = 0;}

    function videoTimeForwardClick(){videoElement.currentTime += 10;}
    function videoTimeFOrwarddDoubleClick(){videoElement.currentTime += 30;}

    // ## Register Event Listeners

    function defaultValues()
    {
        // ## Default values
        videoVolumeChange();

        videoControlLocationSlider.children[1].max = duration;

        /*
                    Set the span to the duration of the video, in the format: hh:mm:ss.
                    The hour part is dependent of the video exceeding 3600 hours.

                    Calculation for both total duration and current time.

                    ## Calculations:

                    - 'duration % 60' . Get the remainder after dividing by num of seconds in a minute. Then get whole number, which is the seconds.
                    - 'duration / 60' . Get the number of minutes within the time, then remove all remaining decimals.

                    - For calculating hours:
                        - duration > 3600 . If the duration is greater than 3600, then the length is greater than a hour and should display the additional numerical values.
                        - duration % 3600 . Get the number of hours within the duration.

                     x % y : Modulus or Remainder operator [3], will get the remainding value after diving two numbers.

                     Math.floor() : [1] will get the lowest integer value. Useful for getting the number of minutes within the current time regardless of the seconds to the next minute.
                     Math.round() : [2] Will get the closest whole integer. Useful got getting the closest second after using the modulus operation.
                     padStart(lengthToPad, fillerString) : Pad the beginning of the string with 0's, unless overridden.


                    -1- 'Math.floor()' 29/11/2018, Mozilla Developer Network [online] Accessed 06/12/2018 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor> ---
                    -2- 'Math.round()' 13/07/2018, Mozilla Developer Network [online] Accessed 06/12/2018 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round> ---
                    -3- 'Arithmetic operators' 16/05/2018, Mozilla Developer Network [online] Accessed 06/12/2018 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()> ---
                     */
        videoControlLocationSlider.children[2].innerHTML =
            (duration > 3600 ? Math.round(duration % 3600).toString().padStart(2, '0') +  ":" : "") + //Calcuate the number of hours in video, if exceeds 1 hour
            Math.floor(duration / 60).toString().padStart(2,'0') + ":" + //Calculate minutes
            Math.round(duration % 60).toString().padStart(2,'0'); //Calculate seconds
    }

    function eventListeners()
    {
        console.log("Event LIsteners");
        videoControlPlayButton.addEventListener("click", toggleVideoPlay);

        videoControlMute.addEventListener("click", toggleVideoMute);

        videoControlFullscreen.addEventListener("click", toggleVideoFullScreen);

        videoControlVolumeSlider.addEventListener("input", videoVolumeChange);

        videoControlBackward.addEventListener("click", videoTimeBackwardClick);
        videoControlBackward.addEventListener("dblclick", videoTimeBackwardDoubleClick);

        videoControlForward.addEventListener("click", videoTimeForwardClick);
        videoControlForward.addEventListener("dblclick", videoTimeFOrwarddDoubleClick);

        videoControlLocationSlider.addEventListener("timeupdate", videoLocationChange);
        videoControlLocationSlider.addEventListener("input", videoLocationChangeDrag);

        defaultValues();
    }

    document.addEventListener("keydown", keyBindings);
    document.addEventListener("visibilitychange", changeVisability);

    videoElement.addEventListener("loadeddata", eventListeners);
    
}





/**
 * Add the changeAmount given to the timestamp of the video, moving it forward or backwards.
 *
 * @param {HTMLMediaElement} videoElement The video to modify
 * @param {int} changeAmount index 1, the changeAmount The changeAmount of time to take/add.
 * @deprecated
 */
function videoTimeStampAdder(videoElement, changeAmount)
{
    videoElement.currentTime += changeAmount;
}



/**
 * Change inner HTML of a element to the current value of an input
 * @param {HTMLElement} elementToWatch Input element
 * @param {HTMLInputElement} valueToChangeTo
 * @deprecated
 */
function videoVolumeValueChange(elementToWatch, valueToChangeTo) {
    elementToWatch.innerHTML = (Math.round(valueToChangeTo.value * 100)).toString() ;
}

function addVisabilityBinding(videoElement, videoControls)
{

    switch (document.visibilityState)
    {
        case "hidden":
            ///

            console.log("HIdden");

            if (!videoElement.paused) toggleVideoPlay(videoElement, videoControls.children[1]);


            break;
        case "visible":
            //
            console.log("VIsabike");
            toggleVideoPlay(videoElement, videoControls.children[1]);

            break;
    }
}

function addKeyBindings(keyEvent, videoElement, videoControls) {
    switch (keyEvent.key)
    {
        case " ": case "Spacebar":

        toggleVideoPlay(videoElement, videoControls.children[1]);

        break;

        case "m":case "M":

        //TODO Need to add a way for the lookup to grab the mute control.
        toggleVideoMute(videoElement, videoControls.children[2]);

        break;

        case "ArrowRight": case "Right":

        videoElement.currentTime += 30;

        break;

        case "ArrowLeft": case "Left":

        videoElement.currentTime -= 10;

        break;

        case "f": case "F":

        toggleVideoFullScreen(videoElement);

        break;

        case "ArrowUp": case "Up":

        if(!((videoElement.volume + 0.1) > 1))
        {

            // videoElement.volume += parseFloat(0.1.toFixed()); //increment by 0.1
            videoElement.volume = parseFloat((videoElement.volume + 0.1).toFixed(2));

            videoControls.children[7].children[1].innerHTML = Math.round(videoElement.volume*100).toString(); //Change the label value

            videoControls.children[7].children[0].value = videoElement.volume; //Change the slider value to the video control.
        }

        break;


        case "ArrowDown": case "Down":

        if(!((videoElement.volume-0.1) < 0))
        {
            // -= parseFloat(0.1.toFixed());

            videoElement.volume = parseFloat((videoElement.volume - 0.1).toFixed(2));

            videoControls.children[7].children[1].innerHTML = Math.round(videoElement.volume*100).toString(); //Change the label value
            videoControls.children[7].children[0].value = videoElement.volume; //Change the slider value to the video control.

        }

        break;
    }

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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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

    // Iterate through each child tag of the visual controls, finding each button and then binding the relevant function.
    /**
     *
     */
    videoControls.childNodes.forEach(
        /**
         *
         * @param {HTMLElement} element
         */
        (element) =>
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

                console.log(element.children[0].classList);

                element.addEventListener("click", ()=>{toggleVideoPlay(videoElement,element);}); //Toggle on button click

                break;
            case "main-video-controls-mute": // The mute button

                element.addEventListener("click", ()=>{toggleVideoMute(videoElement, element);}); //Toggle mute

                break;
            case "main-video-controls-fullscreen": //Full screen button

                element.addEventListener("click", ()=>{toggleVideoFullScreen(videoElement);});

                break;
            case "main-video-controls-backward": //Backwards button

                /*
                Single click === -10 seconds
                Double Click === back to beginning.
                 */
                element.addEventListener("click", ()=>
                {
                    videoElement.currentTime -= 10;
                });

                element.addEventListener("dblclick", ()=>
                {
                    videoElement.currentTime = 0;
                });


                break;
            case "main-video-controls-forward": // Forward button

                /*
                Single click === +10 seconds
                Double Click === +30 seconds
                 */

                element.addEventListener("click", ()=>
                {
                    videoElement.currentTime += 10;
                });//On single click, move current time back 10 seconds

                element.addEventListener("dblclick", ()=>
                {
                    videoElement.currentTime += 30;
                });

                break;
            case "main-video-controls-volumeSlider":

                /*
                ## Literal Representations:

                element.children == Array[2]

                children [0] === <input type="range" id="main-video-controls-volumeSlider-input" min="0" max="1" step="0.1" value="0.6">
                children [1] === <span id="main-video-controls-volumeSlider-value">0</span>

                ## Meaning :

                children [0] : Volume slider
                children [1] : Volume indicator

                 */

                element.firstElementChild.addEventListener("input", ()=>
                {
                    // When the value of the input changes, update the label & video volume.
                    videoVolumeChange(videoElement, element.children[0], element.children[1]);
                });

                //Set default values. Using the video volume input.
                videoElement.volume = element.children[0].value;
                element.children[1].innerHTML = (videoElement.volume*100).toString();

                break;

            case "main-video-controls-locationSlider":
                /*
                ## Literal Representations:

                element.children == Array[3]

                children [0] === <span id="main-video-controls-currentTime" title="Current Location">00:00</span>

                children [1] === <input type="range" id="main-video-controls-locationSlider-input" class="main-video-controls-locationSlider-input" min="0" max="100" step="1" value="0">

                children [2] === <span id="main-video-controls-maximumTime" title="Maximum duration">00:00</span>

                ## Meaning :

                children [0] : Current location/timestamp (hh:mm:ss).
                children [1] : The slider representing the video playback location.
                children [2] : Maximum duration of video (hh:mm:ss).
                 */

                let duration = Math.round(videoElement.duration);


                element.children[1].max = duration; //Set the max length of the slider to the video duration.

                /*
                Set the span to the duration of the video, in the format: hh:mm:ss.
                The hour part is dependent of the video exceeding 3600 hours.

                Calculation for both total duration and current time.

                ## Calculations:

                - 'duration % 60' . Get the remainder after dividing by num of seconds in a minute. Then get whole number, which is the seconds.
                - 'duration / 60' . Get the number of minutes within the time, then remove all remaining decimals.

                - For calculating hours:
                    - duration > 3600 . If the duration is greater than 3600, then the length is greater than a hour and should display the additional numerical values.
                    - duration % 3600 . Get the number of hours within the duration.

                 x % y : Modulus or Remainder operator [3], will get the remainding value after diving two numbers.

                 Math.floor() : [1] will get the lowest integer value. Useful for getting the number of minutes within the current time regardless of the seconds to the next minute.
                 Math.round() : [2] Will get the closest whole integer. Useful got getting the closest second after using the modulus operation.
                 padStart(lengthToPad, fillerString) : Pad the beginning of the string with 0's, unless overridden.


                -1- 'Math.floor()' 29/11/2018, Mozilla Developer Network [online] Accessed 06/12/2018 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor> ---
                -2- 'Math.round()' 13/07/2018, Mozilla Developer Network [online] Accessed 06/12/2018 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round> ---
                -3- 'Arithmetic operators' 16/05/2018, Mozilla Developer Network [online] Accessed 06/12/2018 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()> ---
                 */
                element.children[2].innerHTML =
                    (duration > 3600 ? Math.round(duration % 3600).toString().padStart(2, '0') +  ":" : "") + //Calcuate the number of hours in video, if exceeds 1 hour
                    Math.floor(duration / 60).toString().padStart(2,'0') + ":" + //Calculate minutes
                    Math.round(duration % 60).toString().padStart(2,'0'); //Calculate seconds


                videoElement.addEventListener("timeupdate", () =>
                {
                    element.children[1].value = videoElement.currentTime; //Set the slider value to current video frame.

                    /*
                    Set the span to the current timestamp of the video. In the format hh:mm:ss.
                    The hour part is dependent of the video exceeding 3600 hours.
                    TODO Reduce the amount of code by adding seperate span tags for each numeric value or a date/time element.
                     */
                    element.children[0].innerHTML =
                        (duration > 3600 ? Math.round(videoElement.currentTime % 3600).toString().padStart(2, '0') +  ":" : "") + //Calcuate the number of hours in video, if exceeds 1 hour
                        Math.floor(videoElement.currentTime / 60).toString().padStart(2,'0') + ":" + //Calculate minutes
                        Math.round(videoElement.currentTime % 60).toString().padStart(2,'0'); //Calculate seconds
                });

                /*
                When the value of the location slider changes, update the currentVideo.
                 */
                element.children[1].addEventListener("input", () =>
                {
                    videoElement.currentTime = element.children[1].value;
                });

                break;

            case "main-video-controls-speedChanger":

                //Set the playbackrate to the value of the dropdown. Default is 1.0
                element.addEventListener("input", () => {
                    videoElement.playbackRate = element.value;
                });

                break;
        }
    });


    //Keyboard Shortcuts

    document.addEventListener("keydown", (event) =>
    {

        switch (event.key)
        {
            case " ": case "Spacebar":

                toggleVideoPlay(videoElement, videoControls.children[1]);

                break;

            case "m":case "M":

                //TODO Need to add a way for the lookup to grab the mute control.
                toggleVideoMute(videoElement, videoControls.children[2]);

                break;

            case "ArrowRight": case "Right":

                videoElement.currentTime += 30;

                break;

            case "ArrowLeft": case "Left":

                videoElement.currentTime -= 10;

                break;

            case "f": case "F":

                toggleVideoFullScreen(videoElement);

                break;

            case "ArrowUp": case "Up":

                if(!((videoElement.volume + 0.1) > 1))
                {

                    // videoElement.volume += parseFloat(0.1.toFixed()); //increment by 0.1
                    videoElement.volume = parseFloat((videoElement.volume + 0.1).toFixed(2));

                    videoControls.children[7].children[1].innerHTML = Math.round(videoElement.volume*100).toString(); //Change the label value

                    videoControls.children[7].children[0].value = videoElement.volume; //Change the slider value to the video control.
                }

                break;


            case "ArrowDown": case "Down":

                if(!((videoElement.volume-0.1) < 0))
                {
                     // -= parseFloat(0.1.toFixed());

                    videoElement.volume = parseFloat((videoElement.volume - 0.1).toFixed(2));

                    videoControls.children[7].children[1].innerHTML = Math.round(videoElement.volume*100).toString(); //Change the label value
                    videoControls.children[7].children[0].value = videoElement.volume; //Change the slider value to the video control.

                }

                break;
        }
    });

    //When user changes viability, to
    document.addEventListener("visibilitychange", () => {
        switch (document.visibilityState)
        {
            case "hidden":
                ///
                if (!videoElement.paused) toggleVideoPlay(videoElement);


                break;
            case "visible":
                //

                toggleVideoPlay(videoElement);

                break;
        }
        // //TODO Improve logic,
        // if (!videoElement.paused && document.visibilityState === "hidden")
        //     toggleVideoPlay(videoElement);
        // if(document.visibilityState === "visible") toggleVideoPlay(videoElement);

    });
}
