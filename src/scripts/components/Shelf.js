/**
 * Represents the scrollable shelf containing a set of cards.
 */
export class Shelf {
  constructor(response) {
    this.index = 0;
    this.title = response.set.text.title.full.set.default.content;
    this.refId = response.set?.refId;
    this.cards = [];
    this.element = undefined;
  }

  /**
   * Creates HTML representing the shelf.
   */
  buildShelf = () => {  
    // Build the main row to hold content
    const root = document.getElementById("root");
    const row = document.createElement("div");
    row.className = "shelf";
    root.appendChild(row);
    
    // Build h2 with row title
    const titleElement = document.createElement("h2");
    titleElement.className = "shelfTitle";
    titleElement.innerText = this.title;
    row.appendChild(titleElement);

    // Build shelf div to append to row
    this.element = document.createElement("div");
    this.element.className = "shelfItems";
    row.appendChild(this.element);
  }

  getActiveCard = () => { return this.cards[this.index] || undefined }

  /**
   * Takes a card object and injects an element into the HTML.
   * @param {Card} card The card object to be placed on the shelf.
   */
  addCard = (card) => {
    if (!this.element) throw new Error("Cannot add a card before creating a shelf");

    this.cards.push(card);
    card.element = document.createElement("div");
    card.element.setAttribute('tabindex', '0');
    card.element.className = "card";

    // Create fallback title text
    const title = document.createElement("h3");
    title.id = "cardTitle";
    title.innerText = card.title;
    title.className = "hidden";

    // Create image to display in card
    const poster = document.createElement("img");
    Object.assign(poster, {
      id: `${this.title.replace(/\s+/g, "")}_${card?.title?.replace(/\s+/g, "")}`,
      alt: card?.title,
      src: card.cardUrl,
      onerror: () => {
        title.classList.remove("hidden");
        poster.classList.add("hidden");
      },
    });

    // Hook up the DOM elements
    card.element.appendChild(poster);
    card.element.appendChild(title);
    const paddingElement = document.createElement("div");
    paddingElement.className = "cardPadding";
    paddingElement.appendChild(card.element);
    this.element.appendChild(paddingElement);
  }
}