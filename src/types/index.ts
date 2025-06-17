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