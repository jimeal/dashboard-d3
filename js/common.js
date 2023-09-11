const commonGr = () => {
  const form = document.querySelector("form");
  const dataItemChildA = document.querySelectorAll(".nav__li a");
  const dataItemChild = document.querySelectorAll(".nav__li > a > span");

  const toggleBtn = document.querySelector(".nav-toggle");
  const navEl = document.querySelector(".nav");
  const userInfo = document.querySelector(".user-info");

  dataItemChild.forEach(el => {
    const dataAEl = el.parentElement;
    const datasetEl = dataAEl.parentElement.getAttribute("data-icon");
    el.style.backgroundImage = `url(./images/icon-24/ico-${datasetEl}.png)`;
  });

  toggleBtn.addEventListener("click", navToggleFold);
  function navToggleFold() {
    navEl.classList.toggle("open");

    if (navEl.classList.contains("open")) {
      toggleBtn.innerText = "열기";
      toggleBtn.style.width = "100%";
      dataItemChildA.forEach(el => {
        el.style.fontSize = 0;
        el.style.overflow = "hidden";
        el.style.width = "60px";
      });
      dataItemChild.forEach(el => {
        el.style.margin = "0 auto";
        el.style.textAlign = "center";
        el.style.display = "block";
      });
      userInfo.style.fontSize = 0;
      document.querySelector("header").style.width = `calc(100% - 108px)`;
      document.querySelector("main").style.width = `calc(100% - 108px)`;
      document.querySelector(".nav--subtext").style.textAlign = "center";
      document.querySelector(".btn--logout").style.fontSize = 0;
      document.querySelector(".logo").style.width = "34px";
      document.querySelector(".logo").style.height = "44px";
      document.querySelector(".logo").style.overflow = "hidden";
      document.querySelector(".logo").style.margin = "0 auto";
    } else {
      toggleBtn.innerText = "닫기";
      toggleBtn.style.width = "auto";
      dataItemChildA.forEach(el => {
        el.style.fontSize = "16px";
        el.style.overflow = "visible";
        el.style.width = "auto";
      });
      dataItemChild.forEach(el => {
        el.style.marginRight = "8px";
        el.style.textAlign = "auto";
        el.style.display = "inline-block";
      });
      userInfo.style.fontSize = "16px";
      document.querySelector("header").style.width = `calc(100% - 300px)`;
      document.querySelector("main").style.width = `calc(100% - 300px)`;
      document.querySelector(".nav--subtext").style.textAlign = "left";
      document.querySelector(".btn--logout").style.fontSize = "16px";
      document.querySelector(".logo").style.width = "auto";
      document.querySelector(".logo").style.height = "auto";
      document.querySelector(".logo").style.overflow = "visible";
    }
  }

  document.querySelector(".overview-acco").addEventListener("click", e => {
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle("active");
    if (e.target.nextElementSibling.classList.contains("active")) {
      document.querySelector(
        ".overview-acco > img"
      ).style.transform = `translateY(-50%) rotate(0)`;
    } else {
      document.querySelector(
        ".overview-acco > img"
      ).style.transform = `translateY(-50%) rotate(-180deg)`;
    }
  });

  form.addEventListener("click", e => {
    e.perventDefault();
  });

  function getTime() {
    const todayEl = document.querySelector(".today");
    let date = new Date();
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const today = new Date(date.getTime() + TIME_ZONE)
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);

    todayEl.innerHTML = today;
    setTimeout(getTime, 1000);
  }

  getTime();
};

export default commonGr;
