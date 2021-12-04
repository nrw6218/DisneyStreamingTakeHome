import axios from "axios";

import { Shelf } from "./components/Shelf";
import { Card } from "./components/Card";
import { Banner } from "./components/Banner";
import { Modal } from "./components/Modal";

import "./styles.css";

// CLEANUP: Comments and documentation
// CLEANUP: Hide titles and put placeholders in for refid collections

// BONUS: mouse sparkle trail effect or other Disney-inspired feature

const baseUrl = "https://cd-static.bamgrid.com/dp-117731241344";
let pageContent = [];
let rowIndex = 0;
let banner;
let modal;

/**
 * Makes an axios call to the Disney Streaming API to retrieve homepage data.
 * @param {string} path The extension of the base url path.
 * @returns A promise of the response data.
 */
const fetchHomeData = async (path) => {
  return axios.get(baseUrl + path).then(response => {
    return response.data;
  }).catch(e => {
    console.error(e);
    return undefined;
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

const handleInput = async (event) => {
  event.preventDefault();
  pageContent[rowIndex].getActiveCard().element.blur();
  switch (event.key) {
    case "ArrowLeft":
      if (pageContent[rowIndex].index <= 0) {
        pageContent[rowIndex].index = pageContent[rowIndex].cards.length - 1;
      } else pageContent[rowIndex].index--;
      break;
    case "ArrowRight":
      if (pageContent[rowIndex].index >= pageContent[rowIndex].cards.length - 1) {
        pageContent[rowIndex].index = 0;
      } else pageContent[rowIndex].index++;
      break;
    case "ArrowUp":
      if (rowIndex > 0) {
        rowIndex--;
        // Attempt to load the next row
        await loadNewShelf(rowIndex);
      }
      break;
    case "ArrowDown":
      if (rowIndex < pageContent.length - 1) {
        rowIndex++;
        // Attempt to load the next row
        await loadNewShelf(rowIndex);
      }
      break;
    case "Enter":
      if (!modal.isOpen) modal.open(pageContent[rowIndex].getActiveCard());
      break;
    case "Backspace":
      console.log("BACK");
      if (modal.isOpen) modal.close();
      break;
  }
  moveToIndex();
};

/**
 * Scrolls the page to the current index
 * and focuses on the resulting card
 */
const moveToIndex = () => {
  document.getElementById("root").scrollTo({
    top: pageContent[rowIndex].element.parentNode.offsetTop,
    behavior: 'smooth'
  });
  pageContent[rowIndex].element.scrollTo({
    left: (pageContent[rowIndex].getActiveCard().element.parentNode.offsetLeft - pageContent[rowIndex].element.offsetLeft),
    behavior: 'smooth'
  });
  pageContent[rowIndex].getActiveCard().element.focus({preventScroll: true});
  banner.setContent(pageContent[rowIndex].getActiveCard());
};

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

  // TO-DO: Think through a better way to handle this (I hate hunting for the key name)
  content[Object.keys(content)[0]]?.items?.forEach(item => {
    pageContent[index].addCard(new Card(item));
  });
};

/**
 * Initializes home page data and populates first shelves on screen
 * @param {Object} data The api response object to display on-screen
 */
const start = (data) => {
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
  moveToIndex();
};

fetchHomeData("/home.json").then(data => {
  start(data);
});
