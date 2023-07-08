import * as React from 'react';
import styles from './WpForm.module.scss';
import { IWpFormProps } from './IWpFormProps';
import { Checkbox, ChoiceGroup, ComboBox, Dropdown, IComboBoxStyles, IDropdownStyles, IStackTokens, Label, SearchBox, Slider, Stack, TextField, Toggle } from 'office-ui-fabric-react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DateConvention, DateTimePicker } from '@pnp/spfx-controls-react';
//import { escape } from '@microsoft/sp-lodash-subset';
const stackTokens:IStackTokens={
  childrenGap: 17
}
const stackTokens1:IStackTokens={
  childrenGap: 5
}
 const dropdownstyle:Partial<IDropdownStyles>={
  dropdown: {width:300}
} 
const comboboxtstyle:Partial<IComboBoxStyles>={
  root:{maxWidth:300}
  }
export default class WpForm extends React.Component<IWpFormProps, {}> {
  public render(): React.ReactElement<IWpFormProps> {

    return (
      <>
      <h2 className={styles.h2}>
      Fluent Ui Controls
    </h2>
    <br/>
    <PeoplePicker 
    context={this.props.context as any}
    personSelectionLimit={3}
    showtooltip={true}
    // showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    ensureUser={true}
    disabled={false}
    defaultSelectedUsers={[this.props.context.pageContext.user.email as any]}
    />
    <br/>
    <form>
    <SearchBox placeholder='Search here ...'/>
      <br/>
    <Stack horizontal tokens={stackTokens}>
      <Label required>First Name</Label>
      <TextField style={{width:"250px"}}/>
      <Label required>Last Name:</Label>
      <TextField  style={{width:"250px"}}/>
      </Stack>
      <Label required>Address:</Label>
      <TextField  style={{width:"300px"}} multiline rows={5}/>
      <Label>Toggle Types</Label>
      <Toggle onText='ON' offText='OFF'/>
      <Toggle onText='ON' offText='OFF' defaultChecked/>
      <Toggle onText='ON' offText='OFF' defaultChecked disabled/>

      <Label>Password</Label>
      <TextField type='password'
      canRevealPassword
      placeholder='Type your password here'
      />
      <Label> Slider Types:</Label>
    <Slider min={1} max={50} step={1}/>
    <Slider min={1} max={50} step={10}/>
    <Slider min={1} max={50} step={0.2}/>

        
    <Dropdown placeholder='Select an option' label="Single Selected DropDown"
    options={[
      {key:"A",text:"Option-A"},
      {key:"B",text:"Option-B"},
      {key:"C",text:"Option-C"},
      {key:"D",text:"Option-D"}
    ]}
    styles={dropdownstyle}/>
    <Dropdown placeholder='Select an option' label="Multi Selected DropDown"
    options={[
      {key:"A",text:"Option-A"},
      {key:"B",text:"Option-B"},
      {key:"C",text:"Option-C"},
      {key:"D",text:"Option-D"}
    ]}
    styles={dropdownstyle}
    multiSelect/>
    <Dropdown placeholder='Select an option' label="Multi Selected DropDown"
    options={[
      {key:"A",text:"Option-A"},
      {key:"B",text:"Option-B",disabled:true},
      {key:"C",text:"Option-C"},
      {key:"D",text:"Option-D"}
    ]}
    styles={dropdownstyle}
    multiSelect
    defaultSelectedKeys={["A","D"]}/>
    <ComboBox label="Searchable Dropdown"
    placeholder='Search for option...'
    options={[
      {key:"A",text:"Option-A"},
      {key:"B",text:"Option-B",disabled:true},
      {key:"C",text:"Option-C"},
      {key:"D",text:"Option-D"}
    ]}
    autoComplete="on"
    allowFreeform
    styles={comboboxtstyle}/>

    <ChoiceGroup label='Radio Buttons'
     options={[
      {key:"A",text:"Option-A"},
      {key:"B",text:"Option-B",disabled:true},
      {key:"C",text:"Option-C"},
      {key:"D",text:"Option-D"}
    ]}
    />
    <Label>Countries:</Label>
    <Stack tokens={stackTokens1} horizontal>
    <Checkbox label='India' />
    <Checkbox label='USA'/>
    <Checkbox label='Australia'/>
    <Checkbox label='Canada'/>
    </Stack>
    <DateTimePicker dateConvention={DateConvention.DateTime} label='Select Date'/>
    </form>
      </>
    );
  }
}
