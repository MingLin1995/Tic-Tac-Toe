import React from 'react';
import { useState } from 'react';

interface ProductRowProps {
  product: {
    name: string;
    price: string;
    stocked: boolean;
  };
}

// 產品
function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? ( // 根據庫存狀態顯示產品名稱
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span> // 庫存不足顯示紅色
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

interface ProductCategoryRowProps {
  category: string;
}

// 產品類別表頭
function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

interface ProductTableProps {
  products: {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
  }[];
  filterText: string;
  inStockOnly: boolean;
}

// 產品篩選結果
function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) {
  const rows: JSX.Element[] = []; // 儲存顯示的行
  let lastCategory: string | null = null; // 儲存上一次的類別，下次篩選條件更新時，可以做比較
  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return; // 如果產品名稱不包含篩選文字，則跳過
    }
    if (inStockOnly && !product.stocked) {
      return; // 如果只顯示有庫存的產品，且當前產品無庫存，則跳過
    }
    if (product.category !== lastCategory) {
      // 如果有新增的類別，就插入新的類別（確保類別不會一直重複）
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} // 使用類別作為KEY
        />,
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />); // 增加產品的行
    lastCategory = product.category; // 更新上一次的類別
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (text: string) => void;
  onInStockOnlyChange: (inStock: boolean) => void;
}

// 搜尋、篩選
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText} // 目前的篩選文字
        onChange={(e) => onFilterTextChange(e.target.value)} // input 被觸發時，將值傳遞給 onFilterTextChange ，實現即時更新
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly} // 目前的庫存數量
          onChange={(e) => onInStockOnlyChange(e.target.checked)} // 句選狀態改變，更新庫存狀態
        />{' '}
        只顯示有庫存的產品
      </label>
    </form>
  );
}

interface FilterableProductTableProps {
  products: {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
  }[];
}

// 整個完整應用
function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState(''); // 篩選條件
  const [inStockOnly, setInStockOnly] = useState(false); // 是否只顯示有庫存的產品

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText} // 更新篩選文字
        onInStockOnlyChange={setInStockOnly} // 更新庫存狀態
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
