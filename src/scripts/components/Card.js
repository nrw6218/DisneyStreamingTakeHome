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

    // Using Object.values here because the child property can have different names
    // based on set type. If I keep track of the type of set/shelf then I could populate
    // these with more precision and less object manipulation
    const title = response?.image?.title_treatment ? response.image.title_treatment["1.78"] : undefined; 
    this.logoUrl = title ? Object.values(title)[0].default?.url : undefined;

    const img = response?.image?.tile["1.78"]; // Helper to get to the useful data
    this.cardImgUrl = img ? Object.values(img)[0].default?.url : undefined;
    this.heroImgUrl = Object.values(response.image.hero_collection["1.78"])[0]?.default?.url || undefined;

    this.element = undefined;
  }
}