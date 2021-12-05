/**
 * A simple data container holding reference
 * to an individual content card within a shelf
 */
export class Card {
  constructor(response) {
    this.title = Object.values(response?.text?.title?.full)[0].default?.content;
    this.contentId = response.contentId;
    this.seriesId = response.seriesId;
    this.ratings = response.ratings?.map(rating => rating.value);
    this.videoUrl = response.videoArt.length > 0 && response.videoArt[0].mediaMetadata?.urls[0].url;

    const title = response?.image?.title_treatment ? response.image.title_treatment["1.78"] : undefined; 
    this.titleUrl = title ? Object.values(title)[0].default?.url : undefined;

    const img = response?.image?.tile["1.78"]; // Helper to get to the useful data
    this.cardUrl = img ? Object.values(img)[0].default?.url : undefined;
    this.heroImg = Object.values(response.image.hero_collection["1.78"])[0]?.default?.url || undefined;

    this.element = undefined;
  }
}