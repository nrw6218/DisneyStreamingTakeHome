import { preloadImage } from "../utils";

/**
 * Represents the homepage banner.
 */
export class Banner {
  constructor() {
    this.video = document.getElementById("video");
    this.hero = document.getElementById("bannerHero");
    this.logo = document.getElementById("bannerLogo");
    this.title = document.getElementById("bannerText");
  }

  /**
   * Updates the banner content based on the given card.
   * @param {Card} card The card data to populate the banner with.
   */
  setContent = (card) => {
    // #region Video
    if (card.videoUrl !== this.video.src) {
      const videoError = () => {
        this.hero.src = card.heroImg;
        this.hero.alt = card.title;
        this.hero.onload = () => {
          this.hero.classList.remove("hidden");
        }
      };
      this.video.onerror = videoError;

      this.hero.className = "hidden";
      this.video.className = "hidden";
      if (card.videoUrl) {
        this.video.classList.remove("hidden");
        if (this.video.src !== card.videoUrl) {
          this.video.src = card.videoUrl;
          this.video.play();
        }
      } else {
        videoError();  
      }
    }
    // #endregion

    // #region Logo
    if (card.titleUrl !== this.logo.src) {
      const logoError = () => {
        this.title.innerText = card.title;
        this.title.classList.remove("hidden");
      };
      const logoSuccess = () => {
        this.logo.alt = card.title;
        this.logo.classList.remove("hidden");
      };

      this.logo.className = "hidden";
      this.title.className = "hidden";
      if (card.titleUrl) {
        preloadImage(card.titleUrl, this.logo, logoSuccess, logoError);
      } else {
        logoError();
      }
    }
    // #endregion
  }
}