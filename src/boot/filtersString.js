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
  /**
   *
   * @param {date} date data para se formatada para o formato brasileiro
   * @example 2025-01-01T00:00:00.000Z
   * @returns date formatada para o formato brasileiro dd/mm/yyyy
   * @description Formata uma data para o formato brasileiro (dd/mm/yyyy)
   */
  formatDateBR(date) {
    if (!date) return ''
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('pt-BR', options)
  },
}

export default filtersStrings
