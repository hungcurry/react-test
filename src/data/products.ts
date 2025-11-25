// 模擬產品資料

import { Product } from '../types';
import type { TDrinks } from '@/types';

const data: TDrinks[] = [
  {
    id: 1,
    name: '珍珠奶茶',
    content: '香濃奶茶搭配QQ珍珠',
    price: 50,
    num: 20,
  }
]
// console.log('data:', data);

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'MacBook Pro 16"',
    description: '配備 M3 Pro 晶片的專業級筆記型電腦，適合開發者和創作者使用',
    price: 79900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    category: '電腦'
  },
  {
    id: 2,
    title: 'iPhone 15 Pro',
    description: '最新款 iPhone，搭載 A17 Pro 晶片，支援 USB-C 連接',
    price: 36900,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: '手機'
  },
  {
    id: 3,
    title: 'AirPods Pro 2',
    description: '主動降噪無線耳機，提供沉浸式音質體驗',
    price: 7490,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop',
    category: '音響'
  },
  {
    id: 4,
    title: 'iPad Air',
    description: '輕薄便攜的平板電腦，支援 Apple Pencil 和 Magic Keyboard',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    category: '平板'
  },
  {
    id: 5,
    title: 'Apple Watch Series 9',
    description: '健康監測和運動追蹤的智慧手錶，支援 ECG 和血氧檢測',
    price: 12900,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
    category: '穿戴裝置'
  },
  {
    id: 6,
    title: 'Magic Keyboard',
    description: '為 iPad 設計的鍵盤，提供筆記型電腦般的打字體驗',
    price: 10900,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    category: '配件'
  },
  {
    id: 7,
    title: 'Studio Display',
    description: '27 吋 5K Retina 顯示器，專為 Mac 設計',
    price: 45900,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    category: '顯示器'
  },
  {
    id: 8,
    title: 'HomePod mini',
    description: '智慧音箱，支援 Siri 和空間音訊技術',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    category: '音響'
  }
];
