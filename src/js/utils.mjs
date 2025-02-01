// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get url parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// modify renderListWithTemplate to renderWithTemplate
export function renderWithTemplate(templateFn, parentElement, data, position = "afterbegin", clear = false, callback) {
  const validPositions = ["beforebegin", "afterbegin", "beforeend", "afterend"];
  const validPosition = validPositions.includes(position.toLowerCase()) ? position.toLowerCase() : "afterbegin";
  
  if (clear) {
    parentElement.innerHTML = "";
  }

  // Handle both arrays and single items
  if (Array.isArray(data)) {
    const htmlItems = data.map((item) => templateFn(item));
    parentElement.insertAdjacentHTML(validPosition, htmlItems.join(""));
  } else {
    const html = templateFn(data);
    parentElement.insertAdjacentHTML(validPosition, html);
  }
  
  if (callback) {
    callback(data);
  }
}

// load template
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  const templateElement = document.createElement('template');
  templateElement.innerHTML = template;
  return templateElement;
}

// load header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  
  renderWithTemplate(
    () => headerTemplate.innerHTML,
    headerElement
  );
  renderWithTemplate(
    () => footerTemplate.innerHTML,
    footerElement
  );
}
