function truncateStringInMiddle(
  fullStr: string,
  strLen = 8,
  separator = "...",
  frontChars = 3,
  backChars = 4
) {
  if (!fullStr || fullStr.length <= strLen) return fullStr;

  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
}

export { truncateStringInMiddle };
