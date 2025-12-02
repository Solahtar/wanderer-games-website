let navbarHtml = null;
let footerHtml = null;

const headerLinks = [
  { title: "Home", link: "index.html" },
  { title: "About me", link: "about-me.html" }
];

const footerLinks = [
  { title: "Terms of use", link: "terms-of-use.html" },
  { title: "Privacy policy", link: "privacy-policy.html" }
];

async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

async function setNavbarAndFooter() {
  if (!navbarHtml) {
    navbarHtml = await fetchHtmlAsText("common/navbar.html");
  }
  const navBarParent = document.getElementById("navbar");
  navBarParent.innerHTML = navbarHtml;

  const headerLinksElement = document.getElementById("header-links");
  const navMenuElement = document.getElementById("nav-menu");
  for (const link of headerLinks) {
    const linkElement = document.createElement("a");
    linkElement.href = link.link;
    linkElement.classList.add("header-link");
    const content = document.createElement("span");
    content.innerText = link.title;
    linkElement.appendChild(content);
    const linkElementCopy = linkElement.cloneNode(true);
    headerLinksElement.appendChild(linkElement);
    navMenuElement.appendChild(linkElementCopy);
  }

  if (!footerHtml) {
    footerHtml = await fetchHtmlAsText("common/footer.html")
  }
  document.body.innerHTML += footerHtml;
  const footer = document.getElementById("footer");
  let i = 0;
  const separator = document.createElement("span");
  separator.innerText = "•";
  for (const link of footerLinks) {
    const linkElement = document.createElement("a");
    linkElement.href = link.link;
    linkElement.classList.add("footer-link");
    const content = document.createElement("span");
    content.innerText = link.title;
    linkElement.appendChild(content);
    footer.appendChild(linkElement);
    ++i;
    if (i != footerLinks.length) {
      footer.appendChild(separator.cloneNode(true));
    }
  }
}

function toggleNavMenu() {
  const menu = document.getElementById("nav-menu");
  if (!menu.toggleAttribute("hidden") && !document.getElementById("background")) {
    const background = document.createElement("div");
    background.id = "background";
    document.body.appendChild(background);
    background.addEventListener("touchstart", (event) => {
      menu.toggleAttribute("hidden");
      document.body.removeChild(background);
    });
    background.addEventListener("mousedown", (event) => {
      menu.toggleAttribute("hidden");
      document.body.removeChild(background);
    });
  }
}


const d = new Date();
d.setTime(d.getTime() + (90 * 24 * 60 * 60 * 1000));
document.cookie = "thecookie=test cookie;expires=" + d.toUTCString();

document.cookie = "anothercookie=OMG";

function getCookie(cookieName) {
  const name = cookieName + "=";
  const cookies = document.cookie.split("; ");
  let cookie = "notFound";
  let i = 0;
  while (cookie == "notFound" && i < cookies.length) {
    console.log(cookies[i]);
    if (cookies[i].startsWith(name)) {
      cookie = cookies[i].replace(name, "");
    }
    ++i;
  }
  return cookie;
}

//alert(getCookie("thecookie"));