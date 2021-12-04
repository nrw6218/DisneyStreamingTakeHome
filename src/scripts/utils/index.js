import axios from "axios";

/**
 * Preloads an image before sending it to DOM element
 * @param {*} url 
 * @param {*} id 
 * @param {*} errorCallback 
 */
export const preloadImage = (url, id, errorCallback) => {
  const tempImg = new Image();
  tempImg.onload = () => {
    document.getElementById(id).src = url;
  };
  tempImg.onerror = () => errorCallback();
  tempImg.src = url;
};

/**
 * Makes an axios call to the Disney Streaming API to retrieve homepage data.
 * @param {string} path The extension of the base url path.
 * @returns A promise of the response data.
 */
export const fetchHomeData = async (path) => {
  return axios.get(`https://cd-static.bamgrid.com/dp-117731241344${path || ""}`).then(response => {
    return response.data;
  }).catch(e => {
    console.error(e);
    return undefined;
  });
};

/**
 * Scrolls the page to the current index
 * and focuses on the resulting card.
 * @param {Shelf[]} pageContent The array of shelves.
 * @param {Banner} banner The homepage banner component.
 * @param {number} index The row to scroll to.
 */
export const moveToIndex = (pageContent, banner, index) => {
  document.getElementById("root").scrollTo({
    top: pageContent[index].element.parentNode.offsetTop,
    behavior: 'smooth'
  });
  pageContent[index].element.scrollTo({
    left: (pageContent[index].getActiveCard().element.parentNode.offsetLeft - pageContent[index].element.offsetLeft),
    behavior: 'smooth'
  });
  pageContent[index].getActiveCard().element.focus({preventScroll: true});
  banner.setContent(pageContent[index].getActiveCard());
};
