export function getFormDataObj(formData){
  const data = {};
  formData.forEach((value,index)=>{
    data[index] = value;
  });

  return data;
}