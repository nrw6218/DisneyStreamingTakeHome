import { preloadImage } from "../utils";

export class Modal {
  constructor() {
    this.modal = document.getElementById("modal");
    this.modal.className = "hidden";
    this.video = document.getElementById("modalVideo");
    this.hero = document.getElementById("modalHero").getElementsByTagName("img")[0];
    this.title = document.getElementById("modalTitle");
    this.buttons = modal.getElementsByTagName("button");
    this.activeIndex = 0;
    this.buttons[this.activeIndex].className = "active";

    this.isOpen = false;
  }

  open = (card) => {
    this.isOpen = true;
    this.modal.classList.remove("hidden");
    preloadImage(card.heroImg, this.hero, () => {
      this.hero.classList.remove("hidden");
      this.hero.src = card.heroImg;
    }, () => {
      this.hero.className = "hidden";
    });
    this.title.innerHTML = card.title;
  };

  close = () => {
    this.isOpen = false;
    this.modal.className = "hidden";
    this.hero.className = "hidden";
    this.hero.src = "";
    this.title.innerHTML = "";

    // Reset buttons
    this.buttons[this.activeIndex].className = undefined;
    this.activeIndex = 0;
    this.buttons[this.activeIndex].className = "active";
  };

  handleInput = (key) => {
    switch (key) {
      case "ArrowLeft":
        if (this.activeIndex >= 0) {
          this.buttons[this.activeIndex].className = undefined;
          this.activeIndex--;
          this.buttons[this.activeIndex].className = "active";
        }
        break;
      case "ArrowRight":
        if (this.activeIndex < this.buttons.length - 1) {
          this.buttons[this.activeIndex].className = undefined;
          this.activeIndex++;
          this.buttons[this.activeIndex].className = "active";
        }
        break;
      default:
        break;
    }
  };
}