import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const normalizeCartItems = (items = []) => {
    const merged = new Map()

    items.forEach((item) => {
        const existing = merged.get(item.id)

        if (existing) {
            existing.quantity += item.quantity || 1
            return
        }

        merged.set(item.id, { ...item, quantity: item.quantity || 1 })
    })

    return [...merged.values()]
}

export const useCartStore = create(
    persist(
        (set) => ({
            items: [],
            addItem: (dish) => set((state) => {
                const existingItem = state.items.find((item) => item.id === dish.id)

                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.id === dish.id
                                ? { ...item, quantity: (item.quantity || 1) + 1 }
                                : item
                        ),
                    }
                }

                return { items: [...state.items, { ...dish, quantity: 1 }] }
            }),
            increaseQuantity: (dishId) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === dishId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                ),
            })),
            decreaseQuantity: (dishId) => set((state) => ({
                items: state.items
                    .map((item) =>
                        item.id === dishId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
                    )
                    .filter((item) => item.quantity > 0),
            })),
            removeItem: (dishId) => set((state) => ({
                items: state.items.filter((item) => item.id !== dishId),
            })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'habesha-cart',
            merge: (persistedState, currentState) => ({
                ...currentState,
                ...persistedState,
                items: normalizeCartItems(
                    Array.isArray(persistedState) ? persistedState : persistedState?.items || []
                ),
            }),
        }
    )
)

export const selectCartTotal = (state) => state.items.reduce(
    (sum, item) => sum + Number((item.priceETB || 0) * (item.quantity || 1)),
    0
)
