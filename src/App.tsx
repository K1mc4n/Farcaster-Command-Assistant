import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    sdk.actions.ready(); // Menyatakan miniapp siap
  }, []);

  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");

  const handleCommand = async () => {
    const parts = command.trim().split(" ");
    const cmd = parts[0];
    const arg = parts[1];

    if (cmd === "/help") {
      setResult(
        `📖 Available commands:\n\n/help - Show this help\n/price <symbol> - Get crypto price\n\nExample: /price btc`
      );
    } else if (cmd === "/price" && arg) {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${arg}&vs_currencies=usd`
        );
        const data = await res.json();
        const price = data?.[arg]?.usd;
        if (price) {
          setResult(`${arg.toUpperCase()} price: $${price}`);
        } else {
          setResult(`❌ Token "${arg}" not found.`);
        }
      } catch {
        setResult("⚠️ Error fetching price.");
      }
    } else {
      setResult("❓ Unknown command. Type /help");
    }

    setCommand("");
  };

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-4 flex flex-col justify-start text-sm">
      <h1 className="text-xl mb-4 text-green-300">Farcaster Command Assistant</h1>

      <div className="flex items-center w-full gap-2">
        <span className="text-green-500">$</span>
        <input
          className="flex-grow bg-black border-b border-green-400 text-green-300 outline-none placeholder-green-600"
          placeholder="Type /price btc or /help"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCommand()}
          autoFocus
        />
      </div>

      <pre className="mt-4 whitespace-pre-wrap text-green-200">{result}</pre>
    </div>
  );
}

export default App;
