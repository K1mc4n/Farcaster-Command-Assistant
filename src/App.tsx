import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const { address, isConnected } = useAccount();
  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");

  const handleCommand = async () => {
    const parts = command.trim().split(" ");
    const cmd = parts[0];
    const arg = parts[1];

    if (cmd === "/help") {
      setResult(`Available commands:\n\n/help - Show available commands\n/price <symbol> - Get price of crypto\n\nExample: /price btc`);
    } else if (cmd === "/price" && arg) {
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${arg}&vs_currencies=usd`);
      const data = await res.json();
      const price = data?.[arg]?.usd;

      if (price) {
        setResult(`${arg.toUpperCase()} price: $${price}`);
      } else {
        setResult(`Token "${arg}" not found.`);
      }
    } else {
      setResult("Unknown command. Type /help");
    }

    setCommand("");
  };

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-4">
      <h1 className="text-xl mb-4">Farcaster Command Assistant</h1>

      <div className="mb-2">Connected: {address}</div>
      <div className="flex items-center space-x-2">
        <span>$</span>
        <input
          className="bg-black border-b border-green-400 text-green-400 w-full outline-none"
          placeholder="Type command like /price btc"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand()}
        />
      </div>
      <pre className="mt-4 whitespace-pre-wrap">{result}</pre>
    </div>
  );
}

export default App;
