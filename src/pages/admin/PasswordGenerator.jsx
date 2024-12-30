import { useCallback, useState, useEffect, useRef } from 'react';

function PasswordGenerator({
  initialLength = 8,
  initialNumberAllowed = true,
  initialCharAllowed = false,
  onPasswordChange = () => {}
}) {
  const [length, setLength] = useState(initialLength);
  const [numberAllowed, setNumberAllowed] = useState(initialNumberAllowed);
  const [charAllowed, setCharAllowed] = useState(initialCharAllowed);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null); // Create a ref for the input field

  // Password generation logic
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Base string with alphabets
    if (numberAllowed) {
      string += "0123456789"; // Add numbers if allowed
    }
    if (charAllowed) {
      string += "!@#$%^&*_-+={}~`"; // Add special characters if allowed
    }

    // Generate password by randomly picking characters from the allowed string
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length); // Randomly select a character from the string
      pass += string.charAt(char); // Append the character to the password
    }
    setPassword(pass); // Update the password state
    onPasswordChange(pass); // Call the callback function passed through props (if any)
  }, [length, numberAllowed, charAllowed, onPasswordChange]);

  // Copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select(); // Select the text in the input
      document.execCommand('copy'); // Copy the selected text to the clipboard
    }
  }, []);

  // Re-run password generation when settings change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);  // Allow manual editing of the password
    onPasswordChange(newPassword); // Update parent state with manual password change
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-grey-700">
      <h1 className="text-white text-center">Password Generator</h1>

      {/* Input field to display the generated password and a button to copy it */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          ref={passwordRef} // Assign the ref to the input element
          onChange={handlePasswordChange} // Allow manual editing
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-teal-700 text-white px-3 py-0.5 shrink-0 cursor-pointer rounded active:bg-teal-800 hover:bg-teal-600 transition duration-200"
        >
          Copy
        </button>
      </div>

      {/* Controls to adjust the password generation settings */}
      <div className="flex text-sm gap-x-2">
        {/* Length control */}
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-teal-700">Length: {length}</label>
        </div>

        {/* Number inclusion toggle */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="h-4 w-4 text-teal-700"
          />
          <label className="text-teal-700" htmlFor="numberInput">
            Numbers
          </label>
        </div>

        {/* Special character inclusion toggle */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
            className="h-4 w-4 text-teal-700"
          />
          <label className="text-teal-700" htmlFor="characterInput">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
