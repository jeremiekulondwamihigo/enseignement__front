module.exports = {
  NiveauLettre: (niveau) => {
    switch (niveau) {
      case 7:
        return 'Septieme année'
      case 8:
        return 'Huitieme année'
      case 1:
        return 'Première année'
      case 2:
        return 'Deuxieme année'
      case 3:
        return 'Troisieme année'
      case 4:
        return 'Quatrieme année'
      default:
        return ''
    }
  },
}
