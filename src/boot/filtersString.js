const filtersStrings = {
  /**
   * Resolvendo URL de images
   * @param {string} url
   * @returns string
   */
  resolveUrl(url) {
    const isImg = url.replace('img:', '')
    if (url.startsWith('img:')) {
      const url = new URL(`../assets/${isImg}`, import.meta.url).origin + '/' + isImg
      return 'img:' + url
    }
    return url
  },
}

export default filtersStrings
