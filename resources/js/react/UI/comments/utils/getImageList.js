const isImageFile = (file) => {
  const splitedName = file?.url?.split(".");
  const [name, ext] = [file.name,splitedName[splitedName.length - 1]];

  if (
    ext === "png" ||
    ext === "img" ||
    ext === "jpg" ||
    ext === "jpeg" ||
    ext === "svg" ||
    ext === "gif" ||
    ext === "webp"
  ) {
    return true;
  } else {
    return false;
  }
};


export default function getImageList(comments) {
  const filesArray = [...comments].map(comment => {
    if (comment?.is_deleted) {
      return null;
    } else {
      if (comment?.files_data) {
        const images = [...comment?.files_data].filter((file) => {
          return isImageFile(file);
        })
        // console.log({files_data:comment?.files_data,images});
        return images;
      } else {
        return null;
      }

    }
  }).filter(comment => !!comment).flat(Infinity);

  // console.log(filesArray);


  // console.log(comments);
  // return [];
  return filesArray;
}