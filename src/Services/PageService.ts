import { Page } from "../Entites/Page";
import { IPageService } from "../Interfaces/IPageService";


export class PageService implements IPageService {
  private _page: Page;

  constructor(param: {
    title: string;
    breadcrumbCover: string;
    breadcrumb: string;
    form: string;
    formLat: string;
    formLang: string;
    formMessage: string;
    extra?: any
  }) {
    this._page = new Page(param);
  }

  setTitle(): this {
    document.title = this._page.title;
    return this;
  }

  setBreadcrumb(): this {

   let liNodeLists = new DOMParser().parseFromString(
     this._page.breadcrumbItem,
     "text/html"
   ).body.childNodes;

   let liItems = Array.from(liNodeLists);

   liItems.forEach((item) => {
     this._page.breadcrumbCover?.appendChild(item);
   });


     return this;
  }

  page(): Page {
    return this._page;
  }
}
