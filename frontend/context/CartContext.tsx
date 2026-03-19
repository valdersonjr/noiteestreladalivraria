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
  foto: string;
  condicao: "novo" | "usado";
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (livro: Livro) => void;
  removeItem: (id: number) => void;
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

  // Carrega do localStorage na montagem
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  // Persiste no localStorage a cada mudança
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((livro: Livro) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === livro.id)) return prev;
      return [
        ...prev,
        {
          id: livro.id,
          slug: livro.slug,
          titulo: livro.titulo,
          autor: livro.autor,
          preco: livro.preco,
          foto: livro.foto,
          condicao: livro.condicao,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items]
  );

  const count = items.length;
  const total = items.reduce((sum, i) => sum + i.preco, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
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
