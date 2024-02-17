import React from 'react'
import Rating from 'react-rating'

const FractionalRating = () => {
  const [rating, setRating] = React.useState(0)
  return (
    <Rating
      emptySymbol={
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <i className="fa fa-star-o fa-1x" />
          </div>
      }
      fullSymbol={<i className="fa fa-star fa-1x" style={{ color: 'gold' }} />}
      fractions={4}
      stop={10}
      onChange={setRating}
      initialRating={rating}
      style={{ color: 'gold' }}
    />
  )
}



export default FractionalRating