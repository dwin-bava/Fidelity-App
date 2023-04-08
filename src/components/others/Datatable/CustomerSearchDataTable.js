import React,{useState} from "react";
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import MUIDataTable from "mui-datatables";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';
import {MdCheckBoxOutlineBlank} from 'react-icons/md';

import "../../Headers/customer-search.css"

// import Modal from 'react-bootstrap/Modal';

function CustomerSearchDataTable({ title,rowsPerPage,Data,dataProcessingInfo,onClick,handleShow,onClickk}) {
  const customTheme1 = JSON.parse(localStorage.getItem("theme"));
  console.log(customTheme1,"theme1") 

  // const [getTheme, setTheme] = useState(
  //   JSON.parse(localStorage.getItem("theme"))
  // );


  const bgColor = 
    `url( ` + 
    window.location.origin + 
    `/assets/images/headerBackground/` + 
    customTheme1.theme.HeaderColor + 
    `)`; 
  
  const arr = [];

  Data.map((i)=>{
    arr.push([null,i[1] , null , i[0] , i[2] , null , i[3] , null , i[4] ])
  })

  const columns =
   [
    {
    name:"",
    options:{setCellHeaderProps:()=>({style:{width:60,background:bgColor,color:"black",padding:"0px"}}),
            customBodyRender:() => {
      return(
       <div>
         <button className="datatable_button" onClick={handleShow}><MdCheckBoxOutlineBlank size={20} color={"black"}/>
         </button>
       </div>
            );
                                   }
            }
    },
    {
      name:"",
      options:{setCellHeaderProps:()=>({style:{width:60,background:bgColor,color:"black",padding:"0px"}}),
              customBodyRender:() => {
        return(
         <div>
           <button className="datatable_button" onClick={onClick}><FaArrowAltCircleLeft size={20} color={"black"}/>
           </button>
         </div>
              );
                                     }
              }
      },

    {
    name:"Customer ID",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    }, 

    { 
    name:"Relation No",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    },
    
    {
    name:"Customer Name",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    },
    
    { 
    name:"Phone",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    },
    
    { 
    name:"Date Of Birth",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    },

    { 
    name:"Branch",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    },
    
    { 
    name:"Created By",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    },
    
    {
    name:"Relationship Type",
    options:{setCellHeaderProps:()=>({style:{width:60,whiteSpace:"nowrap",background:bgColor,color:"black",padding:"0px"}})}
    },
    
    {
    name:"",
    options:{setCellHeaderProps:()=>({style:{width:60,background:bgColor,color:"black",padding:"0px"}}),
    customBodyRender:() => {
return(
<div>
 <button className="datatable_button" onClick={onClickk}><FaArrowAltCircleRight size={20} color={"black"}/>
 </button>
</div>
    );
                           }
    }
    
    }
  ]


  const options = {
                  tableBodyHeight:'320px',
                   rowsPerPage: rowsPerPage,
                   selectableRowsHeader:false,
                   selectableRows:false,
                    textLabels: {
                      body: { noMatch: dataProcessingInfo } }
                  };
  const data =   arr

console.log(data)
  
  return (
    <div>
      <MUIDataTable
        title={title}
        data={data} // example: ["James Houston", "Test Corp", "Dallas", "TX"],
        columns={columns} // example: ["Name", "Company", "City", "State"]
        options={options}
      />
    </div>
  );
}

export default CustomerSearchDataTable;
