import create from "zustand";

const useStore = create(set => ({
    loggedIn: true,
    toggleLoggedIn: () => set(state => ({loggedIn: !state.loggedIn})),
    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')): [],
    addToFavorites: (currency) => set(state => ({favorites: state.favorites.concat([currency])})),
    socketData: [],
    setSocketCurrencies: (currency) => set(state => ({socketData: {...state.socketData, data: [currency]}})),
    setSocketData: (data) => set(state => ({socketData: {...state.socketData, ...data}}))
}))

export default useStore;