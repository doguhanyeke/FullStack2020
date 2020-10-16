import React from 'react'

const Recommend = (props) => {
  const wholebooks = props.books
  const currentUser = props.user
  if(!props.show){
    return null
  }
  return(
    <div>
      {console.log(currentUser)}
    </div>
  )
}

export default Recommend