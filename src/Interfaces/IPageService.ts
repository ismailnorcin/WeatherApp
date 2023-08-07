import { Page } from "../Entites/Page";
export interface IPageService {
  setTitle(): this;
  setBreadcrumb(): this;
  page():Page;
}