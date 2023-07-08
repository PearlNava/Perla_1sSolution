import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SimpleFormWebPartStrings';
import SimpleForm from './components/SimpleForm';
import { ISimpleFormProps } from './components/ISimpleFormProps';

export interface ISimpleFormWebPartProps {
  description: string;
}

export default class SimpleFormWebPart extends BaseClientSideWebPart<ISimpleFormWebPartProps> {

 

  public render(): void {
    const element: React.ReactElement<ISimpleFormProps> = React.createElement(
      SimpleForm,
      {
        description: this.properties.description,
       context:this.context, //Context Nature
       siteurl:this.context.pageContext.web.absoluteUrl //Siteurl Nature For taking Dynamic Url
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
