import { atom } from "recoil";

// Look more into recoil
export const modalState = atom({
    key:"modalState",
    default: false,

});

export const postIdState = atom({
    key: "postIdState",
    default: "",
})