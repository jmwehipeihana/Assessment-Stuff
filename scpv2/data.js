
function loadSCPData(callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "scp.json", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const scpData = JSON.parse(xhr.responseText);
      callback(scpData);
    }
  };
  xhr.send(null);
}

function displaySCP(scpData, scpNumber) {
  const scp = scpData[`SCP-${scpNumber}`];
  const scpHTML = `
    <h2>${scp.subject}</h2>
    <p><strong>Class:</strong> ${scp.class}</p>
    <p><strong>Description:</strong> ${scp.description}</p>
    <p><strong>Special Containment Procedures:</strong> ${scp.Containment}</p>
  `;
  document.getElementById(`scp${scpNumber}`).innerHTML = scpHTML;
}


if ('speechSynthesis' in window) {
  console.log('Speech Synthesis API is supported.');
} else {
  console.log('Speech Synthesis API is not supported.');
}

const synth = window.speechSynthesis;

const readDescriptionButtons = document.querySelectorAll('#read-description-button');
readDescriptionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const section = button.closest('.post');
    const descriptionElement = section.querySelector('.text-description');
    const utterance = new SpeechSynthesisUtterance(descriptionElement.textContent);
    
    if (synth.speaking) {
      synth.cancel();
    } else {
      synth.speak(utterance);
    }
  });
});

const readContainmentButton = document.getElementById('read-containment-button');
readContainmentButton.addEventListener('click', () => {
  const containmentElement = document.querySelector('.text-description p:nth-of-type(3)');
  const utterance = new SpeechSynthesisUtterance(containmentElement.textContent);
  
  if (synth.speaking) {
    synth.cancel();
  } else {
    synth.speak(utterance);
  }
});



