"use client"
import React from 'react'
import { useState } from 'react';
import { FaVolumeUp } from "react-icons/fa";

const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [wordData, setWordData] = useState(null);

  const inputHandler = (e) => {
    setSearchWord(e.target.value);
  }

  const searchHandler1 = () => {
    const fetchData = async () => {
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      let data = await response.json();
      // console.log(data);
      setWordData(data);
      setSearchWord('');
    }
    fetchData();
  }

  const searchHandler2 = () => {
    let fetchData = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
    fetchData.then((response) => {
      return response.json();
    }).then((data) => {
      // console.log(data);
      setWordData(data);
      setSearchWord('');
    });
  }

  const handleSpeak = () => {
    const word = wordData[0]?.word;
    const message = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(message);
  }

  return (
    <main className='bg-[blanchedalmond]'>
      <div className='text-center w-full text-white my-4'>
        <p className='mx-auto text-4xl bg-[#8f75a7] w-[35%] py-6 px-3 rounded-md'>Dictionary Web Application</p>
      </div>
      <section className='max-w-[50vw] flex flex-col justify-between items-center max-h-[70vh] shadow-[4px_4px_10px_5px_rgba(122,115,115,0.5)] bg-[#d4cece] mx-auto gap-8 rounded-md'>
        <div className='w-full flex justify-center items-center gap-4 mt-8'>
          <button className='px-3 py-2 rounded-4xl cursor-pointer text-white bg-[#7d574a]' onClick={searchHandler2}>Search</button>
          <input className='w-[70%] bg-white px-4 py-2 rounded-4xl outline-none' type="text" placeholder='Search here...' onChange={inputHandler} value={searchWord} />
          <button className='px-3 py-2 rounded-4xl cursor-pointer text-white bg-[#7d574a]' onClick={searchHandler1}>Search</button>
        </div>
        <div className='w-[95%] min-h-[50vh] px-4 mb-30 flex flex-col justify-center gap-8 text-black text-4xl'>
          {wordData && (
            <>
              <div className='flex justify-between'>
                <div>
                  <h2>Word: <span>{wordData[0]?.word}</span></h2>
                  <span className='text-[18px]'>{wordData[0]?.meanings[0]?.partOfSpeech}</span>
                </div>
                <div>
                  <span><FaVolumeUp onClick={handleSpeak} className='text-[24px] cursor-pointer text-gray-600' /></span>
                </div>
              </div>
              <div>
                <p className='text-[21px]'>Meaning: <span>{wordData[0]?.meanings[0]?.definitions[0]?.definition}</span></p>
              </div>
              <div>
                <p className='text-[21px]'>Example: <span>{wordData[0]?.meanings[0]?.definitions[0]?.example}</span></p>
              </div>
              <div>
                <p className='text-[21px]'>Synonyms: <span>{wordData[0]?.meanings[0]?.definitions[0]?.synonyms?.join(', ')}</span></p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default App