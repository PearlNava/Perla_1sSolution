import * as React from 'react';
// import styles from './SimpleForm.module.scss';
import { ISimpleFormProps } from './ISimpleFormProps';
import { ISimpleFormState } from './ISimpleState';
import "@pnp/sp/lists"; //It is for taking Lists Name
import "@pnp/sp/items"; //It is for taking Items Inside the list
import {Web, sp} from "@pnp/sp/presets/all"; //This is defining web url
import { Dialog } from '@microsoft/sp-dialog'; ///This is for dialog
import { PeoplePicker,PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { DateConvention, DateTimePicker } from '@pnp/spfx-controls-react/lib/DateTimePicker';;
import { ChoiceGroup, Dropdown, IChoiceGroupOption, IDropdownOption, IStackTokens, Label, PrimaryButton, Stack, TextField } from 'office-ui-fabric-react';
const stackTokens:IStackTokens={
  childrenGap:15
}
export default class SimpleForm extends React.Component<ISimpleFormProps, ISimpleFormState> {
  //Constructor
  constructor(props:ISimpleFormProps){
    super(props); ///In order to call Parents Component
    // CSOM Client side Object Model
    sp.setup({
      spfxContext:this.context 
    });
    // Setting up the initial value of state
    this.state={
      IListItems:[],
      Title:"",
      Address:"",
      Age:0,
      PPLPicker:"",
      PPLPickerId:0,
      DTime:"",
      Department: "",
      Gender: "",
      showDialog:false
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
  //Create Data Method

  public async CreateData(){
    const web=Web(this.props.siteurl);
    await web.lists.getByTitle("SimpleTest").items.add({
      Title:this.state.Title,
      Age:this.state.Age,
      Address:this.state.Address,
      PPLPickerId:this.state.PPLPickerId,
      DTime:this.state.DTime,
      Department:this.state.Department,
      Gender: this.state.Gender
    }).then(i=>{
      console.log("Item created successfully",i);
    }).catch(err=>{
      console.log("error occurred",err);
    });
    Dialog.alert(this.state.Title+" Data is created successfully");
    this.setState({Title:"",Address:"",Age:0,PPLPicker:"",DTime:""});
    this.FetchData();
  }
  // People Picker Items
  public _getPeoplePickerItems=(items:any[])=>{
if(items.length>0){
  this.setState({PPLPicker:items[0].text,PPLPickerId:items[0].id});
}
else{
  this.setState({PPLPicker:"",PPLPickerId:""})
}
  }
//Date Method
  private _OndateChange=(datechange:any)=>{
this.setState({DTime:datechange})
  }
  private _DepartmentChoice=(event:React.FormEvent<HTMLDivElement>,option?:IDropdownOption)=>{
this.setState({Department:option?.key as string ||""});
  }
  
  private GenderChoice=(event:React.FormEvent<HTMLDivElement>,option?:IChoiceGroupOption)=>{
    this.setState({Gender:option?.key });
      }

  public render(): React.ReactElement<ISimpleFormProps> {


    return (
     <>
     <form>
      <Stack tokens={stackTokens} horizontal>
      <Label>Employee Name:</Label>
      <TextField value={this.state.Title}  onChange={
        (ev,evchange)=>this.setState({Title:evchange}) 
      }
      required={true} style={{width:"200"}}/>
      <Label>Employee Age:</Label>
      <TextField value={this.state.Age} onChange={
        (ev,evchange)=>this.setState({Age:evchange}) 
      }
      required={true} style={{width:"200"}}/>
      </Stack>
      <Label>Employee Address:</Label>
      <TextField value={this.state.Address}  onChange={
        (ev,evchange)=>this.setState({Address:evchange}) 
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
      <PrimaryButton text="Save" onClick={()=>this.CreateData()}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <PrimaryButton text="Cancel" onClick={()=>this._resetData()}/>
     </form>
     </>
    );
  }
  private _resetData=()=>{
    this.setState({Title:"",Age:0,Address:"",PPLPicker:"",DTime:"",Department:"",Gender:""})
  }
}
