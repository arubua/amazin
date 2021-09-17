//Generate an image src url from the provided google drive link
export const getImageUrl = (url) => {
    //split the image_url by "/" to get an array of the various parts
    const sections = url.split("/");
    //extract the image Id which is the second last part of the image_url
    const imageId = sections[sections.length - 2];
    //get the image src url using extracted Id above
    return `https://drive.google.com/uc?export=view&id=${imageId}`;
  };
  