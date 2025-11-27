async function fetchHtmlAsText(url) {
  return await (await fetch(url)).text();
}

async function setNavbar() {
  const navbarHtml = await fetchHtmlAsText("navbar/navbar.html");
  const navBarParent = document.getElementById("navbar-parent");
  navBarParent.innerHTML = navbarHtml;
}