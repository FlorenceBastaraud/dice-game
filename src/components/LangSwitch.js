const LangSwitch = ({ onChange, lang, getText }) => {
  return (
    <select
      aria-label={getText('trad_select_lang')}
      className="lang-switch"
      onChange={(e) => onChange(e)}
      value={lang}
    >
      <option value="en">{getText('trad_english')}</option>
      <option value="fr">{getText('trad_french')}</option>
    </select>
  )
}

export default LangSwitch
