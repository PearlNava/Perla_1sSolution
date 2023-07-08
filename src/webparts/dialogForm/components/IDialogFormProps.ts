import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDialogFormProps {
  description: string;
  context:WebPartContext;
  siteurl:string;
}
