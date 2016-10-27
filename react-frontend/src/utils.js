export function computeFileName(path) {
  return path.split('/').pop();
}

export function isImageFile(path) {
  let fileExt = /(?:\.([^.]+))?$/.exec(path)[1].toLowerCase();

  return fileExt === 'png' || fileExt === 'jpg' ||
         fileExt === 'jpeg' || fileExt === 'gif';
}
