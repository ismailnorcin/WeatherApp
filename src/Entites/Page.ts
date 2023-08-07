export class Page {
  private _pageTitle: string;
  private _pageBreadcrumbItem: string;
  private _pageBreadcrumbCover: string;
  private _formMessage: string;
  private _form: string;
  private _formLatitude: string;
  private _formLongitude: string;
  private _extra: any;

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
    this._pageTitle = param.title;
    this._pageBreadcrumbItem =
      '<li class="breadcrumb-item"><a href="#">App</a></li>' + param.breadcrumb;
    this._pageBreadcrumbCover = param.breadcrumbCover;
    this._formMessage = param.formMessage;
    this._form = param.form;
    this._formLatitude = param.formLat;
    this._formLongitude = param.formLang;
    this._extra = param.extra;
  }

  get title() {
    return this._pageTitle;
  }

  get message() {
    return this._formMessage;
  }

  get extra() {
    return this._extra;
  }

  get breadcrumbCover(): HTMLElement | null{
    return document.querySelector(this._pageBreadcrumbCover);
  }

  get breadcrumbItem(): string{
    return this._pageBreadcrumbItem;
  }

  get form(): HTMLElement | null {
    return document.querySelector(this._form);
  }

  get formLat(): HTMLInputElement | null {
    return document.querySelector(this._formLatitude);
  }

  get formLong(): HTMLInputElement | null {
    return document.querySelector(this._formLongitude);
  }
}