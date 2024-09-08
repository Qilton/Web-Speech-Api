// Check for browser support
if (!('webkitSpeechRecognition' in window)) {
    alert('Sorry, your browser does not support the Web Speech API.');
  } else {
    // Create a new instance of SpeechRecognition
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep recognizing speech continuously
    recognition.interimResults = true; // Show interim results
    recognition.lang = 'en-US'; // Language
  
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const transcriptDiv = document.getElementById('transcript');
  
    let finalTranscript = '';
  
    // Event listener for when speech recognition results are returned
    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      transcriptDiv.innerHTML = finalTranscript + '<i>' + interimTranscript + '</i>';
    };
  
    startButton.addEventListener('click', () => {
      recognition.start();
      startButton.disabled = true;
      stopButton.disabled = false;
    });
  
    stopButton.addEventListener('click', () => {
      recognition.stop();
      startButton.disabled = false;
      stopButton.disabled = true;
    });
  
    recognition.onend = () => {
      startButton.disabled = false;
      stopButton.disabled = true;
    };
  }
  