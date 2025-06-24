export * from './hero';
export * from './imagestack';
export * from './page-builder';

export type MenuItem = {
    menuItem: {
      title: string;
      url: string;
    };
    submenu?: {
      link: {
        title: string;
        url: string;
      };
    }[];
  };
  export interface MenuLink {
    title: string;
    url: string;
  }
  
  export interface ActionItem {
    menuItem: MenuLink;
  }
  export type FooterLogo = {
    altText: string;
    title: string;
    uri: string;
    mediaDetails: {
      width: number;
      height: number;
      sizes: {
        name: string;
        sourceUrl: string;
        width: number;
        height: number;
      }[];
    };
  };
  
  export type FooterLogoWrapper = {
    node: FooterLogo;
  };
  
  export type MenuItemWrapper = {
    menuItem: {
      url: string;
      title: string;
      target: string | null;
    };
  };
  
  export interface FooterData {
    footerEmail: string;
    telephone: string;
    footerAddress: string;
    footerCopyright: string;
    footerLogo: FooterLogoWrapper;
    footerPages: MenuItemWrapper[];
    footerServices: MenuItemWrapper[];
  }
  