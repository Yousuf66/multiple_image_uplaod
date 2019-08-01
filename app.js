const ip = 'https://fyp-user.herokuapp.com';
var imgList = [];
const cloudName = 'deqt9oyyi'
const unsignedUploadPreset = 'wmad36pl';


let addSuspect = (list)=>{
  var form = document.getElementById('sus-upload');
  var formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  
    xhr.open('POST',ip+'/suspect',true);
    xhr.onload = function(){
        if(this.status === 200){
          //   data = console.log(this.responseText);
          if(this.responseText == 'Successfully Add'){
             // window.location.replace('SuspectRecord.html');
             console.log('user added');
          }else{
              console.log('bad');
          }
        }
    }
    formData.append('imgList',list);
  xhr.send(formData);
 }
 
 function fileInput(){
    
    var fileInput  = document.getElementById('sus-img');
     var fileList =[];
     // let count = 0;
       for(var i=0;i<fileInput.files.length;i++){
         fileList.push(fileInput.files[i]);
        }
       for(i=0;i<fileList.length;i++){
         console.log(fileList[i]);
         addSuspectImage(fileList[i]);
       }
       addSuspect(imgList);
    
   }
  function addSuspectImage(file){
   { console.log(file);
   
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  
  
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // File uploaded successfully

        // var response = JSON.parse(xhr.responseText);
      var response = JSON.parse(xhr.responseText);
      console.log(response);
        
     
      console.log("uploaded");
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
       
       
      var url = response.secure_url;
      console.log(url);
      imgList.push(url);
    
        
      }
    };
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    xhr.send(fd);
  }

}
