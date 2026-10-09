import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT, PRICE_MULTIPLIER } from '@constants/student';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  shippingFee: number | null;
  addItem: (product: { id: string | number; title: string; price: number; image: string }) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
  setShippingFee: (fee: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      shippingFee: null,

      addItem: (product) => {
        const prodId = String(product.id);
        set((state) => {
          const existing = state.items.find((i) => i.id === prodId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === prodId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: prodId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      changeQty: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.id === id) {
                const newQty = i.quantity + delta;
                return newQty > 0 ? { ...i, quantity: newQty } : null;
              }
              return i;
            })
            .filter((i): i is CartItem => i !== null),
        }));
      },

      totalQuantity: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      totalAmount: () => {
        return get().items.reduce((sum, i) => {
          const itemPriceVnd = Math.round(i.price * PRICE_MULTIPLIER);
          return sum + itemPriceVnd * i.quantity;
        }, 0);
      },

      setShippingFee: (fee) => set({ shippingFee: fee }),
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }) as CartState,
    }
  )
);