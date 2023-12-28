import * as React from 'react';
import { useCurrencyListQuery } from '../../../../services/api/currencyApiSlice'
import { Dialog } from '@headlessui/react';

// styled component
import {
  DialogPanelWrapper, SelectionMenuWrapper,
} from './ui/dealStyledComponent';
import { Input, InputGroup, Label, RadioInput, RadioLabel } from './ui/form';
import { Flex } from './table/ui';

// custom component
import Card from '../../../../global/Card';
import Button from '../../../../global/Button';
import Select from '../../../../global/Select';
import CKEditor from '../../../../ckeditor/index'
import { useDealCreateMutation } from '../../../../services/api/dealApiSlice';
 

const DealCreationForm = ({isOpen, close}) => {
  return(
    <React.Fragment>
      <Dialog as="div" open={isOpen} onClose={close}>
        <DialogPanelWrapper>
          <Dialog.Panel className="dialog-panel">
            <DealCreationFormControl close={close} />
          </Dialog.Panel>
        </DialogPanelWrapper>
      </Dialog>
    </React.Fragment>
  )
}


export default DealCreationForm;



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
const DealCreationFormControl = ({close}) => {
    const [formData, setFormData] = React.useState(initialData);
    const [currency, setCurrency] = React.useState(null);

    // api hooks
    const {data: currencies} = useCurrencyListQuery();
    const [dealCreate, { isLoading }] = useDealCreateMutation(); 


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

      try {
        const res = await dealCreate(formData).unwrap();
        console.log({res}); 
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
          Create Deal  
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
                </InputGroup>
              </div>


              {/* Project Budget */}
              <div className="col-md-4">
                <InputGroup>
                  <Label> Project Budget <sup>*</sup> :  </Label>
                  <Input
                    type='number'
                    name='amount' 
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder='Enter project Budget'
                  />
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
                </InputGroup>
              </div> 
            </div>
          </form>
        </Card.Body>

        <Card.Footer className="px-4 pb-4">
          <Button variant='tertiary' onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </Card.Footer>
      </Card>
    )
}

