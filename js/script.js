let meditationTimer;
let remaining = 300;
let toastTimer;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  window.addEventListener("scroll", () => {
    document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 20);
  });
});

function showToast(message){
  const t=document.getElementById("toast");
  t.textContent=message;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}

function startSession(){
  const modal = new bootstrap.Modal(document.getElementById("meditationModal"));
  remaining=300;
  updateTimer();
  clearInterval(meditationTimer);
  meditationTimer=setInterval(()=>{
    remaining--;
    updateTimer();
    if(remaining<=0){
      clearInterval(meditationTimer);
      document.getElementById("breathText").textContent="Beautifully done";
      showToast("Session complete. Take a moment to notice how you feel.");
    }
  },1000);
  modal.show();
}

function updateTimer(){
  const min=String(Math.floor(remaining/60)).padStart(2,"0");
  const sec=String(remaining%60).padStart(2,"0");
  document.getElementById("timer").textContent=`${min}:${sec}`;
}

function stopMeditation(){
  clearInterval(meditationTimer);
  document.getElementById("breathText").textContent="Breathe in";
  showToast("Your meditation session has ended.");
}

function submitForm(e){
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  showToast(`Thank you, ${name || "friend"}! Your message has been received.`);
  e.target.reset();
}
