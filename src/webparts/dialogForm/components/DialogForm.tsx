import * as React from 'react';
// import styles from './DialogForm.module.scss';
import { IDialogFormProps } from './IDialogFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { IDialogFormState } from './IDilogFormState';
import { sp, Web } from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { ChoiceGroup, Dialog, DialogFooter, DialogType, Dropdown, IChoiceGroupOption, IDropdownOption, IStackTokens, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { DateConvention, DateTimePicker } from '@pnp/spfx-controls-react/lib/DateTimePicker';
const stackTokens:IStackTokens={
  childrenGap:15
}
export default class DialogForm extends React.Component<IDialogFormProps, IDialogFormState> {
  constructor(props: Readonly<IDialogFormProps>, state: Readonly<IDialogFormState>) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = {
      IListItems: [],
      Title: "",
      Address: "",
      Age: 0,
      PPLPicker: "",
      PPLPickerId: 0,
      DTime: "",
      Department: "",
      Gender: "",
      showDialog: false
    }
  }
  // Fetching Data

  public async FetchData(){
    // Taking Web Url
    const web=Web(this.props.siteurl);
    //Api
    const items:any[]= await web.lists.getByTitle("SimpleTest").items.select("*","PPLPicker/Title").expand("PPLPicker").get();
    console.log(items);
    this.setState({IListItems:items});
  }
  // Calling FetchData
  public async componentDidMount() {
    await this.FetchData();
  }

  //  Create Data
  public async CreatedItems() {
    this.setState({ showDialog: true });
  }

  private onSaveClick = () => {
    
      this.setState({ showDialog: false }, async () => {
        let web = Web(this.props.siteurl);
        await web.lists.getByTitle("SimpleTest").items.add({
          Title: this.state.Title,
          Age: this.state.Age,
          Address: this.state.Address,
          PPLPickerId: this.state.PPLPickerId,
          DTime: this.state.DTime,
          Department: this.state.Department,
          Gender: this.state.Gender,

        }).then((data)=>{
          console.log("item is created successfully");
          return data;
        }).catch((err)=>{
          console.log("Erorr occurred");
          throw err;
        });
      });
    alert("User " + this.state.Title + " is added successfully");
    this.setState({ Title: "", Address: "", Age: 0, PPLPicker: "", DTime: "", Gender: "", Department: "" });
    this.FetchData();
  }
  // Cancel the operation when the user cancel
  private onCancelClick = () => {
    this.setState({ showDialog: false });
  }
  // private onTitleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
  //   this.setState({ Title: newValue || "" });
  // }
  // private onDescriptionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
  //   this.setState({ Address: newValue || "" });
  // }
  // People Picker Items
  public _getPeoplePickerItems = (items: any[]) => {
    if (items.length > 0) {
      this.setState({ PPLPicker: items[0].text, PPLPickerId: items[0].id });
    }
    else {
      this.setState({ PPLPicker: "", PPLPickerId: "" })
    }
  }
  //Date Method
  private _OndateChange = (datechange: any) => {
    this.setState({ DTime: datechange })
  }
  private _DepartmentChoice = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    this.setState({ Department: option?.key as string || "" });
  }
  private GenderChoice = (event: React.FormEvent<HTMLDivElement>, option?: IChoiceGroupOption) => {
    this.setState({ Gender: option?.key });
  }
  public render(): React.ReactElement<IDialogFormProps> {

    return (
 <>
  <form>
      <Stack tokens={stackTokens} horizontal>
      <Label>Employee Name:</Label>
      <TextField value={this.state.Title}  onChange={
      (ev,evchance)=>this.setState({Title:evchance})
      }
      required={true} style={{width:"200"}}/>
      <Label>Employee Age:</Label>
      <TextField value={this.state.Age} onChange={
        (ev,evchange)=>this.setState({Age:evchange}) 
      }
      required={true} style={{width:"200"}}/>
      </Stack>
      <Label>Employee Address:</Label>
      <TextField value={this.state.Address}   onChange={
      (ev,evchance)=>this.setState({Address:evchance})
      }
      required={true} multiline rows={5}/>
      <Label>Reporting Manager</Label>
      <PeoplePicker
      context={this.props.context as any}
      personSelectionLimit={1}
      showtooltip={true}
      required={false}
      resolveDelay={1000}
      principalTypes={[PrincipalType.User]}
      defaultSelectedUsers={[this.state.PPLPicker?this.state.PPLPicker:""]}
      ensureUser={true}
      onChange={this._getPeoplePickerItems}
      />
      <Label>Joining Date</Label>
      <DateTimePicker dateConvention={DateConvention.Date}
      onChange={this._OndateChange}/>
      <Label>Department</Label>
      <Dropdown placeholder='Select an option'
      options={[
        {key:"Information Technology",text:"Information Technology"},
        {key:"Human Resource",text:"Human Resource"},
        {key:"Finance",text:"Finance"}
      ]}
      selectedKey={this.state.Department}
      onChange={this._DepartmentChoice}/>
      <Label>Gender</Label>
      <ChoiceGroup options={[
        {key:"Male",text:"Male"},
        {key:"Female",text:"Female"}
      ]}
      selectedKey={this.state.Gender}
onChange={this.GenderChoice}      />
      <br/>
      <PrimaryButton text="Submit" type="Save" onClick={()=>this.CreatedItems()}/>
     </form>
     {/* Confirmation Dialog*/}
     <Dialog hidden={!this.state.showDialog}
onDismiss={this.onCancelClick}
dialogContentProps={{
  type:DialogType.normal,
  title:'Confirmation',
  subText:'Do you want to save the data?'
}}
modalProps={{
  isBlocking:true,
  styles:{main:{maxWidth:450}}
}}
>
  <DialogFooter>
    <PrimaryButton text="Save" onClick={this.onSaveClick}/> &nbsps; &nbsp;&nbsp;
    <PrimaryButton text="Cancel" onClick={this.onCancelClick}/>
  </DialogFooter>

     </Dialog>
 </>
    );
  }
}
