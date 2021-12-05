import { preloadImage } from "../utils";

/**
 * Represents the content details modal.
 */
export class Modal {
  constructor() {
    // Modal Element
    this.modal = document.getElementById("modal");
    this.modal.className = "hidden";

    // Main Display Data
    this.video = document.getElementById("modalVideo");
    this.hero = document.getElementById("modalHero").getElementsByTagName("img")[0];
    this.title = document.getElementById("modalTitle");
    this.rating = document.getElementById("modalRating");

    // Buttons
    this.buttons = modal.getElementsByTagName("button");
    this.activeIndex = 0;
    this.buttons[this.activeIndex].className = "active";

    this.isOpen = false;
  }

  /**
   * Applies card data to modal elements and opens it.
   * @param {Card} card The card data to display.
   */
  open = (card) => {
    this.isOpen = true;
    this.modal.classList.remove("hidden");
    preloadImage(card.heroImgUrl, this.hero, () => {
      this.hero.parentNode.classList.remove("hidden");
      this.hero.classList.remove("hidden");
      this.hero.src = card.heroImgUrl;
    }, () => {
      this.hero.className = "hidden";
      this.hero.parentNode.className = "hidden";
    });
    this.title.innerHTML = card.title;
    this.rating.innerHTML = card.ratings.join(" ");
  };

  /**
   * Closes modal and resets data.
   */
  close = () => {
    this.isOpen = false;
    this.modal.className = "hidden";
    this.hero.className = "hidden";
    this.hero.src = "";
    this.title.innerHTML = "";
    this.rating.innerHTML = "";

    // Reset buttons
    this.buttons[this.activeIndex].className = undefined;
    this.activeIndex = 0;
    this.buttons[this.activeIndex].className = "active";
  };

  /**
   * Sets active modal button based on arrow key input
   * @param {string} key The string corresponding to the keyboard input
   */
  handleInput = (key) => {
    switch (key) {
      case "ArrowLeft":
        if (this.activeIndex > 0) {
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
      case "Enter":
        console.log(`User has selected the ${this.buttons[this.activeIndex].innerHTML} button.`)
        break;
      default:
        break;
    }
  };
}