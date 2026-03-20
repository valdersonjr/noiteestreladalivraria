"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Livro } from "@/types/livro";

export interface CartItem {
  id: number;
  slug: string;
  titulo: string;
  autor: string;
  preco: number;
  preco_original: number | null;
  foto: string;
  condicao: "novo" | "usado";
  quantidade: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (livro: Livro) => void;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  clearCart: () => {},
  isInCart: () => false,
  count: 0,
  total: 0,
});

export function useCart() {
  return useContext(CartContext);
}

const STORAGE_KEY = "noite_estrelada_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((livro: Livro) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === livro.id);
      if (existing) {
        return prev.map((i) =>
          i.id === livro.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      const precoEfetivo = livro.preco_oferta ?? livro.preco;
      return [
        ...prev,
        {
          id: livro.id,
          slug: livro.slug,
          titulo: livro.titulo,
          autor: livro.autor,
          preco: precoEfetivo,
          preco_original: livro.preco_oferta != null ? livro.preco : null,
          foto: livro.foto,
          condicao: livro.condicao,
          quantidade: 1,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const increaseQty = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade: i.quantidade + 1 } : i))
    );
  }, []);

  const decreaseQty = useCallback((id: number) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.quantidade <= 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items]
  );

  const count = items.reduce((sum, i) => sum + i.quantidade, 0);
  const total = items.reduce((sum, i) => sum + i.preco * i.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        isInCart,
        count,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
