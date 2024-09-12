function Footer({ getText }) {
  return (
    <footer className="home__footer">
      <span>2023 &copy; </span>
      <a
        className="home__footer--link"
        href="https://florence-b.com"
        target="_blank"
        rel="noreferrer"
        aria-label={getText('footer_copyr')}
      >
        {' '}
        Florence Bastaraud
      </a>
    </footer>
  )
}

export default Footer
