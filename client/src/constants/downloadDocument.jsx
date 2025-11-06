export const downloadDocument = (url) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = "your file name.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
