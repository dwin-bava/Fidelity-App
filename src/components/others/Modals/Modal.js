

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Container, Form, } from 'react-bootstrap';
import Label from '../Label/Label';
import ListOfValue from '../Fields/ListOfValue';
import InputField from '../Fields/InputField';
import SelectField from "../../components/fields/SelectField";
import {useNavigate } from 'react-router-dom';


function Risk_analysis_prompt({handleClose, handleShow, show, setShowModal}) {
    const [showScanDocument, setScanDocument] = useState(false);
const router = useNavigate()
    useEffect(() => {
        handleShow()
    
    },[])

    const function_generate_risk_id = () => {
        console.log("close")
        handleClose()
        router("/individual_account_opening")
    }


    const AddSubMenuModal = ({ name, showModal, setShowModal }) => {
        
        const handleClose = () => setShowModal(false);
        const handleShow = () => setShowModal(true);
       
         return (
           <>
             <Modal size="xl" show={showModal} onHide={handleClose} backdrop="static" centered>
               <Modal.Header closeButton>
                    <img src="https://cdn-icons-png.flaticon.com/512/6009/6009864.png" width={30} height={30} alt="" />
                 <Modal.Title style={{ padding: "10px", fontSize: "15px", color: "black" }}>{name}</Modal.Title>
               </Modal.Header>
               <Modal.Body className='bg-gray-100 overflow-y-auto md:max-h-96' >
            
                <div className="md:flex justify-center w-full">
                    {/* **************************************** */}

                    <div className="w-full max-w-2xl border md:px-2 md:py-2">
                        <div className='border bg-slate-400 rounded md:px-2'>Name Screening</div>
                        {/* Sanction */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Sanction" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Adverse Media */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Adverse Media" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Political Exposed Person */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Political Exposed Person" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>


{/* ***********************************************Location*************************************************************** */}

                        <div className='border bg-slate-400 rounded md:px-2'>Location</div>
                        {/* Branch */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Branch" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Country Of Origin */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Country Of Origin" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Country Of Residence */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Country Of Residence" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

{/* ***********************************************Customer Type*************************************************************** */}
                        <div className='border bg-slate-400 rounded md:px-2'>Customer Type</div>
                        {/* Customer Type */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Customer Type" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Customer Type */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Customer Type" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Customer Type */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Customer Type" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

{/* ***********************************************Product*************************************************************** */}
                        <div className='border bg-slate-400 rounded md:px-2'>Product</div>
                        {/* Product */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Product" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Product */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Product" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>


{/* ***********************************************Channel*************************************************************** */}
                        <div className='border bg-slate-400 rounded md:px-2'>Channel</div>
                        {/* Channel */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Channel" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>

                        {/* Channel */}
                        <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                                <div class="md:w-1/3">
                                    <Label label="Channel" fontSize="85%" />
                                </div>
                                <div className="md:w-2/3 ">
                                    <ListOfValue />
                                </div>
                            </div>
                        </div>
                        

                    </div>

                    
                    {/* **************************************** */}


                    {/* Second Side */}
                    {/* Second Side */}
                    {/* Second Side */}
                    <div className="w-full max-w-2xl">

                            <div className='border md:ml-5 md:p-2'>
                                <div className='border bg-slate-400 rounded md:px-2'>
                                    PEP Evaluation
                                </div>
                                
                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Heads of state and gorvernment</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Members of government (National and Regional)</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Heads of state and gorvernment</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Members of government (National and Regional)</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Heads of state and gorvernment</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Members of government (National and Regional)</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Members of government (National and Regional)</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Heads of state and gorvernment</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Members of government (National and Regional)</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Heads of state and gorvernment</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Heads of state and gorvernment</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Heads of state and gorvernment</label>
                                </div>

                                <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                    <input type="checkbox" className="my_inputs_Source_of_fund" />
                                    <label className="my_labels_Source_of_fund">Members of government (National and Regional)</label>
                                </div>
                            
                            </div>

                            <div className='md:border md:ml-5 md:p-2 md:mt-2'>
                                <label className='font-bold'>composite risk score</label>
                                <div className='bg-green-500 text-white md:flex md:justify-between'>
                                    <label className='md:ml-2 uppercase'>low</label>
                                    <label className='md:mr-2'>1</label>
                                </div>
                                <div className='bg-yellow-500 text-white md:flex md:justify-between'>
                                    <label className='ml-2 uppercase'>medium</label>
                                    <label className='mr-2'>2</label>
                                </div>
                                <div className='bg-red-500 text-white md:flex md:justify-between'>
                                    <label className='ml-2 uppercase'>high</label>
                                    <label className='mr-2'>3</label>
                                </div>
                                <div className='bg-gray-500 text-white md:flex md:justify-between'>
                                    <label className='ml-2 uppercase'>Refer to compliance</label>
                                    <label className='mr-2'>4</label>
                                </div>

                            </div>

                        </div>

                </div>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="primary" onClick={function_generate_risk_id}>
                   Generate Risk ID Code
                 </Button>
               </Modal.Footer>
             </Modal>
           </>
         );
       };
    

  return (
    <>

    <AddSubMenuModal name="RISK CALCULATOR" showModal={showScanDocument} setShowModal={setScanDocument} />


      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
            <img className='flex justify-center animate-pulse' src='https://cdn-icons-png.flaticon.com/512/5951/5951440.png' width={30} height={30} />
          <Modal.Title className='ml-3'>Risk Assessment Text </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className=''>
                <div className='flex justify-center'>
                    <img className='flex justify-center animate-pulse' src='https://cdn-icons-png.flaticon.com/512/4140/4140633.png' width={50} height={50} />
                </div>
                <div className='flex justify-center'>
                    Please Take the Risk Assessment Test !!!
                </div>
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={function (e) { 
            e.preventDefault(); 
            setScanDocument(!showScanDocument);
            handleClose();
            }}
            >
            Okay Sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Risk_analysis_prompt