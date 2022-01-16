import {useState,useEffect} from 'react'

const vision = ()=>{
  
    const [selectedFile, setSelectedFile] = useState();
    const [transcript,setTranscript] = useState("");
    function changeHandler(e){
		setSelectedFile(e.target.files[0]);
    }
    function submitFile(){
        const formData = new FormData();
        console.log(selectedFile)
		formData.append('file', selectedFile);
        fetch(
			'http://127.0.0.1:8000/api/files/',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
        setTranscript(result.transcript)

			})
			.catch((error) => {
				console.error('Error:', error);
			});
    }
    useEffect(() => {
      const record = document.querySelector('.record');
      const 
      stop = document.querySelector('.stop');
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
                      // const audio = document.createElement('audio');
                      // audio.setAttribute('controls', '');
                      // soundClips.appendChild(audio)
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
                          setTranscript(res.transcript)
                      })
                  })
                      chunks = [];
                      const audioURL = window.URL.createObjectURL(blob);
                      console.log(audioURL)
                      // audio.src = audioURL
                  }

              })
              .catch(e => { console.log('The following getUserMedia error occurred: ' + e); })
      }
      else {
          console.log('getUserMedia not supported on your browser!');
      }
  },[])
    return(
        <div>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input onChange={changeHandler} id="file-upload" name="file-upload" type="file" className="sr-only" />
                        <button onClick={submitFile}>Submit</button>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                {transcript}
              </div>
              <button className="record">Record</button>
            <button className="stop">Stop</button>
            <div className="sound-clips"></div>
        </div>
    )
}

export default vision