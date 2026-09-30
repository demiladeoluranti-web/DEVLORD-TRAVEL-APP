const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const tabs = document.querySelectorAll(".tab");
const searchType = document.getElementById("searchType");
const searchForm = document.getElementById("searchForm");
const toast = document.getElementById("toast");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");

    const labelMap = {
      flights: "Flights",
      hotels: "Hotels",
      packages: "Packages",
      cars: "Cars"
    };

    searchType.textContent = labelMap[tab.dataset.tab] || "Trips";
  });
});

const today = new Date().toISOString().split("T")[0];
checkIn.min = today;
checkOut.min = today;

checkIn.addEventListener("change", () => {
  checkOut.min = checkIn.value || today;
  if (checkOut.value && checkOut.value < checkIn.value) {
    checkOut.value = checkIn.value;
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const from = document.getElementById("fromInput").value.trim();
  const to = document.getElementById("toInput").value.trim();
  const guests = document.getElementById("guests").value;

  showToast(`Searching ${searchType.textContent.toLowerCase()} from ${from} to ${to} for ${guests}.`);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

const sections = [...document.querySelectorAll("section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navItems.forEach(item => {
    item.classList.toggle(
      "active",
      item.getAttribute("href") === `#${current}`
    );
  });
});
