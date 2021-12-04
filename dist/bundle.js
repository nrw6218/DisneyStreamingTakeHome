/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shelf": () => (/* binding */ Shelf)
/* harmony export */ });
/**
 * Represents the scrollable shelf containing a set of cards.
 */
class Shelf {
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

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
/**
 * A simple data container holding reference
 * to an individual content card within a shelf
 */
class Card {
  constructor(response) {
    this.title = Object.values(response?.text?.title?.full)[0].default?.content;
    this.contentId = response.contentId;
    this.seriesId = response.seriesId;
    this.videoUrl = response.videoArt.length > 0 && response.videoArt[0].mediaMetadata?.urls[0].url;

    const title = response?.image?.title_treatment ? response.image.title_treatment["1.78"] : undefined; 
    this.titleUrl = title ? Object.values(title)[0].default?.url : undefined;

    const img = response?.image?.tile["1.78"]; // Helper to get to the useful data
    this.cardUrl = img ? Object.values(img)[0].default?.url : undefined;
    this.heroImg = Object.values(response.image.hero_collection["1.78"])[0]?.default?.url || undefined;

    this.element = undefined;
  }

  onEnter = () => {
    // Use this to open whatever modal exists
  };
}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Banner": () => (/* binding */ Banner)
/* harmony export */ });
/**
 * Represents the homepage banner.
 */
class Banner {
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

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modal": () => (/* binding */ Modal)
/* harmony export */ });
class Modal {
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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Shelf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _components_Banner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);





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
    pageContent[index] = new _components_Shelf__WEBPACK_IMPORTED_MODULE_0__.Shelf(content);
  }
  
  if (pageContent[index].refId && rowIndex + 1 < index) return;

  pageContent[index].buildShelf();

  // TO-DO: Think through a better way to handle this (I hate hunting for the key name)
  content[Object.keys(content)[0]]?.items?.forEach(item => {
    pageContent[index].addCard(new _components_Card__WEBPACK_IMPORTED_MODULE_1__.Card(item));
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
  banner = new _components_Banner__WEBPACK_IMPORTED_MODULE_2__.Banner();
  modal = new _components_Modal__WEBPACK_IMPORTED_MODULE_3__.Modal();

  // Highlight the indexed card
  moveToIndex();
};

fetchHomeData("/home.json").then(data => {
  start(data);
});

})();

/******/ })()
;