import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { QueryKey } from '../constants/QueryKey';
import { API } from '../config/axios.config';
import { paths } from '../constants/api';
import ProductDetails from '../components/ProductDetail/ProductDetail';
import { Product } from '../dto/product.dto';
import Spin from '../components/Spin/Spin';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    enabled: !!id,
    queryKey: [QueryKey.ProductDetail, id],
    queryFn: () => API.get<Product>(paths.productDetail(id || '')),
  });

  if (isLoading || !data?.data) return <Spin spin />;
  return <ProductDetails product={data?.data} />;
}

export default ProductDetail;
