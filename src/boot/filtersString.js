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
  /**
   * Formata valores numericos
   * @param {number|float} value numero para ser convertido para formato ex.:2.999,00
   * @returns valor convertido para 2 casas decimais e pontuação de milhar
   */
  formatPartternCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  },
}

export default filtersStrings
