document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.querySelector("input[name='name']").value;
  const email = document.querySelector("input[name='email']").value;
  const message = document.querySelector("textarea[name='message']").value;

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (response.ok) {
      const msg = document.getElementById("successMessage");
      msg.style.display = "block";

      setTimeout(() => {
        msg.style.display = "none";
      }, 3000);

      this.reset();
    } else {
      alert("Failed to send message");
    }

  } catch (error) {
    alert("Server Error");
  }
});
const modal = document.getElementById("certificateModal");
const frame = document.getElementById("certificateFrame");

function openCertificate(file){
modal.style.display="flex";
frame.src=file;

setTimeout(()=>{
modal.classList.add("active");
},10);
}

function closeCertificate(){
modal.classList.remove("active");

setTimeout(()=>{
modal.style.display="none";
frame.src="";
},300);
}

/* Close when clicking outside */

modal.addEventListener("click",function(e){
if(e.target===modal){
closeCertificate();
}
});

/* Close when pressing ESC */

document.addEventListener("keydown",function(e){
if(e.key==="Escape"){
closeCertificate();
}
});
function openCertificate(file){

  const modal = document.getElementById("certificateModal");
  const img = document.getElementById("certificateImage");
  const pdf = document.getElementById("certificatePDF");

  modal.style.display = "flex";

  if(file.endsWith(".pdf")){
      pdf.src = file;
      pdf.style.display = "block";
      img.style.display = "none";
  }
  else{
      img.src = file;
      img.style.display = "block";
      pdf.style.display = "none";
  }
}

function closeCertificate(){

  const modal = document.getElementById("certificateModal");
  const img = document.getElementById("certificateImage");
  const pdf = document.getElementById("certificatePDF");

  modal.style.display = "none";
  img.src = "";
  pdf.src = "";
}

/* ESC key close */
document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    closeCertificate();
  }
});
const words = [
  "Creative Web Developer",
  "Frontend Developer",
  "JavaScript Developer",
  "Full Stack Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

  const typing = document.getElementById("typing");
  if(!typing) return;

  const currentWord = words[wordIndex];

  if(!isDeleting){
    charIndex++;
    typing.textContent = currentWord.substring(0, charIndex);
  }
  else{
    charIndex--;
    typing.textContent = currentWord.substring(0, charIndex);
  }

  let speed = 80;

  if(!isDeleting && charIndex === currentWord.length){
    speed = 1500;
    isDeleting = true;
  }

  else if(isDeleting && charIndex === 0){
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();