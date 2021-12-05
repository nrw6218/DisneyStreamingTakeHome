import { Shelf } from "./scripts/components/Shelf";
import { Card } from "./scripts/components/Card";
import { Banner } from "./scripts/components/Banner";
import { Modal } from "./scripts/components/Modal";
import { fetchHomeData, moveToIndex } from "./scripts/utils";
import "./styles.css";

let pageContent = [];
let rowIndex = 0;
let banner;
let modal;

/**
 * Populates pageContent at the given index with the provided data
 * and injects a new shelf into the DOM
 * @param {Object} content A single set item from the api response
 * @param {number} index The index of pageContent to save the content to
 */
const populateShelf = (content, index) => {
  if (!pageContent[index]) {
    pageContent[index] = new Shelf(content);
  }
  
  if (pageContent[index].refId && rowIndex + 1 < index) return;

  pageContent[index].buildShelf();

  Object.values(content)[0]?.items?.forEach(item => {
    pageContent[index].addCard(new Card(item));
  });
};

/**
 * Looks for a refId in pageContent at index 
 * and populates a shelf with the given data
 * @param {number} index The index of pageContent to load data into
 */
const loadNewShelf = async (index) => {
  // Skip if we've reached the end, already loaded the row or don't have a refId
  if (index + 1 >= pageContent.length || pageContent[index + 1].element || !pageContent[index + 1].refId) return Promise.resolve();
  await fetchHomeData(`/sets/${pageContent[index + 1]?.refId}.json`).then(result => {
    populateShelf(result?.data, index + 1);
  });
};

/**
 * Handles input on grid of content shelves/cards
 * @param {string} key The string corresponding to the keyboard input
 */
const handleMenuInput = async (key) => {
  switch (key) {
    case "ArrowLeft":
      pageContent[rowIndex].getActiveCard().element.id = undefined;
      if (pageContent[rowIndex].index <= 0) {
        pageContent[rowIndex].index = pageContent[rowIndex].cards.length - 1;
      } else pageContent[rowIndex].index--;
      moveToIndex(pageContent, banner, rowIndex);
      break;
    case "ArrowRight":
      pageContent[rowIndex].getActiveCard().element.id = undefined;
      if (pageContent[rowIndex].index >= pageContent[rowIndex].cards.length - 1) {
        pageContent[rowIndex].index = 0;
      } else pageContent[rowIndex].index++;
      moveToIndex(pageContent, banner, rowIndex);
      break;
    case "ArrowUp":
      if (rowIndex > 0) {
        pageContent[rowIndex].getActiveCard().element.id = undefined;
        rowIndex--;
        // Attempt to load the next row
        await loadNewShelf(rowIndex);
        moveToIndex(pageContent, banner, rowIndex);
      }
      break;
    case "ArrowDown":
      if (rowIndex < pageContent.length - 1) {
        pageContent[rowIndex].getActiveCard().element.id = undefined;
        rowIndex++;
        // Attempt to load the next row
        await loadNewShelf(rowIndex);
        moveToIndex(pageContent, banner, rowIndex);
      }
      break;
    default:
      break;
  }
}

/**
 * Handles user interactions based on 
 * the given event key
 * @param {KeyboardEvent} event The keyboard event 
 */
const handleInput = async (event) => {
  event.preventDefault();
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
      modal.isOpen ? await modal.handleInput(event.key) : handleMenuInput(event.key);
      break;
    case "Enter":
      modal.isOpen ? modal.handleInput(event.key) : modal.open(pageContent[rowIndex].getActiveCard());
      break;
    case "Escape":
    case "Delete":
    case "Backspace":
      if (modal.isOpen) modal.close();
      break;
    default:
      break;
  }
};

/**
 * Initializes home page data and populates first shelves on screen
 * @param {Object} data The api response object to display on-screen
 */
const start = (data) => {
  console.log(data);
  // Hook up the input handler
  document.addEventListener('keydown', function (event) {
    handleInput(event);
  });

  // Set up variables
  pageContent = new Array(data.data.StandardCollection.containers.length);
  rowIndex = 0;

  // Create necessary components
  data.data.StandardCollection.containers.forEach((shelf, i) => populateShelf(shelf, i));
  banner = new Banner();
  modal = new Modal();

  // Highlight the indexed card
  moveToIndex(pageContent, banner, rowIndex);
};

fetchHomeData("/home.json").then(data => {
  start(data);
});
