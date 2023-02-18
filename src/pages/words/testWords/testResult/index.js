import React from "react";

const TestResult = () => {
  return (
    <div className="test-result">
      <h4 className="sub-title">[{selectedCategory.category}] {selectedStep.name} Test</h4>
      <ul className="list__wrap">
          {words ?
            words.map((list) => {
              return (
                <li className="list" onClick={() => handleNavigate(list.id)}>
                  <div className="list__title">
                    <span className="list__icon">
                      <FontAwesomeIcon icon={faBookBookmark} />
                    </span>
                    {list.category}
                  </div>
                </li>
              )
            }) : <></>
          }
        </ul>
    </div>
  )
}