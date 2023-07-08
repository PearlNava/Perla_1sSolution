import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISimpleFormProps {
  description: string;
  context:WebPartContext; // Taking Current context of webpart
  siteurl:string; //taking dynamic siteurl
}
