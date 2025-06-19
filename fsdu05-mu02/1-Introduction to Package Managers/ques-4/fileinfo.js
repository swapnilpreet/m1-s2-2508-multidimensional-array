import path from 'path'
export function getFileInfo(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error("Invalid file path");
  }
  return {
    fileName: path.basename(filePath),
    extension: path.extname(filePath),
    directory: path.dirname(filePath)
  };
}
