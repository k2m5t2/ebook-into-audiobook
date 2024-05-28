<script setup>
import { ref } from 'vue';
// import TheWelcome from '../components/TheWelcome.vue'

// import { WaveFile } from 'wavefile';

// let wav = new WaveFile();
let wav = new wavefile.WaveFile();
const audioSource = ref();
const audioPlayer = ref();

function loadAudio() {  
  wav.fromScratch(2, 48000, '8', [
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

<template>
  <main>
    <!-- <TheWelcome /> -->
    <audio id="audioPlayer" ref="audioPlayer" controls>
      <source id="audioSource" ref="audioSource" src="" type="audio/wav" />
      Your browser does not support the audio element. 
    </audio>
    <button @click="loadAudio">Load Audio</button>
  </main>
</template>
