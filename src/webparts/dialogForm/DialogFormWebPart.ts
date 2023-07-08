import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {sp} from "@pnp/sp/presets/all"
import * as strings from 'DialogFormWebPartStrings';
import DialogForm from './components/DialogForm';
import { IDialogFormProps } from './components/IDialogFormProps';

export interface IDialogFormWebPartProps {
  description: string;
}

export default class DialogFormWebPart extends BaseClientSideWebPart<IDialogFormWebPartProps> {

protected onInit(): Promise<void> {
  return super.onInit().then(e=>{
    sp.setup({
      spfxContext:this.context
    });
  });
}
  public render(): void {
    const element: React.ReactElement<IDialogFormProps> = React.createElement(
      DialogForm,
      {
        description: this.properties.description,
        context:this.context,
        siteurl:this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
    }  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
