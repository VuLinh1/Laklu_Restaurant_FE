
import {create} from "zustand/react";
// only allow two level breadcrumb 
export interface Breadcrumb {
    current?: BreadcrumbLink;
    previous?: BreadcrumbLink;
}
export interface BreadcrumbLink {
    title: string;
    url: string;
}

export interface BreadcrumbStore {
    breadcrumb: Breadcrumb;
    setBreadcrumb: (breadcrumb: Breadcrumb) => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
    breadcrumb: {},
    setBreadcrumb: (breadcrumb) => set({ breadcrumb }),
}));