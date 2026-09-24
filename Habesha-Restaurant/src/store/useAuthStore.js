import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            currentUser: null,
            setCurrentUser: (user) => set({ currentUser: user }),
            logout: () => set({ currentUser: null }),
        }),
        {
            name: 'habesha-current-user',
            merge: (persistedState, currentState) => ({
                ...currentState,
                currentUser: persistedState?.currentUser || (
                    persistedState?.fullName ? persistedState : null
                ),
            }),
        }
    )
)
