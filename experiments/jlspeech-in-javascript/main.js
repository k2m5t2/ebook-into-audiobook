// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// see also advanced usage of importing ONNX Runtime Web:
// https://github.com/microsoft/onnxruntime-inference-examples/tree/main/js/importing_onnxruntime-web
const ort = require('onnxruntime-web');
const wavefile = require('wavefile');

// import { WaveFile } from 'wavefile';
// let wav = new WaveFile();
let wav = new wavefile.WaveFile();

function floatTo16BitPCM(inputFloats) {
  const outputInt16 = new Int16Array(inputFloats.length);

  for (let i = 0; i < inputFloats.length; i++) {
      // Clamp the values to the -1.0 to 1.0 range
      const clamped = Math.max(-1, Math.min(1, inputFloats[i]));

      // Scale and round to the nearest integer, then clamp to the 16-bit range
      outputInt16[i] = Math.round(clamped * 32767);
  }
  return outputInt16;
}

// use an async context to call onnxruntime functions.
async function main() {
    try {
        const session = await ort.InferenceSession.create('./j3lspeech-jets.onnx');

        // prepare inputs. a tensor need its corresponding TypedArray as data
        // const input_tokens = Float32Array.from([26, 2, 8, 34, 23, 16, 38, 8, 5, 72]);
        // const input_tensors = new ort.Tensor('float32', input_tokens); // NOTE: not sure if ORT accepts list of nums as inputs, or just tensors.
        // const input_tokens = Int32Array.from([26, 2, 8, 34, 23, 16, 38, 8, 5, 72]);
        // const input_tokens = BigInt64Array.from([26, 2, 8, 34, 23, 16, 38, 8, 5, 72]);
        const input_tokens = BigInt64Array.from([26n, 2n, 8n, 34n, 23n, 16n, 38n, 8n, 5n, 72n]);
        const input_tensors = new ort.Tensor('int64', input_tokens); // NOTE: not sure if ORT accepts list of nums as inputs, or just tensors.

        // prepare feeds. use model input names as keys.
        // const feeds = { a: tensorA, b: tensorB };
        // const feeds = { text: input_tokens }; 
        const feeds = { text: input_tensors }; 

        // feed inputs and run
        const results = await session.run(feeds); 

        // read from results
        // const dataC = results.c.data;
        // document.write(`data of result tensor 'c': ${dataC}`);
        // const dataC = results.c.data;
        // document.write(`keys: ${Object.keys(results)}`); // OUTPUT: wav, durresult
        // document.writeln(`result: ${results.wav}`);
        // document.writeln(`keys: ${Object.keys(results.wav)}`); // OUTPUT: dims, type, data, size
        console.log(`result's wave data: ${results.wav.data}`); // TEMP
        console.log(`result's wave data, in 16 bits: ${floatTo16BitPCM(results.wav.data)}`); // TEMP

        // const blob = new Blob([results.wav.data], { type: 'audio/wav' });
        // const url = URL.createObjectURL(blob);

        // const downloadLink = document.createElement('a');
        // downloadLink.href = url;
        // downloadLink.download = 'output.wav';
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // document.body.removeChild(downloadLink);
        
        wav.fromScratch(2, 22050/2, '16', [ // may need to experiment w/ parameters
          // results.wav.data
          floatTo16BitPCM(results.wav.data)
          // [0, 2, 4, 3],
          // [0, 1, 4, 3]
        ]);
        // const url = URL.createObjectURL(wav.toBuffer());
        const wavDataURI = wav.toDataURI();

        // document.getElementById('audioSource').src = url;
        document.getElementById('audioSource').src = wavDataURI;
        document.getElementById('audioPlayer').load();

    } catch (e) {
        document.write(`failed to inference ONNX model: ${e}.`);
    }
}

main();
