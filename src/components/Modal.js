export class Modal {
  constructor() {
    this.modal = document.getElementById("modal");
    this.modal.className = "hidden";
    this.video = document.getElementById("modalVideo");
    this.hero = document.getElementById("modalHero");
    this.title = document.getElementById("modalTitle");

    this.isOpen = false;
  }

  open = (card) => {
    this.isOpen = true;
    this.modal.classList.remove("hidden");
    this.hero.src = card.heroImg;
    this.title.innerHTML = card.title;
  };

  close = () => {
    this.isOpen = false;
    this.modal.className = "hidden";
  };
}