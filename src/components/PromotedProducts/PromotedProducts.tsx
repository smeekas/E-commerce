import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import './PromotedProducts.css';
import { useQuery } from '@tanstack/react-query';
import { API } from '../../config/axios.config';
import { Product } from '../../dto/product.dto';
import { paths } from '../../constants/api';
import { QueryKey } from '../../constants/QueryKey';

const randomId1 = Math.ceil(Math.random() * 20);
const randomId2 = Math.ceil(Math.random() * 20);
function PromotedProducts() {
  // for demonstration purpose, I have fetched random 2 products
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 10 }, [
    Autoplay(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.ProductDetail, randomId1],
    queryFn: () => API.get<Product>(paths.productDetail(randomId1.toString())),
  });
  const { data: data2, isLoading: isLoading2 } = useQuery({
    queryKey: [QueryKey.ProductDetail, randomId2],
    queryFn: () => API.get<Product>(paths.productDetail(randomId2.toString())),
  });
  const images = useMemo(() => {
    const imgs: Product[] = [];
    if (!isLoading && data?.data?.images?.length) {
      imgs.push(data.data);
    }
    if (!isLoading2 && data2?.data?.images?.length) {
      imgs.push(data2.data);
    }
    return imgs;
  }, [isLoading, isLoading2, data, data2]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || images.length === 0) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, images, onSelect]);

  return (
    <div className='ad'>
      {images.length > 0 ? (
        <div className='embla'>
          <div className='embla__badge'>Featured</div>
          <div className='embla__viewport' ref={emblaRef}>
            <div className='embla__container'>
              {images.map((imgItem) => (
                <div className='embla__slide' key={imgItem.id}>
                  <img alt={imgItem.title} src={imgItem?.images?.[0]} />
                  <div className='embla__slide__caption'>{imgItem.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className='embla__dots'>
            {images.map((_, index) => (
              <button
                key={index}
                className={`embla__dot${index === selectedIndex ? ' embla__dot--selected' : ''}`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='carousel-placeholder' />
      )}
      <div className='sale'>
        <img
          src='https://placehold.co/800x200/orange/white?text=Sale+is+Live+!!+\n+Shop+Now&font=roboto'
          alt='sale'
        />
      </div>
    </div>
  );
}

export default PromotedProducts;
