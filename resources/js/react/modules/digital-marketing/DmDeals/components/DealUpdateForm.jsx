import * as React from 'react';
import { useCurrencyListQuery } from '../../../../services/api/currencyApiSlice'
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify'

// styled component
import {
  DialogPanelWrapper, SelectionMenuWrapper,
} from './ui/dealStyledComponent';
import { ErrorText, Input, InputGroup, Label, RadioInput, RadioLabel } from './ui/form';
import { Flex } from './table/ui';
import validator from 'validator'

// custom component
import Card from '../../../../global/Card';
import Button from '../../../../global/Button';
import Select from '../../../../global/Select';
import CKEditor from '../../../../ckeditor/index'
import { useDmDealUpdateMutation } from '../../../../services/api/dmDealApiSlice';
import { useDealContext } from './context/DealContext';
 

const DealUpdateForm = () => {
  const {
    isEditFormEnable,
    closeEditForm,
    editDealData
  } = useDealContext()

  return(
    <React.Fragment>
      <Dialog as="div" open={isEditFormEnable} onClose={() => null}>
        <DialogPanelWrapper>
          <Dialog.Panel className="dialog-panel">
            <DealUpdateFormControl close={closeEditForm} deal={editDealData} />
          </Dialog.Panel>
        </DialogPanelWrapper>
      </Dialog>
    </React.Fragment>
  )
}

 
export default DealUpdateForm;



// initial form data
const initialData = {
    client_username: '',
    client_name: '',
    project_name: '',
    project_link: '',
    project_type: '',
    amount: '',
    original_currency_id: '',
    description: '',
    comments: ''
}


