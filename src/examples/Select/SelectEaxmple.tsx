import { useState } from 'react';
import Select from '../../components/select/Select';

interface Product {
  productName: string;
  productPrice: number;
  productDiscount: number;
}

const products: Product[] = [
  { productName: 'product1', productPrice: 1000, productDiscount: 4 },
  { productName: 'product2', productPrice: 2000, productDiscount: 10 },
  { productName: 'product3', productPrice: 3000, productDiscount: 15 },
];

const SelectExample = () => {
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);

  const handleProductSelect = (value: string) => {
    const selectedProduct = products.find(
      (product) => product.productName === value
    );
    setSelectedDiscount(
      selectedProduct ? selectedProduct.productDiscount : null
    );
  };

  return (
    <Select className='select-container'>
      <Select.Trigger className='select-trigger'>
        {selectedDiscount !== null ? (
          <>
            {
              products.find(
                (product) => product.productDiscount === selectedDiscount
              )?.productName
            }{' '}
            <span style={{ color: 'red' }}>- {selectedDiscount}%</span>
          </>
        ) : (
          '상품을 선택하세요'
        )}
      </Select.Trigger>

      <Select.Content className='select-content'>
        {products.map((product) => (
          <Select.Item
            key={product.productName}
            className='select-item'
            value={product.productName}
            onSelect={handleProductSelect}
          >
            <span>
              {product.productName}{' '}
              <span style={{ color: 'red' }}>- {product.productDiscount}%</span>
            </span>
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};

export default SelectExample;
