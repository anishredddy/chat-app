import {create} from "zustand";

interface useProfileProps{
    isOpen: boolean;
    onClose: ()=>void;
    onOpen: ()=> void;
}

export const useProfile = create<useProfileProps>((set)=>({
    isOpen:false,
    onOpen: ()=>set({isOpen:true}),
    onClose: () => set({isOpen:false})
}))