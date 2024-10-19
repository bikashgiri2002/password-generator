import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //callBack hooks
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*+-:;,.";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * (str.length + 1));
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  //useefect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  //create ref using useRef()
  const copyTextRef = useRef();
  const displayTextRef = useRef();
  const copyTextToClipboard = useCallback(() => {
    copyTextRef.current?.select();
    window.navigator.clipboard.writeText(password);
    displayTextRef.current.style.display = 'block';
    setTimeout(() => {
      displayTextRef.current.style.display = 'none';
    },1000);
  }, [password]);

  return (
    <>
      <div className="max-w-md mx-auto flex flex-col justify-between">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-center">
      <h1 className="text-4xl text-center text-white">password generator</h1>
        <div className="flex shadow-md rounded-lg overflow-hidden my-4 bg-white">
          <input
            type="text"
            value={password}
            className="bg-white outline-none w-full py-1 px-3"
            placeholder="password"
            ref={copyTextRef}
            readOnly
          />
          <button onClick={copyTextToClipboard} className="outline-known bg-blue-600 px-3 text-white text-center shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 text-orange-500">
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">length : {length}</label>
            <div className="mx-2">
              <input
                type="checkbox"
                name="number"
                id="numberInput"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="NumberInput">Numbers</label>
            </div>
            <div className="mx-2">
              <input
                type="checkbox"
                name="number"
                id="charInput"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Symbol</label>
            </div>
          </div>
        </div>
        
      </div>
      <p className="bg-slate-100 max-w-sm mx-auto text-center rounded-xl p-2 hidden" ref={displayTextRef}>copied....</p>
      </div>
    </>
  );
}

export default App;
