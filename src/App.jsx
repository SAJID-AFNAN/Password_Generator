import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  //useRed hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str += "0123456789"
    if (character) str += "!@#$%^&*+=_-/(){}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)

    }
    setPassword(pass)
  }, [length, number, character, setPassword])

  const copyPassToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 9)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 bg-gray-700 ">
        <h1 className="text-center text-white text-3xl my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden bg-white mb-4">
          <input
            type="text"
            value={password}
            className="outline-none text-lg w-full py-2 px-4"
            placeholder="Password"
            readOnly
            ref={passwordRef} />
          <button
            onClick={copyPassToClipBoard}
            className="outline-none text-lg bg-blue-600 text-white p-3">copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer "
              onChange={(e) => { setLength(e.target.value) }} />
            <label className="text-white">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => { setNumber((prev) => !prev) }} />
            <label htmlFor="numberInput" className="text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => { setCharacter((prev) => !prev) }} />
            <label htmlFor="characterInput" className="text-white">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
