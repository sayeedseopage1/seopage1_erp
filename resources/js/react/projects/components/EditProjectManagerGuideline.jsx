import _ from "lodash";
import React from "react";
import { toast } from "react-toastify";
import CKEditorComponent from "../../ckeditor";
import { useUpdateProjectGuidelineMutation } from "../../services/api/projectApiSlice";
import Button from "../../tasks/components/Button";
import Modal from "../../tasks/components/Modal";
import SubmitButton from "../../tasks/components/SubmitButton";
import Input from "../../tasks/components/form/Input";
import Switch from '../../global/Switch';
import validator from 'validator';


const EditProjectManagerGuideline = ({ isOpen, close, data, openTaskForm, projectId }) => {
    const [themeDetails, setThemeDetails] = React.useState("");
    const [themeName, setThemeName] = React.useState('no');
    const [themeUrl, setThemeUrl] = React.useState("");
    const [designDetials, setDesignDetails] = React.useState('no');
    const [designFileType, setDesignFileType] = React.useState('--');
    const [xDOrFigmaFile, setXDorFigmaFile] = React.useState('');
    const [photoshopReferenceURL, setPhotoshopReferenceURL] = React.useState('');
    const [designRefURL, setDesignRefURL] = React.useState([{id: 'lgqsz', url: ''}]);
    const [designRefDescription, setDesignRefDescription] = React.useState('');
    const [plugin, setPlugin] = React.useState('no');
    const [pluginName, setPluginName] = React.useState('');
    const [pluginURL, setPluginURL] = React.useState('');
    const [pluginGoogleDrive, setPluginGoogleDrive] = React.useState('');
    const [pluginDescription, setPluginDescription] = React.useState('');
    const [colorSchema, setColorSchema] = React.useState('no');
    const [primaryColor, setPrimaryColor] = React.useState("#1D82F5");
    const [primaryColorDescription, setPrimaryColorDescription] = React.useState('');
    const [secondaryColors, setSecondaryColors] = React.useState([{
            id:'egqsz',
            color: '#1D82F5',
            description: '',
        }]);


   const [error, setError] = React.useState(null);

   const [updateProjectGuideline, { isLoading }] = useUpdateProjectGuidelineMutation();

   const [edit, setEdit] = React.useState({
    theme_details: false,
    design_details: false,
    color_schema: false,
    plugin_research: false,
   });

    //   handle input change
    const onChange = (e, setState) => {
        setState(e.target.value);
    };


    // add secondary color
    const addSecondaryColor = (e) => {
        e.stopPropagation();
        setSecondaryColors(prev => [...prev, {
            id: (Math.random() + 1).toString(36).substring(7),
            color: '#1D82F5',
            description: '',
        }])
    }

    // handle secondary color change
    const handleSecondaryColorChange = (e, id) => {
        let newColors = _.map(secondaryColors, item => item?.id === id ? {id, color: e.target.value, description: ''} : item);
        setSecondaryColors([...newColors])
    }

    // handle secondary color description change
    const handleSecondaryColorDescriptionChange = (e, editor, id) => {
        let text = editor.getData();
        let newColors = _.map(secondaryColors, item => item?.id === id ? {...item, description: text} : item);
        setSecondaryColors([...newColors])
    }

    // remove secondary color
    const removeSecondaryColor = (e, id) => {
        let newColors = _.filter(secondaryColors, item => item?.id !== id);
        setSecondaryColors([...newColors])
    }


    // add new ref url instance
    const addDesignRefURL = (e) => {
        e.stopPropagation();

        setDesignRefURL(prev => [...prev, {
                id: (Math.random() + 1).toString(36).substring(7),
                url: ''
            }])
    }

    // handle on chagne ref url
    const handleRefUrlChange = (e, id) =>{
        let newRef = _.map(designRefURL, item => (
            item.id === id ? {id, url: e.target.value} : item
        ))

        setDesignRefURL([...newRef]);
    }

    // remove design ref
    const removeDesignRef = (e, id) => {
        e.stopPropagation();
        let newRef = _.filter(designRefURL, item => item?.id !== id);
        setDesignRefURL([...newRef])
    }


    const themeDetailsAuthorized = () => {
        const d =  _.find(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'theme_details');

        return data?.theme_details === 1 || d?.status === 1;
    }

    const designDetailsAuthorized = () => {
        const d =  _.find(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'design_details');
        return data?.design_details === 1 || d?.status === 1;
    }


    const colorSchemaAuthorized = () => {
        const d =  _.find(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'color_schema');
        return data?.color_schema === 1 || d?.status === 1;
    }


    const pluginResearchAuthorized = () => {
        const d =  _.find(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'plugin_research');
        return data?.plugin_research === 1 || d?.status === 1;
    }

    //

    const themeDetailsAuthorizedStatus = () => {
        const index = _.findIndex(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'theme_details');

        if(data?.theme_details === 1) {
            return <span className="badge badge-success"> Approved </span>
        }else if(index !== -1){
            const d = data?.pm_task_guideline_authorization[index];
            let status = d?.status;
            if(Number(status) === 2){
                return(
                    <>
                        <span className="badge badge-warning"> Rejected </span>
                        <button
                            onClick={() => setEdit(prev => ({...prev, theme_details: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button> 
                    </>
                )
            }else if(Number(status) === 0){
                return(
                    <>
                        <span className="badge badge-warning"> Pending </span>
                        <button
                            onClick={() => setEdit(prev => ({...prev, theme_details: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button> 
                    </>
                )
            }else if(Number(status) === 1) {
                return <span className="badge badge-success"> Approved </span>
            }
        }
    }

    const designDetailsAuthorizedStatus = () => {
        const index = _.findIndex(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'design_details')

        if(data?.design_details === 1) {
            return <span className="badge badge-success"> Approved </span>
        }else if(index !== -1){
            const d = data?.pm_task_guideline_authorization[index];
            let status = d?.status;
            if(Number(status) === 2){
                return (
                    <>
                        <span className="badge badge-warning"> Rejected </span>
                        <button
                            onClick={() => setEdit(prev => ({...prev, design_details: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button>
                    </>
                )
            }else if(Number(status) === 0){
                return (
                    <>
                        <span className="badge badge-warning"> Pending </span>
                        <button
                            onClick={() => setEdit(prev => ({...prev, design_details: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button>
                    </>
                )
            }else if(Number(status) === 1) {
                return <span className="badge badge-success"> Approved </span>
            }
        }
    }


    const colorSchemaAuthorizedStatus = () => {
        const index =  _.findIndex(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'color_schema')

        if(data?.color_schema === 1) {
            return <span className="badge badge-success"> Approved </span>
        }else if(index !== -1){
            const d = data?.pm_task_guideline_authorization[index];
            let status = d?.status;
            if(Number(status) === 2){
                return(
                    <>
                        <span className="badge badge-warning"> Rejected </span> 
                        <button
                            onClick={() => setEdit(prev => ({...prev, color_schema: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button> 
                    </>
                ) 

            }else if(Number(status) === 0){
                return (
                    <>
                        <span className="badge badge-warning"> Pending </span>
                        <button
                            onClick={() => setEdit(prev => ({...prev, color_schema: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button>  
                    </>
                )
            }else if(Number(status) === 1) {
                return <span className="badge badge-success"> Approved </span>
            }
        }
    }

    const pluginResearchAuthorizedStatus = () => {
        const index =  _.findIndex(data?.pm_task_guideline_authorization, d => _.replace(_.lowerCase(d?.name), /\s+/g, '_') === 'plugin_research')

        if(data?.plugin_research === 1) {
            return <span className="badge badge-success"> Approved </span>
        }else if(index !== -1){
            const d = data?.pm_task_guideline_authorization[index];
            let status = d?.status;
            if(Number(status) === 2){
                return(
                    <>
                        <span className="badge badge-warning"> Rejected </span>
                        <button
                            onClick={() => setEdit(prev => ({...prev, plugin_research: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button>
                    </>
                ) 
            }else if(Number(status) === 0){
                return(
                    <>
                        <span className="badge badge-warning"> Pending </span>
                        <button
                            onClick={() => setEdit(prev => ({...prev, plugin_research: true}))}
                            className="badge badge-secondary ml-1"
                        >
                            Edit
                        </button>
                    </>
                ) 
                 
            }else if(Number(status) === 1) {
                return <span className="badge badge-success"> Approved </span>
            }
        }
    }




    // validation
    const isValide = () => {
        var count = 0;
        const err = new Object();

        function isURL(value) {
            return validator.isURL(value);
          }

          if(!themeDetailsAuthorized() && edit.theme_details){
            // theme details validation
            if(themeDetails === ''){
                err.themeDetails = 'You Need to Select An Option';
                count++;
            }
            if(themeDetails === 'yes'){
                if(themeName === ''){
                    err.themeName = "You Have to Provide a Theme Name!",
                    count++;
                }

                if(themeUrl === ''){
                    err.themeUrl = "You Have to Provide a Theme URL"
                    count++;
                }else if(!isURL(themeUrl)){
                    err.themeUrl = "Provided Value Must Be an URL!"
                    count++;
                }
            }
          }



        // design details
       if(!designDetailsAuthorized && edit.design_details){
        if(designDetials === ''){
            err.designDetials = 'You Need to Select An Option';
            count++;
        }

        if(designDetials === 'yes'){
            if(designFileType === '' || designFileType === '--' ){
                err.designFileType = 'Select a Design Reference Type'
                count++;
            }else{
                if(designFileType === 'XD/Figma'){
                    if(xDOrFigmaFile === ''){
                        err.xdFigma = "You Have to Provide Reference Link!"
                        count++;
                    }else if(!isURL(xDOrFigmaFile)){
                        err.xdFigma = "Provided Value Must Be an URL!"
                        count++;
                    }
                }else if(designFileType === 'Photoshop'){
                    if(photoshopReferenceURL === ''){
                        err.photoshop = "You Have to Provide Reference Link!"
                        count++;
                    }else if(!isURL(photoshopReferenceURL)){
                        err.photoshop = "Provided Value Must Be an URL!"
                        count++;
                    }
                }else if(designFileType === 'The Reference Site That Has to Be Clone'){
                    _.map(designRefURL, item => {
                        if(item.url === ''){
                            err.designRef = "You Have to Provide Reference Link!"
                            count++;
                        }else if(!isURL(item.url)){
                            err.designRef = "Provided Value Must Be an URL!"
                            count++;
                        }
                    })

                    if(designRefDescription === ''){
                        err.designRefDescripton = "You have to Provide Instruction!"
                        count++;
                    }
                }
            }
        }
       }

        // color schema

        if(!colorSchemaAuthorized() && edit.color_schema){
            if(colorSchema === ''){
                err.colorSchema = 'You Need to Select An Option';
                count++;
            }
            if(colorSchema === 'yes'){
                if(primaryColorDescription === ''){
                    err.pColorDesc = "You Have to Provide This Field!"
                    count++;
                }

                _.map(secondaryColors, item => {
                    if(item.description === ''){
                        err.sDescription = "You Have to Provide This Field!"
                        count++;
                    }
                })
            }
        }



        // plugin
        if(!pluginResearchAuthorized() && edit.plugin_research){
            if(plugin === ''){
                err.plugin = 'You Need to Select An Option';
                count++;
            }

            if(plugin==='yes'){
                if(pluginName === '') {
                    err.pluginName = "You Have to Provide Plugin Name";
                    count++;
                }

                if(pluginURL === ''){
                    err.pluginURL = "You Have to Provide Plugin URL";
                    count++;
                }else if(!isURL(pluginURL)){
                    err.pluginURL = "Provided Value Must Be an URL!"
                    count++;
                }

                if(pluginGoogleDrive === '') {
                    err.pluginGoogleDrive = "You Have to Provide Plugin Google Drive URL"
                    count++;
                }else if(!isURL(pluginGoogleDrive)){
                    err.pluginGoogleDrive = "Provided Value Must Be an URL!"
                    count++;
                }

                if(pluginDescription === '') {
                    err.pluginDescription = "You Have to Provide Instruction of This Plugin!"
                    count++;
                }
            }
        }
        setError({...err});
        return !count;
    }


    // handle submti
    const handleSubmit =  async (e) => {
        e.preventDefault();
        let formData = {
            project_id: data?.project_id,
            id: data?.pm_task_guideline_authorization[0]?.task_guideline_id,
            pm_task_guideline_authorization: data?.pm_task_guideline_authorization
        };

        if(!themeDetailsAuthorized() && edit.theme_details){
            formData = {
                ...formData,
                project_id: projectId,
                theme_details: themeDetails === "yes" ? 1 : 0,
                theme_name: themeName,
                theme_url: themeUrl
            }
        }

        if(!designDetailsAuthorized() && edit.design_details){
            formData = {
                ...formData,
                design_details: designDetials === 'yes' ? 1 : 0,
                design: designFileType === '--' ? null : designFileType,
                xd_url: xDOrFigmaFile,
                drive_url: photoshopReferenceURL,
                reference_link: _.compact(_.map(designRefURL, item => item.url)),
                instruction: designRefDescription,
            }
        }

        if(!pluginResearchAuthorized() && edit.plugin_research){
            formData = {
                ...formData,
                plugin_research: plugin === "yes" ? 1 : 0,
                plugin_name: pluginName,
                plugin_url: pluginURL,
                google_drive_link: pluginGoogleDrive,
                instruction_plugin: pluginDescription,

            }
        }

        if(!colorSchemaAuthorized() && edit.color_schema){
            formData = {
                ...formData,
                color_schema: colorSchema === "yes" ? 1 : 0,
                primary_color: primaryColor,
                primary_color_description: primaryColorDescription,
                color: _.compact(_.map(secondaryColors, item => item.color)),
                color_description: _.compact(_.map(secondaryColors, item => item.description))
            }
        }


        if(isValide()){
            await updateProjectGuideline(formData)
            .unwrap()
            .then(res => { 
                toast.success('Task Guideline Update Successfully');
                close();
            })
            .catch(err => console.log(err));
        }
    }

 

    return (
        <React.Fragment>
            <Modal isOpen={isOpen}>
                <div className="sp1_modal-content-wrapper">
                    <div className="sp1_modal-panel sp1_task_create_modal_panel w-100">
                        {/* header */}
                        <div className="sp1_modal-head">
                            <div className="sp1_modal-title">
                                <strong>Provide Design Reference</strong>
                            </div>
                            <Button
                                onClick={close}
                                aria-label="ModalClose"
                                variant="tertiary"
                                className="sp1_modal-close"
                            >
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </div>
                        {/* end header */}

                        {/* body */}
                        <div className="sp1_modal-body sp1_task_create_modal_body">
                            <div className="d-flex align-items-center justify-content-center">
                                <h5>Provide Design Reference</h5>
                            </div>

                            <Switch>
                                {/* form */}
                            <div className="py-4 px-3">
                                {/* theme details */}
                                <Switch.Case condition={data?.task_category?.toLowerCase() !== 'design'}>
                                    <React.Fragment>
                                        <div className="form-group">
                                            <label
                                                htmlFor=""
                                                className="font-weight-bold"
                                                style={{ color: "#808080" }}
                                            >
                                                <span className="mr-1">1. Theme Details</span>
                                                {themeDetailsAuthorized() ?
                                                    <span className="badge badge-success mr-1"> Approved </span> :
                                                    <>
                                                        {themeDetailsAuthorizedStatus()}
                                                    
                                                    </>
                                                }
                                            </label>
                                            {
                                                edit?.theme_details &&
                                                <>
                                                    <div className="d-block pl-3">
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                type="radio"
                                                                name="theme_details"
                                                                className="form-check-input"
                                                                id="themeDetailsYes"
                                                                value="yes"
                                                                onChange={(e) =>
                                                                    onChange(e, setThemeDetails)
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="themeDetailsYes"
                                                            >
                                                                Yes
                                                            </label>
                                                        </div>

                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                type="radio"
                                                                name="theme_details"
                                                                className="form-check-input"
                                                                id="themeDetailsNo"
                                                                defaultChecked={true}
                                                                value="no"
                                                                onChange={(e) =>
                                                                    onChange( e, setThemeDetails )
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="themeDetailsNo"
                                                            >
                                                                No
                                                            </label>
                                                        </div>

                                                        {error?.themeDetails && <div className='' style={{color: 'red'}}> {error?.themeDetails} </div>}
                                                    </div>
                                                    {themeDetails === "yes" && (
                                                        <div className="mx-3">
                                                            <div className="row">
                                                                <div className="col-12 col-md-6">
                                                                    <Input
                                                                        label="Theme Name"
                                                                        placeholder="Write Theme Name"
                                                                        value={themeName}
                                                                        onChange={(e) =>
                                                                            onChange(e, setThemeName)
                                                                        }
                                                                        error={error?.themeName}
                                                                    />
                                                                </div>

                                                                <div className="col-12 col-md-6">
                                                                    <Input
                                                                        label="Theme URL"
                                                                        placeholder="Enter Theme URL"
                                                                        value={themeUrl}
                                                                        onChange={(e) =>
                                                                            onChange( e, setThemeUrl)
                                                                        }
                                                                        error={error?.themeUrl}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            }
                                        </div>
                                    </React.Fragment>
                                </Switch.Case>
                                {/* end theme details */}

                                {/* design Provide */}
                                <React.Fragment>
                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            className="font-weight-bold"
                                            style={{ color: "#808080" }}
                                        >
                                            <span className="mr-1">2. Design Details </span>
                                            {designDetailsAuthorized() ?
                                                <span className="badge badge-success mr-1"> Approved </span> :
                                                <>
                                                   {designDetailsAuthorizedStatus()}
                                                    
                                                </>
                                            }
                                        </label>

                                        {edit?.design_details &&
                                            <React.Fragment>
                                                <div className="d-block pl-3">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            name="design_details"
                                                            className="form-check-input"
                                                            id="designDetailsYes"
                                                            value="yes"
                                                            onChange={(e) =>{
                                                                setXDorFigmaFile('');
                                                                setPhotoshopReferenceURL('');
                                                                setDesignRefURL([{id: 'lgqsz', url: ''}]);
                                                                onChange(e, setDesignDetails)
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="designDetailsYes"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            name="design_details"
                                                            className="form-check-input"
                                                            id="designDetailsNo"
                                                            value="no"
                                                            defaultChecked={true}
                                                            onChange={(e) =>{
                                                                setXDorFigmaFile('');
                                                                setPhotoshopReferenceURL('');
                                                                setDesignRefURL([{id: 'lgqsz', url: ''}])
                                                                onChange(e, setDesignDetails)
                                                            }}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="designDetailsNo"
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                    {error?.designDetials && <div className='' style={{color: 'red'}}> {error?.designDetials} </div>}
                                                </div>

                                                {
                                                    designDetials === 'yes' &&
                                                    <div className="px-3">
                                                        <div className="form-group mt-2">
                                                            <label htmlFor="exampleFormControlSelect1">Select Design Reference Type<sup>*</sup></label>
                                                            <select
                                                                className="form-control py-2"
                                                                value={designFileType}
                                                                onChange={e => {
                                                                    setXDorFigmaFile('');
                                                                    setPhotoshopReferenceURL('');
                                                                    setDesignRefURL([{id: 'lgqsz', url: ''}])
                                                                    onChange(e, setDesignFileType)
                                                                }}
                                                                id="exampleFormControlSelect1"
                                                            >
                                                                <option value="--" disabled>--</option>
                                                                <option value="XD/Figma">XD/Figma</option>
                                                                <option value="Photoshop">Photoshop</option>
                                                                <option value="The Reference Site That Has to Be Clone">The Reference Site That Has To Be Clone</option>
                                                            </select>
                                                            {error?.designFileType && <div className='' style={{color: 'red'}}> {error?.designFileType} </div>}
                                                        </div>
                                                    </div>
                                                }

                                                {/* if design type xd or figma */}
                                                {
                                                    designFileType === 'XD/Figma' &&
                                                    <div className="px-3">
                                                        <div className="form-group">
                                                            <Input
                                                                label="XD/Figma File URL"
                                                                error={error?.xdFigma}
                                                                placeholder="Provide the XD/Figma File URL"
                                                                required={true}
                                                                value={xDOrFigmaFile}
                                                                onChange={e => onChange(e, setXDorFigmaFile)}
                                                            />
                                                        </div>
                                                    </div>
                                                }

                                                {/* if design type Photoshop*/}
                                                {
                                                    designFileType === 'Photoshop' &&
                                                    <div className="px-3">
                                                        <div className="form-group">
                                                            <Input
                                                                label="Input Google Drive File / Folder URL"
                                                                placeholder="Input Google Drive File / Folder URL"
                                                                required={true}
                                                                error={error?.photoshop}
                                                                value={photoshopReferenceURL}
                                                                onChange={e => onChange(e, setPhotoshopReferenceURL)}
                                                            />
                                                        </div>
                                                    </div>
                                                }

                                                {/* if design type Photoshop*/}
                                                {
                                                    designFileType === 'The Reference Site That Has to Be Clone' &&
                                                    <div className="mx-3 p-3" style={{background: '#F9F9F9', borderRadius: '10px'}}>
                                                        <div className="form-group">
                                                            {
                                                                _.map(designRefURL, item => (
                                                                    <div key={item.id} className="multipleInputItem">
                                                                        <Input
                                                                            label="Reference URL"
                                                                            placeholder="Reference URL"
                                                                            required={true}
                                                                            error={error?.designRef}
                                                                            value={item.url}
                                                                            onChange={e => handleRefUrlChange(e, item.id)}
                                                                        />
                                                                        {
                                                                            _.size(designRefURL) > 1 &&
                                                                            <button aria-label="RemoveLink" onClick={e => removeDesignRef(e, item.id)} type="button" className="multipleInputItemButton" >
                                                                                <i className="fa-solid fa-trash-can" />
                                                                            </button>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }

                                                            <button type="button" onClick={addDesignRefURL} className="bg-transparent text-primary hover-underline">+ Another Reference URL</button>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="ckeditor">Add Instraction<sup>*</sup></label>
                                                            <div className="ck-editor-holder">
                                                                <CKEditorComponent
                                                                    onChange={(e, editor) => (
                                                                        setDesignRefDescription(editor.getData())
                                                                    )}
                                                                />
                                                            </div>
                                                        {error?.designRefDescripton && <div className='' style={{color: 'red'}}> {error?.designRefDescripton} </div>}
                                                        </div>
                                                    </div>
                                                }
                                            </React.Fragment>
                                        }
                                        </div>
                                </React.Fragment>
                                {/* end design provide */}


                                {/* color schema */}
                                <div className="form-group">
                                        <label
                                            htmlFor=""
                                            className="font-weight-bold"
                                            style={{ color: "#808080" }}
                                        >
                                            <span className="mr-1">3. Color Scheme</span>
                                            {colorSchemaAuthorized() ?
                                                <span className="badge badge-success mr-1"> Approved </span> :
                                                <>
                                                    {colorSchemaAuthorizedStatus()}
                                                    
                                                </>
                                            }
                                        </label>
                                        {edit?.color_schema &&
                                            <React.Fragment>
                                                <div className="d-block pl-3">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    name="color_schema"
                                                    className="form-check-input"
                                                    id="colorSchemaYes"
                                                    value="yes"
                                                    onChange={(e) =>
                                                        onChange(e, setColorSchema)
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="colorSchemaYes"
                                                >
                                                    Yes
                                                </label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    name="color_schema"
                                                    className="form-check-input"
                                                    id="colorSchemaNo"
                                                    value="no"
                                                    defaultChecked={true}
                                                    onChange={(e) =>
                                                        onChange(e, setColorSchema)
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="colorSchemaNo"
                                                >
                                                    No
                                                </label>
                                            </div>
                                            {error?.colorSchema && <div className='' style={{color: 'red'}}> {error?.colorSchema} </div>}
                                        </div>


                                        {
                                            colorSchema === 'yes' &&
                                            <React.Fragment>
                                                {/* priamry color */}
                                                 <div className="mt-3 mx-3 p-3" style={{background: '#F9F9F9', borderRadius: '10px'}}>
                                                    <div className="form-group">
                                                        <label htmlFor="" className="mb-2" style={{fontWeight: 600, color: "#777"}}>1. Primary Color <sup>*</sup> </label>

                                                        <div className="form-group px-2">
                                                            <label htmlFor="">Choose Color:</label>
                                                            <div className="input-group mb-3 col-12 col-md-6">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Recipient's username"
                                                                    aria-label="Recipient's username"
                                                                    aria-describedby="basic-addon2"
                                                                    value={primaryColor}
                                                                    onChange={e => onChange(e, setPrimaryColor)}
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text px-1 border-0" id="basic-addon2">
                                                                        <input type="color" value={primaryColor} onChange={e => onChange(e, setPrimaryColor)} style={{width: '32px', border: 'none'}}/>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group pl-2">
                                                            <label htmlFor="">Where Should Developer Use this Color <sup>*</sup></label>
                                                            <div className="ck-editor-holder">
                                                                <CKEditorComponent
                                                                    onChange={(e, editor) => (
                                                                        setPrimaryColorDescription(editor.getData())
                                                                    )}
                                                                />
                                                            </div>

                                                            {error?.pColorDesc && <div className='' style={{color: 'red'}}> {error?.pColorDesc} </div>}
                                                        </div>
                                                    </div>
                                                </div>



                                                {/* secondary color */}
                                                <div className="mt-3 mx-3 p-3" style={{background: '#F9F9F9', borderRadius: '10px'}}>
                                                    <div className="form-group">
                                                        <label htmlFor="" className="mb-2" style={{fontWeight: 600, color: "#777"}}>2. Secondary Color <sup>*</sup> </label>

                                                        {
                                                            _.map(secondaryColors, (item, index) => (
                                                                <div className="p-3" key={item.id}>
                                                                    <div className="form-group">
                                                                        <label htmlFor=""><b>{index + 1}.</b> Choose Color:</label>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="input-group mb-3 pl-3 col-10 col-md-6">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Recipient's username"
                                                                                    aria-label="Recipient's username"
                                                                                    aria-describedby="basic-addon2"
                                                                                    value={item.color}
                                                                                    onChange={e => handleSecondaryColorChange(e, item.id)}
                                                                                />

                                                                                <div className="input-group-append">
                                                                                    <span className="input-group-text px-1 border-0" id="basic-addon2">
                                                                                        <input
                                                                                            type="color"
                                                                                            value={item.color}
                                                                                            onChange={e => handleSecondaryColorChange(e, item.id)}
                                                                                            style={{width: '32px', border: 'none'}}
                                                                                        />
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            {
                                                                                _.size(secondaryColors) > 1 &&
                                                                                <button aria-label="remove" onClick={e => removeSecondaryColor(e, item.id)} className="py-2 px-3 ml-auto rounded color_remove_btn">
                                                                                    <i className="fa-solid fa-trash-can"/>
                                                                                </button>
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group pl-3">
                                                                        <label htmlFor="">Where Should Developer Use this Color <sup>*</sup></label>
                                                                        <div className="ck-editor-holder">
                                                                            <CKEditorComponent onChange={(e, editor) => handleSecondaryColorDescriptionChange(e, editor, item.id)} />
                                                                        </div>

                                                                        {error?.sDescription && <div className='' style={{color: 'red'}}> {error?.sDescription} </div>}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

                                                        <div className="d-flex align-items-center px-3">
                                                            <button
                                                                type="button"
                                                                onClick={addSecondaryColor}
                                                                className="bg-transparent text-primary hover-underline ml-auto"
                                                            >+ Another Color</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        }
                                            </React.Fragment>
                                        }
                                    </div>
                                {/* end color schema */}

                                {/* Plugin Research */}
                                    <Switch.Case condition={data?.task_category?.toLowerCase() !== 'design'}>
                                        <div className="form-group">
                                            <label
                                                htmlFor=""
                                                className="font-weight-bold"
                                                style={{ color: "#808080" }}
                                            >
                                                <span className="mr-1">4. Plugin Research</span>
                                                {pluginResearchAuthorized() ?
                                                    <span className="badge badge-success mr-1"> Approved </span> :
                                                    <>
                                                        {pluginResearchAuthorizedStatus()} 
                                                    </>
                                                }
                                            </label>

                                            {edit.plugin_research && <React.Fragment>
                                                <div className="d-block pl-3">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            name="plugin"
                                                            className="form-check-input"
                                                            id="pluginYes"
                                                            value="yes"
                                                            onChange={(e) =>
                                                                onChange(e, setPlugin)
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="pluginYes"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            name="plugin"
                                                            className="form-check-input"
                                                            id="pluginNo"
                                                            value="no"
                                                            defaultChecked={true}
                                                            onChange={(e) =>
                                                                onChange(e, setPlugin)
                                                            }
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="pluginNo"
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                    {error?.plugin && <div className='' style={{color: 'red'}}> {error?.plugin} </div>}
                                                </div>

                                                {
                                                    plugin === 'yes' &&
                                                    <div className="mt-3 mx-3 p-3" style={{background: '#F9F9F9', borderRadius: '10px'}}>
                                                        <div className="row">
                                                            <div className="col-12 col-md-4">
                                                                <Input
                                                                    label="Plugin Name"
                                                                    required={true}
                                                                    placeholder="Enter Plugin Name"
                                                                    value={pluginName}
                                                                    onChange={e => onChange(e, setPluginName)}
                                                                    error={error?.pluginName}
                                                                />

                                                            </div>
                                                            <div className="col-12 col-md-4">
                                                                <Input
                                                                    label="Plugin URL"
                                                                    required={true}
                                                                    placeholder="Enter Plugin URL"
                                                                    error={error?.pluginURL}
                                                                    value={pluginURL}
                                                                    onChange={e => onChange(e, setPluginURL)}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-md-4">
                                                                <Input
                                                                    label="Share Google Drive Link"
                                                                    required={true}
                                                                    error={error?.pluginGoogleDrive}
                                                                    placeholder="Share Google Drive Link"
                                                                    value={pluginGoogleDrive}
                                                                    onChange={e => onChange(e, setPluginGoogleDrive)}
                                                                />
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="">Write Instruction for Using This Plugin</label>
                                                                    <div className="ck-editor-holder">
                                                                        <CKEditorComponent onChange={(e, editor) => setPluginDescription(editor.getData())} />
                                                                    </div>

                                                                    {error?.pluginDescription && <div className='' style={{color: 'red'}}> {error?.pluginDescription} </div>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </React.Fragment>
                                            }
                                        </div>
                                    </Switch.Case>
                                {/* End Plugin Research */}


                                <div className="d-flex align-items-center justify-content-end">
                                    <Button onClick={close} variant="tertiary" className="mr-2">
                                        Close
                                    </Button>
                                   {!_.isEmpty(_.pickBy(edit, Boolean)) &&
                                    <SubmitButton
                                        title="Update"
                                        onClick={handleSubmit}
                                        isLoading={isLoading}
                                    />
                                   }
                                </div>
                            </div>
                            </Switch>
                        </div>
                        {/* end body */}
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default EditProjectManagerGuideline;