// form 
const DealUpdateFormControl = ({close, deal}) => {
    const [formData, setFormData] = React.useState(initialData);
    const [error, setError] = React.useState(initialData);
    const [currency, setCurrency] = React.useState(null);

    // api hooks
    const {data: currencies} = useCurrencyListQuery();
    const [dealUpdate, { isLoading }] = useDmDealUpdateMutation(); 

    // initial deal data
    React.useEffect(() => { 

      const initialData = {
        client_username: deal?.client_username ?? '',
        client_name: deal?.client_name ?? '',
        project_name: deal?.project_name ?? '',
        project_link: deal?.project_link ?? '',
        project_type: deal?.project_type ?? '',
        amount: deal?.actual_amount ?? '',
        original_currency_id: deal?.currency_id ?? '',
        description: deal?.description ?? '',
        comments: deal?.comments ?? ''
      }
 
      const currency = currencies?.data?.find(c => Number(c.id) === Number(deal?.currency_id)); 
      setCurrency(currency) 
      setFormData(initialData);
    }, [deal, currencies])


    // control project type change
    React.useEffect(() => {
      if(formData.project_type === 'hourly'){
        setFormData(state => ({...state, amount: '', original_currency_id: '' }))
        setCurrency(null);
      }else{
        setFormData(state => ({
          ...state, 
          amount: deal?.actual_amount ?? '', 
          original_currency_id: deal?.currency_id ?? '' 
        }))

        const currency = currencies?.data?.find(c => Number(c.id) === Number(deal?.currency_id)); 
        setCurrency(currency) 
      }
    }, [formData.project_type])
    


    // input field change
    const handleInputChange = (e) => {
      setFormData(state => ({
        ...state,
        [e.target.name] : e.target.value
      }))
    }

    // rich editor field change
    
    const handleEditorDataChange = (editor, key) => {
      setFormData(state => ({
        ...state,
        [key]: editor.getData()
      }))
    }


    // handle submission
    const handleSubmit = async (e) => {
      e.preventDefault() 

      const isValid = () => {
        const _error = new Object();

        // check falsy data
        Object.keys(formData).map(key => {
          if(key === 'project_link'){
            if(!formData[key]) {
              _error[key] = "This Field is required!"
            }else if(!validator.isURL(formData[key])){
              _error[key] = "Invalid URL";
            }
          }else if(!formData[key]){
            _error[key] = "This Field is required!"
          }
        })

        // if project type hourly no need amount
        if(
            _error.hasOwnProperty('amount') && 
            formData.hasOwnProperty('project_type') && 
            formData['project_type'] === 'hourly'
        ){
          delete _error['amount'];
          delete _error['original_currency_id'];
        }

        

        setError(_error);
        return Object.keys(_error)?.length === 0;
      }


      if(!isValid()){
        toast.error("Please provide all required data!")
        return null;
      };

      try {
        const res = await dealUpdate({...formData, id: deal?.id}).unwrap();
        if(res.status === "success"){
          toast.success('Deal Updated Successfully');
          handleClose();
        }
      } catch (error) {
        console.log({error})
      }
    }


    // handle close form
    const handleClose = () => {
      setFormData({initialData});
      setCurrency(null);
      close();
    }

    // handle currencySelection 
    const handleCurrencySelection = (value) => {
      setCurrency(value)
      setFormData(state => ({...state, original_currency_id: value.id}))
    }

    // filter
    const getCurrencies = (data, query) => {
      return data?.filter(d => d?.currency_code?.toLowerCase()?.includes(query?.toLowerCase()))
    }
 
    return(
      <Card>
        <Card.Head onClose={handleClose}>
          Update Deal  
        </Card.Head>

        <Card.Body className="p-4 pb-0">
          <form>
            <div className='row'>
              {/* client username */}
              <div className="col-md-6">
                <InputGroup>
                  <Label> Client Username <sup>*</sup> :  </Label>
                  <Input
                    type='text'
                    name='client_username'
                    value={formData.client_username}
                    onChange={handleInputChange}
                    placeholder='Enter client username'
                  />
                  {error?.client_username && <ErrorText> {error?.client_username} </ErrorText>}
                </InputGroup>
              </div>

              {/* Client Name */}
              <div className="col-md-6">
                <InputGroup>
                  <Label> Client Name <sup>*</sup> :  </Label>
                  <Input
                    type='text'
                    name='client_name'
                    value={formData.client_name}
                    onChange={handleInputChange}
                    placeholder='Enter client name'
                  />
                    {error?.client_name && <ErrorText> {error?.client_name} </ErrorText>}
                </InputGroup>
              </div>

              {/* Project Name */}
              <div className="col-md-6">
                <InputGroup>
                  <Label> Project Name <sup>*</sup> :  </Label>
                  <Input
                    type='text'
                    name='project_name'
                    value={formData.project_name}
                    onChange={handleInputChange}
                    placeholder='Enter project name'
                  />
                  {error?.project_name && <ErrorText> {error?.project_name} </ErrorText>}
                </InputGroup>
              </div>

              
              {/* Project Link */}
              <div className="col-md-6">
                <InputGroup>
                  <Label> Project Link <sup>*</sup> :  </Label>
                  <Input
                    type='url'
                    name= 'project_link'
                    value={formData.project_link}
                    onChange={handleInputChange}
                    placeholder='Enter project link'
                  />
                  {error?.project_link && <ErrorText> {error?.project_link} </ErrorText>}
                </InputGroup>
              </div>


              {/* Project Type */}
              <div className="col-md-4">
                <InputGroup>
                  <Label> Project Type <sup>*</sup> :  </Label>
                  <Flex justifyContent="flex-start">
                    <RadioLabel>
                      <RadioInput 
                        type="radio" 
                        name="project_type" 
                        value="fixed" 
                        checked={formData.project_type === 'fixed'} 
                        onChange={handleInputChange} 
                      />
                      Fixed Project
                    </RadioLabel>

                    <RadioLabel> 
                      <RadioInput 
                        type="radio" 
                        name="project_type" 
                        value="hourly" 
                        checked={formData.project_type === 'hourly'} 
                        onChange={handleInputChange} 
                      />
                      Hourly Project
                    </RadioLabel>
                  </Flex>

                  
                  {error?.project_type && <ErrorText> {error?.project_type} </ErrorText>}
                </InputGroup>
              </div>


              {/* Project Budget */}
              <div className="col-md-4">
                <InputGroup>
                  <Label> Project Budget <sup>*</sup> :  </Label>
                  <Input
                    type='number'
                    name='amount'
                    disabled={formData.project_type === 'hourly'}
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder='Enter project Budget'
                  />
                  {error?.amount && <ErrorText> {error?.amount} </ErrorText>}
                </InputGroup>
              </div>

              {/* Currency */}
              <div className="col-md-4">
                <InputGroup>
                  <Label> Currency <sup>*</sup> :  </Label>
                  <SelectionMenuWrapper>
                    <Select 
                      value={currency} 
                      onChange={handleCurrencySelection} 
                      display={(value) => value?.currency_code ?? '--'}
                      className='selection'
                    >
                      <Select.Options>
                          <Select.SearchControllerWrapper>
                              {(query) => (
                                getCurrencies(currencies?.data, query)?.map(currency => (
                                  <Select.Option key={currency.id} value={currency}>
                                    {({selected}) => (
                                      <div>
                                        {currency?.currency_code} ( {currency?.currency_symbol} )
                                      </div>
                                    )}
                                  </Select.Option>
                                ))
                              )}
                          </Select.SearchControllerWrapper>
                        </Select.Options>
                    </Select>  
                  </SelectionMenuWrapper>
                  {error?.original_currency_id && <ErrorText> {error?.original_currency_id} </ErrorText>}
                </InputGroup>
              </div>


              {/* Project Description */}
              <div className="col-12">
                <InputGroup>
                  <Label> Project Description <sup>*</sup> :  </Label>
                  <div className='sp1_st_write_comment_editor pr-0'>
                    <CKEditor 
                        data={formData.description}
                        onChange={(e, editor) => handleEditorDataChange(editor, 'description')}
                    /> 
                  </div>
                  {error?.description && <ErrorText> {error?.description} </ErrorText>}
                </InputGroup>
              </div>

              {/* Cover Letter */}
              <div className="col-12">
                <InputGroup>
                  <Label> Cover Letter <sup>*</sup> :  </Label>
                  <div className='sp1_st_write_comment_editor pr-0'>
                    <CKEditor 
                        data={formData.comments}
                        onChange={(e, editor) => handleEditorDataChange(editor, 'comments')}
                    /> 
                  </div>
                  
                  {error?.comments && <ErrorText> {error?.comments} </ErrorText>}
                </InputGroup>
              </div> 
            </div>
          </form>
        </Card.Body>

        <Card.Footer className="px-4 pb-4">
          <Button variant='tertiary' onClick={handleClose}>
            Close
          </Button>
          <Button isLoading={isLoading} loaderTitle='Processing...' onClick={handleSubmit}>
            Update
          </Button>
        </Card.Footer>
      </Card>
    )
}

