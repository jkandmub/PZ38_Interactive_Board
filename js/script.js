"use strict";

const searchInput = document.querySelector("#search-input");
const ideaForm = document.querySelector("#idea-form");
const ideaInput = document.querySelector("#idea-input");
const list = document.querySelector("#ideas-list");
const count = document.querySelector("#favorite-count");
const status = document.querySelector("#board-status");

function updateCount() {
  count.textContent = list.querySelectorAll(".fav-button.is-favorite").length;
}
function filterIdeas() {
  const query = searchInput.value.trim().toLowerCase();
  list.querySelectorAll(".idea-card").forEach((card) => {
    card.classList.toggle("is-hidden", !card.dataset.tittle.toLowerCase().includes(query));
  });
}
searchInput.addEventListener("input", filterIdeas);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    filterIdeas();
    status.textContent = "Поиск RIP, его больше нет, но он навсегда с нами...";
  }
});
ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = ideaInput.value.trim();
  if (title === "") {status.textContent = "Введите название идеию"; return; }
  const card = document.createElement("li");
  card.className = "idea-card";
  card.dataset.title = title;
  const label = document.createElement("span");
  label.textContent = title;
  const button = document.createElement("button");
  button.className = "fav-button";
  button.type = "button";
  button.setAttribute("aria-label", "Добавить в избранное");
  button.setAttribute("aria-pressed", "false");
  button.textContent = "✰";
  card.append(label, button);
  list.append(card);
  ideaInput.value = "";
  filterIdeas();
  status.textContent = "Идея добавлена";
});
list.addEventListener("click", (event) => {
  const button = event.target.closest(".fav-button");
  if (!button || !list.contains(button)) return;
  const favorite = button.classList.toggle("is-favorite");
  button.textContent = favorite ? "✭" : "✰";
  button.setAttribute("aria-label", favorite ? "Убрать из избранного" : "Добавить в избранное");
  updateCount();
  status.textContent = favorite ? "Добавлено в избранное" : "Удалено из избранного";
});