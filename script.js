// Переключение языка
const langData = {
  ru: {
    title:                  "Кохановский государственный колледж",
    title_schedule:         "Расписание — КГК",
    title_about:            "О создателе — КГК",
    title_gallery:          "Галерея — КГК",
    title_contacts:         "Контакты — КГК",

    college_name:           "КГК",

    welcome:                "Добро пожаловать\nв Кохановский колледж",
    about_college:          "О колледже",
    about_college_2:        "Колледж расположен в живописном месте Оршанского района — агрогородке Коханово.",

    news:                   "Новости и объявления",

    schedule_h1:            "Расписание занятий",
    gallery_h1:             "Галерея",

    about_creator:          "О создателе сайта",

    contacts_h1:            "Контакты",

    nav_home:     "Главная",
    nav_schedule: "Расписание",
    nav_about:    "О создателе",
    nav_gallery:  "Галерея",
    nav_contacts: "Контакты"
  },

  be: {
    title:                  "Каханаўскі дзяржаўны каледж",
    title_schedule:         "Расклад — КГК",
    title_about:            "Аб стваральніку — КГК",
    title_gallery:          "Галерэя — КГК",
    title_contacts:         "Кантакты — КГК",

    college_name:           "КДК",

    welcome:                "Вітаем\nу Каханаўскім каледжы",
    about_college:          "Аб каледжы",
    about_college_2:        "Каледж размешчаны ў маляўнічым месцы Аршанскага раёна — аграгарадку Каханава.",

    news:                   "Навіны і аб'явы",

    schedule_h1:            "Расклад заняткаў",
    gallery_h1:             "Галерэя",

    about_creator:          "Аб стваральніку сайта",

    contacts_h1:            "Кантакты",

    nav_home:     "Галоўная",
    nav_schedule: "Расклад",
    nav_about:    "Аб стваральніку",
    nav_gallery:  "Галерэя",
    nav_contacts: "Кантакты"
  }
};

function setLanguage(lang) {
  document.documentElement.dataset.lang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (langData[lang][key]) {
      if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
        el.placeholder = langData[lang][key];
      } else {
        el.textContent = langData[lang][key];
      }
    }
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

// Lightbox
function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const img = document.getElementById("lightbox-img");
  const close = document.querySelector(".close-lightbox");

  document.querySelectorAll(".gallery-item img").forEach(el => {
    el.addEventListener("click", () => {
      img.src = el.src;
      lb.style.display = "flex";
    });
  });

  close.addEventListener("click", () => lb.style.display = "none");
  lb.addEventListener("click", e => {
    if (e.target === lb) lb.style.display = "none";
  });
}

// Показывать/прятать кнопку наверх + нижнюю панель
let lastScrollY = 0;
function onScroll() {
  const nav = document.querySelector(".bottom-nav");
  const topBtn = document.getElementById("to-top");

  const y = window.scrollY;

  if (y > 300) {
    topBtn.style.display = "flex";
  } else {
    topBtn.style.display = "none";
  }

  if (y > lastScrollY && y > 180) {
    nav.style.transform = "translateY(100%)";
  } else {
    nav.style.transform = "translateY(0)";
  }

  lastScrollY = y;
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ru";
  setLanguage(savedLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  initLightbox();

  window.addEventListener("scroll", onScroll);

  document.getElementById("to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // активный пункт меню (визуально)
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item").forEach(a => {
    if (a.getAttribute("href") === current) {
      a.classList.add("active");
    }
  });
});