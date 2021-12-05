import axios from "axios";

/**
 * Preloads an image before sending it to DOM element
 * @param {string} url The image src to apply to the element 
 * @param {Element} element The img element to mutate
 * @param {() => void} successCallback The function to call if the image loads 
 * @param {() => void} errorCallback The function to call if the image fails to load
 */
export const preloadImage = (url, element, successCallback, errorCallback) => {
  // Clear out element attributes
  element.src = "";
  element.alt = "";

  // Set-up callback functions and attempt to load the image
  const tempImg = new Image();
  tempImg.onload = () => {
    successCallback();
    element.src = url;
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
  pageContent[index].getActiveCard().element.id = "activeCard";
  banner.setContent(pageContent[index].getActiveCard());
};
