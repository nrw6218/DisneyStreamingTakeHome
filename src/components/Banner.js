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
    const videoError = () => {
      this.video.className = "hidden";
      this.hero.src = card.heroImg;
      this.hero.classList.remove("hidden");
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
    // #endregion

    // #region Logo
    const logoError = () => {
      this.logo.className = "hidden";
      this.title.innerText = card.title;
      this.title.classList.remove("hidden");
    };
    this.logo.onerror = logoError;

    this.logo.className = "hidden";
    this.title.className = "hidden";
    if (this.logo.src) {
      this.logo.classList.remove("hidden");
      this.logo.src = card.titleUrl;
      this.logo.alt = card.title;
    } else {
      logoError();
    }
    // #endregion
  }
}