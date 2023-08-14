const sanitizeUrl = (url: string) => {
  const removeUnderscore = url.replace(/_/g, " ");
  const decodedUri = decodeURIComponent(removeUnderscore);
  return decodedUri;
};

export default sanitizeUrl;
