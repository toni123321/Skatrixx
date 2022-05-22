import { useEffect } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// const SpeechToText = ()=> {
//     const {transcript, resetTranscript} = useSpeechRecognition()

//     useEffect(() => {
//         SpeechRecognition.startListening({continues:true})
//         console.log("listeing starts")
//     }, [])
//     return (
//         <div> 
//             <form>
//                 <textarea value={transcript}> </textarea>
//                 <button onClick={resetTranscript}>Clear text</button>
//                 <button onClick={(e) => {
//                     e.preventDefault();
//                     SpeechRecognition.stopListening();
//                     console.log("listening stops")
//                 }}>Stop listeing</button>
//             </form>
//         </div>
//     )
// }

const SpeechToText = () => {
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = useSpeechRecognition();
  

    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  
    return (
      <div>
        <textarea value={transcript}> </textarea>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    );
  };


export default SpeechToText
