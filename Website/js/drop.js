
//get the drop zone
let dropZone = document.getElementById('dropZone');

//set up the listeners to prevent propogation
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });
  
function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

//set up listeners for the drag and feedback
;['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});
  
;['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
})
  
function highlight(e) {
    dropZone.classList.add('highlight');
}
  
function unhighlight(e) {
    dropZone.classList.remove('highlight');
}

//set up the drop handler
dropZone.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    
    handleFiles(files);
}

//the file handler
function handleFiles(files) {
    ([...files]).forEach(uploadFile);
  }



let url = new URL(document.location.href);
let searchParams = new URLSearchParams(url.search);
//const accountName = searchParams.get("accountName");
//const sasString = searchParams.get("sasString");
//const containerName = searchParams.get("containerName");
const accountName = "";
const sasString = "";
const containerName = "";
const containerURL = new azblob.ContainerURL(
    `https://${accountName}.blob.core.windows.net/${containerName}?${sasString}`,
    azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));

    function uploadFile(file){
        const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, file.name);
        azblob.uploadBrowserDataToBlockBlob(
            azblob.Aborter.none, file, blockBlobURL);
      }

    //-------------------------------------------
   