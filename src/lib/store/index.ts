// src/lib/store/index.ts

import { create } from "zustand";
import { Depot, Refinery, Order, User, Notification } from "@/types";
import { mockDepots, mockRefineries } from "@/lib/mock-data";

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Depot Store
interface DepotState {
  depots: Depot[];
  selectedDepot: Depot | null;
  isLoading: boolean;
  setDepots: (depots: Depot[]) => void;
  selectDepot: (depot: Depot | null) => void;
  updateDepotPrice: (depotId: string, productId: string, newPrice: number) => void;
}

export const useDepotStore = create<DepotState>((set) => ({
  depots: mockDepots,
  selectedDepot: null,
  isLoading: false,
  setDepots: (depots) => set({ depots }),
  selectDepot: (depot) => set({ selectedDepot: depot }),
  updateDepotPrice: (depotId, productId, newPrice) =>
    set((state) => ({
      depots: state.depots.map((depot) =>
        depot.id === depotId
          ? {
              ...depot,
              products: depot.products.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      previousPrice: product.pricePerLitre,
                      pricePerLitre: newPrice,
                      priceChange: newPrice - product.pricePerLitre,
                      updatedAt: new Date().toISOString(),
                    }
                  : product
              ),
            }
          : depot
      ),
    })),
}));

// Refinery Store
interface RefineryState {
  refineries: Refinery[];
  updateRefineryPrice: (refineryId: string, productType: string, newPrice: number) => void;
}

export const useRefineryStore = create<RefineryState>((set) => ({
  refineries: mockRefineries,
  updateRefineryPrice: (refineryId, productType, newPrice) =>
    set((state) => ({
      refineries: state.refineries.map((refinery) =>
        refinery.id === refineryId
          ? {
              ...refinery,
              products: refinery.products.map((product) =>
                product.type === productType
                  ? {
                      ...product,
                      previousPrice: product.exWorksPrice,
                      exWorksPrice: newPrice,
                      lastUpdated: new Date().toISOString(),
                    }
                  : product
              ),
            }
          : refinery
      ),
    })),
}));

// Order Store
interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order["status"], note?: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (orderId, status, note = "") =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              timeline: [
                ...order.timeline,
                { status, timestamp: new Date().toISOString(), note },
              ],
              updatedAt: new Date().toISOString(),
            }
          : order
      ),
    })),
}));

// Notification Store
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
}));

// UI Store (for demo controls, modals, etc.)
interface UIState {
  isMobileMenuOpen: boolean;
  activeModal: string | null;
  toggleMobileMenu: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  activeModal: null,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));