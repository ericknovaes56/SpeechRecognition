const startBtn = document.querySelector('#start');
const output = document.querySelector('#output');
const stopvoice = document.getElementById("stop")
const salvar = document.getElementById("salvar")
const alink = document.getElementById("alink")
var texts = ''
startBtn.addEventListener("click", ()=>{
    startBtn.style.display='none'
    stopvoice.style.display='flex'
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "en";
    recognition.continuous = true;
    recognition.start();
    recognition.onresult = function(event) {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            const content = event.results[i][0].transcript.trim();
            if (content == 'YouTube'){
                window.location.href='https://www.youtube.com/'
                output.classList.add("ok")
            }
            output.textContent = content;
            salvar.style.display='flex'
            recognition.stop();
            startBtn.style.display='flex'
            stopvoice.style.display='none'

            texts = content
        }
      }
    };
    stopvoice.addEventListener("click", ()=>{
        recognition.stop();
        startBtn.style.display='flex'
        stopvoice.style.display='none'
    })
    salvar.addEventListener("click", ()=>{
        let blob = new Blob([texts],{
            type: "text/plain;charset=utf-8"
        })
        var link = window.URL.createObjectURL(blob);
        alink.href = link
        alink.download = 'Salvo'
    })
})
