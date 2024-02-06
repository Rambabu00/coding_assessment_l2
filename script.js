let activeIndex = 1;
let activeColorIndex=1
let activeLabelIndex=1;
let count=1;
let size;
let color;
var itemData;
let imageData=["https://1847884116.rsc.cdn77.org/telugu/gallery/actress/hansikamuthwal/hansika16112023_024.jpg","https://1847884116.rsc.cdn77.org/telugu/gallery/actress/hansikamuthwal/hansika16112023_017.jpg", "https://1847884116.rsc.cdn77.org/telugu/gallery/actress/hansikamuthwal/hansika16112023_016.jpg", "https://1847884116.rsc.cdn77.org/telugu/gallery/actress/hansikamuthwal/hansika16112023_001.jpg"]
let color_container=document.getElementById("color-container")
let size_container=document.getElementById("size-container")
async function showImage(index) {
   
  // Reset previous active div
  document.getElementById(`box${activeIndex}`).classList.remove("active");

  // Set new active div
  activeIndex = index;
  document.getElementById(`box${activeIndex}`).classList.add("active");

  // Show corresponding image in the top
   document.getElementById("img").src=imageData[activeIndex-1]

  // Show the image display container
 
}
 
async function selectColor(index){
    // Reset previous active div
    document.getElementById(`radio${activeLabelIndex}`).checked = false;
    document.getElementById(`color${activeColorIndex}`).classList.remove("active-color");
    document.getElementById(`outerDiv${activeColorIndex}`).style.border=""
 
   // Set new active div
   activeColorIndex = index;
   let obj=itemData.product.options[0].values[index-1]
   document.getElementById(`color${activeColorIndex}`).classList.add("active-color");
 document.getElementById(`outerDiv${activeColorIndex}`).style.border=`3px solid ${obj[Object.keys(obj)[0]]}`
 document.getElementById(`radio${activeLabelIndex}`).checked = true;
 color=Object.keys(obj)[0]
}


async function selectSize(index){
  // Reset previous active label and radio check
  let siz=itemData.product.options[1].values[index-1]
  document.getElementById(`label${activeLabelIndex}`).classList.remove("active-label");
  document.getElementById(`label${activeLabelIndex}`).style.backgroundColor="rgb(18, 17, 17,0.08)";
  // Set new active label and radio check
  activeLabelIndex=index
  document.getElementById(`label${activeLabelIndex}`).classList.remove("active-label");
  document.getElementById(`label${activeLabelIndex}`).style.backgroundColor="rgb(9, 9, 132, 0.11)";
    size=siz
   

   
}
async function sub(){
   if(count>1){
    count=count-1;
  document.getElementById("count").innerText=count
   }
}
async function add(){
   
   count=count+1;
 document.getElementById("count").innerText=count
  
}
async function addCart(){
  console.log("result")
  document.getElementById("addcartMessage").style.display="block"
document.getElementById("addcartMessage").innerHTML=itemData.product.title+" with Color "+color+" and Size "+size+" added to Cart" 
}
async function fetchData(){
  //fetching data using given api
  let response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json")
  let data=await response.json();
  //add check box color picker to color_container
   itemData=data
   // add data to elements
   //add vendor name
   document.getElementById("vendor").innerText=data.product.vendor;
   document.getElementById("title").innerText=data.product.title;
   document.getElementById("price").innerText=data.product.price+".00"
   document.getElementById("compare_price").innerText=data.product.compare_at_price+".00"
   // now calucate the discount
   let discountPrice= Number(data.product.compare_at_price.slice(1))-Number(data.product.price.slice(1))
  let discountPer=Math.floor((discountPrice/Number(data.product.compare_at_price.slice(1)))*100)
    document.getElementById("discount").innerText=discountPer+"% off"
    // add count
    document.getElementById("count").innerText=count
    // add discription
    document.getElementById("item-discription").innerHTML=data.product.description    
    // add images by using imageData because data containes image soures are not opened or it gives 404 error
    imageData.map((src, index)=>{
      let imageDiv=` <div class="images" id="box${index+1}" onclick="showImage(${index+1})">
      <img src=${src} alt="product-image" id="img${index+1}" width="100%" height="100%"/>
    </div>`
    document.getElementById("images-container").innerHTML+=imageDiv
    })
  data.product.options[0].values.map((obj, index)=>{
    let child=`<div id="outerDiv${index+1}">
    <div style="background-color: ${obj[Object.keys(obj)[0]]};" onclick="selectColor(${index+1})" class="colorPick" id="color${index+1}"></div>
  </div>`
    color_container.innerHTML+=child
  })
    
// add radio buttons to size-container
data.product.options[1].values.map((value, index)=>{
  console.log(value)
  let radioDiv=`<label id="label${index+1}">
  <input type="radio" name="size" value=${value} onclick="selectSize(${index+1})" id="radio${index+1}">
 ${value}
</label>`
size_container.innerHTML+=radioDiv
})
     // Initialize with the first div as active for image
     await  showImage(1);
     //Initialize with the first div as active for color
   await  selectColor(1)
    //Initialize with the first label as active for size
   await selectSize(1)
  // logs the data
  console.log(data)
  
 }
 
  fetchData();
 

 