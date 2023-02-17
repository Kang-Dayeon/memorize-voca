const ContentWrapper = ({children}) => {
  return (
    <div className="app-content">
      <div className="app-content__inner">
        {children}
      </div>
    </div>
  )
}

export default ContentWrapper