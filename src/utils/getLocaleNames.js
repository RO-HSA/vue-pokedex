const getLocaleNames = (data, lang = 'en') => {
  return data.flatMap((item) =>
    item.data.names
      .filter((name) => name.language.name === (lang === 'pt' ? 'en' : lang))
      .map((name) => name.name)
  )
}

export default getLocaleNames
