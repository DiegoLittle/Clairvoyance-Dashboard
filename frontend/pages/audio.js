import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';





const audio = () => {


    useEffect(() => {
        const record = document.querySelector('.record');
        const stop = document.querySelector('.stop');
        const soundClips = document.querySelector('.sound-clips');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia(
                {
                    audio: true
                })
                .then((stream) => {
                    let chunks = [];
                    const mediaRecorder = new MediaRecorder(stream);

                    record.onclick = () => {
                        mediaRecorder.start();
                        console.log(mediaRecorder.state);
                    }
                    //Stop Button stops recording
                    stop.onclick = () => {
                        mediaRecorder.stop()
                        console.log(mediaRecorder.state);
                    }
                    //Pushes recorded data to chunks
                    mediaRecorder.ondataavailable = function (e) {
                        chunks.push(e.data);
                        console.log(chunks)
                    }
                    mediaRecorder.onstop = (e) => {
                        console.log("stopped recording")
                        const audio = document.createElement('audio');
                        audio.setAttribute('controls', '');
                        soundClips.appendChild(audio)
                        const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                        var fd = new FormData();
                        fd.append('file',blob);
                        fetch(("http://127.0.0.1:5000/api/webaudio"),{
                        method: 'POST',
                        body:fd
                    }).then(res=>{
                        console.log(res)
                        res.json().then(res=>{
                            console.log(res)
                        })
                    })
                        chunks = [];
                        const audioURL = window.URL.createObjectURL(blob);
                        console.log(audioURL)
                        audio.src = audioURL
                    }

                })
                .catch(e => { console.log('The following getUserMedia error occurred: ' + e); })
        }
        else {
            console.log('getUserMedia not supported on your browser!');
        }
    },[])

    const saveClip = (blob)=>{
        localStorage.setItem(uuidv4(),blob)
    }
    return (
        <div>
            <button className="record">Record</button>
            <button className="stop">Stop</button>
            <div className="sound-clips"></div>
        </div>
    )
}

export default audio
