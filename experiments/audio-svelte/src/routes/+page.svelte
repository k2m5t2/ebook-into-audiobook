<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<audio id="audioPlayer" controls bind:this={audioPlayer}>
  <source id="audioSource" src="" type="audio/wav" bind:this={audioSource} />
  Your browser does not support the audio element. 
</audio>

<button on:click={loadAudio}>
  Load Audio
</button>

<script>
  ///////// IMPORTS ///////////

  // ES6 import
  // import { WaveFile } from 'wavefile'; // named
  // import WaveFile from 'wavefile'; // default

  // NOTE: alternative import method suggested by SvelteKit:
  // import wavefile from 'wavefile';
  // const { WaveFile } = wavefile;
  // const WaveFile = require('wavefile').WaveFile;

  // NOTE: dynamic import method suggested by ChatGPT that bypasses SSR:
  // let WaveFile;
  // if (typeof window !== 'undefined') {
  //     import('wavefile').then(module => {
  //         WaveFile = module.WaveFile;
  //         // Use WaveFile here
  //     });
  // }

  // // NOTE: complete example by ChatGPT
  // let WaveFile;
  // let waveFileInstance;

  // // Dynamically import the wavefile library
  // if (typeof window !== 'undefined') {
  //     import('wavefile').then(module => {
  //         WaveFile = module.WaveFile;
  //         // Now you can use the WaveFile class
  //         // For example, creating a new instance
  //         waveFileInstance = new WaveFile();
  //         // Add additional logic here as needed
  //     }).catch(error => {
  //         console.error('Error importing wavefile:', error);
  //     });
  //   }

  import { WaveFile } from '$lib/wavefile.js';

  let wav = new WaveFile();

  let audioPlayer;
  let audioSource;

  function loadAudio() {  
    wav.fromScratch(2, 48000, '8', [
      [0, 2, 4, 3],
      [0, 1, 4, 3]
      [0, 2, 4, 3],
      [0, 1, 4, 3]
      [0, 2, 4, 3],
      [0, 1, 4, 3]
    ]);

    const wavDataURI = wav.toDataURI();
    audioSource.value.src = wavDataURI;
    // console.log(audioSource.value.src); // DEBUG

    audioPlayer.value.load();
  }

</script>