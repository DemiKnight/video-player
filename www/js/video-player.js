/**
 * [1] Suggestions to reduce the amount of code to improve readability and speed.
 *
 * -1- J Evans, Loreto Sixth Form College, Code-Up Stockport (26/11/2018) ---
 */
// let videoP = new loadVideo();
document.addEventListener("DOMContentLoaded", loadVideo);


/**
 * All functions lack the paramaters, due to the required variables already being in scope, however do contain @param
 * in the documentation to indicate which variables are needed to function; and their uses.
 *
 * [3] Throughout this function I will use the .children property, when access child HTML tags. .children is a live HTMLCollection,
 * which will always represent rendered elements on a page. When modified, for example by changing the class list, the changes will instantly take effect.
 *
 * This function also makes use of closure[1] (specifically Lexical scoping) to reduce repeated code and make user of variables in scope.
 * When a function is created, it will remember the environment
 * -1- 'Closures' (28/05/2018), Mozilla Developer Network [online] 15/11/18 <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures>
 *     http://jstherightway.org
 * -3- 'ParentNode.children' (08/03/2018), Mozilla Developer Network [online] Accessed 13/12/2018 <https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children>
 */
function loadVideo()
{

    // ## Main video
    const videoElement = document.getElementById("main-video");

    // ## Constant Controls
    // # Video Buttons
    const videoControlPlayButton = document.getElementById("main-video-controls-play");
    /*
        Children:
            [0] <i class="fas fa-play"></i>
     */

    const videoControlMute = document.getElementById("main-video-controls-mute");
    /*
        Children:
            [0] <i class="fas fa-volume-up"></i>
     */

    const videoControlFullscreen = document.getElementById("main-video-controls-fullscreen");
    /*
        Children:
            [0] <i class="fas fa-expand"></i>
    */

    const videoControlBackward = document.getElementById("main-video-controls-backward");
    /*
        Children:
            [0] <i class="fas fa-arrow-alt-left"></i>
    */

    const videoControlForward = document.getElementById("main-video-controls-forward");
    /*
        Children:
            [0] <i class="fas fa-arrow-alt-right"></i>
    */

    // # Video Slider/dropdown
    const videoControlLocationSlider = document.getElementById("main-video-controls-locationSlider");
    /*
        Children:
            [0] <span id="main-video-controls-currentTime" class="main-video-controls-currentTime" title="Current Location">00:00</span>
            [1] <input type="range" id="main-video-controls-locationSlider-input" class="main-video-controls-locationSlider-input" min="0" max="100" step="1" value="0">
            [2] <span id="main-video-controls-maximumTime" class="main-video-controls-maximumTime" title="Maximum duration">00:00</span>
    */

    const videoControlSpeedChanger = document.getElementById("main-video-controls-speedChanger");
    /*
        Children:
            [0] <option value="0.25">0.25x</option>
            ...
            [4] <option value="1.5">1.5x</option>
    */

    const videoControlVolumeSlider = document.getElementById("main-video-controls-volumeSlider");
    /*
        Children:
            [0] <input type="range" id="main-video-controls-volumeSlider-input" min="0" max="1" step="0.1" value="0.6">
            [1] <span id="main-video-controls-volumeSlider-value">0</span>
    */

    let intentionalPause = false;

    /**
     * Will will toggle between pause and play of {videoElement}, whilst also toggling the icon of the play/pause button.
     * @param {HTMLMediaElement} videoElement
     * @param {HTMLButtonElement} controlTag
     */
    function toggleVideoPlayback()
    {
        /*
        Alternative to the if below, using the with statement.
        The witch statement will extend the scope of the HTMLMediaELement (specifically the video in question) object and will allow direct access to the methods
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
            intentionalPause = false;
        }
        else
        {
            videoElement.pause();
            intentionalPause = true;
        }

        /*
            Toggle between icons, once the video playback has been toggled.
            videoControlPlayButton.children[0] == <i class="fas fa-play"></i>
         */
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
        //As mute is a modifiable boolean property, toggle when called .
        videoElement.muted = !videoElement.muted;

        //Toggle the mute icon.
        // videoControlMute.children[0] === <i class="fas fa-volume-up"></i>
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
    function syncVideoVolume()
    {
        /*
        * Set the video volume to whatever is the value of the slider.
        * The slider can only be between 0 and 1, with 0.1 increments.
        * parseFloat() is used to remove potential errors. From doing a numerical calculation on a potential string.
        * */
        videoElement.volume = parseFloat(videoControlVolumeSlider.children[0].value);

        /*
        * Convert the floating point number to a string percentage.
        * videoControlVolumeSlider.children[1] === <span id="main-video-controls-volumeSlider-value">0</span>
        * */
        videoControlVolumeSlider.children[1].innerHTML = (videoElement.volume*100).toString();

        /*
        * If the video's volume is set to 0, for whatever reason, switch to the mute icon and revert to normal when set higher.
         */
        if(videoElement.volume === 0)
        {
            if(videoControlMute.children[0].classList.contains("fa-volume-up"))
            {
                videoControlMute.children[0].classList.remove("fa-volume-up");
                videoControlMute.children[0].classList.add("fa-volume-slash");
            }
        }else
        {
            if(videoControlMute.children[0].classList.contains("fa-volume-slash"))
            {
                videoControlMute.children[0].classList.remove("fa-volume-slash");
                videoControlMute.children[0].classList.add("fa-volume-up");
            }
        }
    }

    function syncVideoToSliderLocation()
    {
        // videoControlLocationSlider.children[1] === <span id="main-video-controls-currentTime" class="main-video-controls-currentTime" title="Current Location">00:00</span>
        //Set the slider value to current video frame.
        videoControlLocationSlider.children[1].value = videoElement.currentTime;

        /*
         * videoControlLocationSlider.children[0] === <span id="main-video-controls-currentTime" class="main-video-controls-currentTime" title="Current Location">00:00</span>
         *
         * Set the span to the current timestamp of the video. In the format hh:mm:ss.
         * The hour part is dependent of the video exceeding 3600 hours.
         *
         * See below for proper breakdown.
         */
        videoControlLocationSlider.children[0].innerHTML =
            (Math.round(videoElement.duration) > 3600 ? Math.round(videoElement.currentTime % 3600).toString().padStart(2, '0') +  ":" : "") + //Calcuate the number of hours in video, if exceeds 1 hour
            Math.floor(videoElement.currentTime / 60).toString().padStart(2,'0') + ":" + //Calculate minutes
            Math.round(videoElement.currentTime % 60).toString().padStart(2,'0'); //Calculate seconds
    }

    function syncSliderToVideoLocation()
    {
        //Set the current playback location to the slider value.
        videoElement.currentTime = videoControlLocationSlider.children[1].value;
    }

    /**
     * Function that will allow keyboard input to control the video player
     * @param {KeyboardEvent} event Object containing information about each keyboard press.
     */
    function registerKeyBindings(event)
    {
        switch (event.key)
        {
            case " ": case "Spacebar":

                toggleVideoPlayback();

            break;

            case "m":case "M":

                toggleVideoMute();

            break;

            //ArrowRight is used by legacy browsers such as Internet Explorer
            case "ArrowRight": case "Right":

                forwardTenSeconds();

            break;

            //ArrowLeft is used by legacy browsers such as Internet Explorer
            case "ArrowLeft": case "Left":

                backwardTenSeconds();

            break;

            case "f": case "F":

                toggleVideoFullScreen();

            break;

            //ArrowUp is used by legacy browsers, such as Internet Explorer.
            case "ArrowUp": case "Up":

                //If the volume isn't over 1, after or before incrementing, continue.
                if(!((videoElement.volume + 0.1) > 1))
                {
                    videoControlVolumeSlider.children[0].value = parseFloat((videoElement.volume + 0.1).toFixed(2));

                    syncVideoVolume();
                }
                break;

            //ArrowDown is used by legacy browsers, such as Internet Explorer.
            case "ArrowDown": case "Down":

                //If the volume isn't over 0, after or before incrementing, continue.
                if(!((videoElement.volume-0.1) < 0))
                {
                    videoControlVolumeSlider.children[0].value =  parseFloat((videoElement.volume - 0.1).toFixed(2));
                    syncVideoVolume();
                }
                break;
        }
    }

    function toggleVideoPlaybackWhenHidden()
    {
        //If the video was intentionally paused by the user, we don't need to check the viability

        switch (document.visibilityState)
        {
            case "hidden":
                ///
                if (!intentionalPause)
                {
                    toggleVideoPlayback();
                    intentionalPause = false;
                }

                break;
            case "visible":

                console.log(intentionalPause);

                if(!intentionalPause) toggleVideoPlayback();
                // toggleVideoPlayback();

                break;
        }
    }

    function backwardTenSeconds(){videoElement.currentTime -= 10;}
    function backToBeginning(){videoElement.currentTime = 0;}

    function forwardTenSeconds(){videoElement.currentTime += 10;}
    function forwardThirtySeconds(){videoElement.currentTime += 30;}

    function changeSpeed()
    {
        videoElement.playbackRate = videoControlSpeedChanger.value;
    }

    function defaultValues()
    {
        let duration = Math.round(videoElement.duration);


        // By default the slider is set to 0.6, by calling the function, it will change the video volume & label accordingly.
        syncVideoVolume();

        // videoControlLocationSlider.children[1] === <input type="range" id="main-video-controls-locationSlider-input" class="main-video-controls-locationSlider-input" min="0" max="100" step="1" value="0">
        //Set the maximum value of the location slider to the duration, the location is more accurate representation of the video's playback location.
        videoControlLocationSlider.children[1].max = duration;


        /*
            videoControlLocationSlider.children[2] === <span id="main-video-controls-maximumTime" class="main-video-controls-maximumTime" title="Maximum duration">00:00</span>

            Set the span to the duration of the video, in the format: hh:mm:ss.
            The hour part is dependent of the video exceeding 3600 hours.

            Calculation for both total duration and current time.

            ## Calculations:

            - 'duration % 60' . Get the remainder after dividing by num of seconds in a minute. Then get whole number, which is the seconds.
            - 'duration / 60' . Get the number of minutes within the time, then remove all remaining decimals.

            - For calculating hours:
                - duration > 3600 . If the duration is greater than 3600, then the length is greater than a hour and should display the additional numerical values.
                - duration % 3600 . Get the number of hours within the duration.

             x % y : Modulus or Remainder operator [3], will get the remaining value after diving two numbers.

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

    function registerEventListeners()
    {
        videoControlPlayButton.addEventListener("click", toggleVideoPlayback);

        videoControlMute.addEventListener("click", toggleVideoMute);

        videoControlFullscreen.addEventListener("click", toggleVideoFullScreen);

        //Every time the volume slider is changed.
        videoControlVolumeSlider.addEventListener("input", syncVideoVolume);

        videoControlBackward.addEventListener("click", backwardTenSeconds);
        videoControlBackward.addEventListener("dblclick", backToBeginning);

        videoControlForward.addEventListener("click", forwardTenSeconds);
        videoControlForward.addEventListener("dblclick", forwardThirtySeconds);

        //Every time the dropdown is changed.
        videoControlSpeedChanger.addEventListener("input", changeSpeed);

        // [1] Fired between 4Hz and 66Hz, depending on the system load.
        // -1- 'timeupdate' 22/12/2017, Mozilla Developer Network. [online] Accessed 13/12/2018 <https://developer.mozilla.org/en-US/docs/Web/Events/timeupdate>
        videoElement.addEventListener("timeupdate", syncVideoToSliderLocation);
        videoControlLocationSlider.addEventListener("input", syncSliderToVideoLocation);


        defaultValues();
    }


    //Ensures that the video is loaded before attempting to modify or read properties, preventing null pointers.
    videoElement.addEventListener("loadeddata", registerEventListeners);


    document.addEventListener("keydown", registerKeyBindings);
    document.addEventListener("visibilitychange", toggleVideoPlaybackWhenHidden);

}
