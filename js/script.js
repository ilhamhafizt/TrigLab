// scrollDown
document.getElementById("scrollDown").addEventListener("click", () => {
  document.getElementById("tentang").scrollIntoView({
    behavior: "smooth"
  });
});

// Mobile Menu
document.getElementById('menuBtn').addEventListener('click', () =>{
  document.getElementById('mobileMenu').classList.toggle('hidden');
});