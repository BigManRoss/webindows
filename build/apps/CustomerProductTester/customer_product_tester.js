const baseurl="http://localhost:8080/demo-1.0-SNAPSHOT/api/products",draw=new Drawer;let selectedOption,arr=new Array;const selectedValues={};function init(){createLeftMenu()}function createLeftMenu(){const e=document.getElementById("left"),t=new Array;t.push(new Button("Request","Request",requestAllProducts)),t.push(new Button("Add","Add",createProduct)),t.push(new Button("Edit","Edit",createEditProduct)),t.push(new Button("Remove","Remove",removeProduct)),e.append(draw.createButtonList("btnGroup",t,"100%","100%"))}function fillRightMenuWithList(e){draw.clearFromChildren("id_Shower");const t=document.getElementById("id_Shower"),n=new Array;for(let t=0;t<e.length;t++){const d=new SelectOption(e[t].name,`${e[t].name}: ${e[t].value}`,e[t].value);n.push(d)}const d=new SelectList("list",n,10,"100%","150px",((e,t)=>{selectedOption=e,selectedValues.index=t,selectedValues.name=arr[t].name,selectedValues.value=arr[t].value}));t.append(draw.createSelectList(d))}function showResAsText(e){document.getElementById("id_Shower").innerHTML=e}function requestAllProducts(){draw.clearFromChildren("id_Shower"),sendRequest(`${baseurl}`,(e=>{const t=JSON.parse(e).list;fillRightMenuWithList(t),arr=t}))}function addProduct(){const e=document.getElementById("name").value,t=document.getElementById("price").value;sendRequest(`${baseurl}/add?name=${e}&price=${t}`,(e=>{showResAsText(e)}))}function editProduct(){const e=document.getElementById("name").value,t=document.getElementById("price").value,n=selectedValues.index+1;sendRequest(`${baseurl}/update?id=${n}&name=${e}&price=${t}`,(e=>{showResAsText(e)}))}function createProduct(){const e=document.getElementById("id_Shower");draw.clearFromChildren("id_Shower");const t=new Form("form",["Name:","Price:"],["name","price"],new Button("add","Add",addProduct),"Add new product");e.append(draw.createForm(t))}function createEditProduct(){const e=document.getElementById("id_Shower");draw.clearFromChildren("id_Shower");const t=new Form("form",["New Name:","New Price:"],["name","price"],new Button("edit","Edit",editProduct),`Edit: ${selectedOption.innerHTML}`);e.append(draw.createForm(t))}function removeProduct(){const e=selectedValues.index+1;sendRequest(`${baseurl}/remove?id=${e}`,(e=>{showResAsText(e)}))}init();