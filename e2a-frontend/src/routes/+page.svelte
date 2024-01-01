<h1>EPUB into Audiobook (mp3)</h1>

<input type="file" id="fileUpload" class="hidden"> 

<input type="file" bind:this={fileInput} on:change={handleFileSelect}>

<button 
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  on:click={handleUpload}>
  Upload File
</button>

<script>
  let fileInput;

  function handleUpload() {
    fileInput.click();
  }

  function handleFileSelect(e) {
    const selectedFile = e.target.files[0];
    // do something with the selected file
  } 
</script>
