import { ProductReview } from '../../dto/product.dto';
import { RatingCategory } from '../../types/Rating';
import { renderStars } from '../../utils/renderStars';
import './Ratings.css';

interface RatingProps {
  rating: ProductReview[];
}
function Ratings({ rating }: RatingProps) {
  const category = rating.reduce<RatingCategory>(
    (acc, curr) => {
      return { ...acc, [curr.rating]: acc[curr.rating] + 1 };
    },
    { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
  );

  const accumulated = rating.reduce((acc, curr) => acc + curr.rating, 0);
  return (
    <div className='rating-detail'>
      <h3 className='review-heading'>Customer Reviews</h3>
      <span className='total'> Total {rating.length} ratings</span>
      <div className='detail'>
        <div>{renderStars(accumulated / rating.length)}</div>
        <div>{(accumulated / rating.length).toFixed(1)} out of 5</div>
      </div>
      <div className='rating-summary'>
        {Object.keys(category)
          .reverse()
          .map((key) => {
            return (
              <div key={key} className='rating-meter'>
                <span className='star'>{key} star</span>
                <meter max={rating.length} value={category[key]} />
                <span className='percentage'>
                  {((category[key] / rating.length) * 100).toFixed(0)} %
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Ratings;
