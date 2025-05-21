import React, { useState } from "react";
import Scanner from "react-qr-barcode-scanner";
import products from "../public/products.json";

const App = () => {
  const [barcode, setBarcode] = useState("");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleSearch = () => {
    const match = products.find(
      (p) => p.SKU.replace(/^0+/, "") === barcode.replace(/^0+/, "")
    );
    setResult(match || { name: "No match found" });
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h1>Fehar Price Checker</h1>
      <input
        type="text"
        placeholder="Enter barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setScanning(true)}>Scan Barcode</button>

      {scanning && (
        <Scanner
          onUpdate={(err, result) => {
            if (result) {
              setBarcode(result.text);
              setScanning(false);
            }
          }}
        />
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>{result.name}</h3>
          <p>Price: {result.price}</p>
        </div>
      )}
    </div>
  );
};

export default App;
