import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImageUrl(null);
    
    try {
      const response = await fetch("https://your-backend-url.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input
        type="text"
        placeholder="Nhập mô tả hình ảnh..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="p-2 border rounded w-full max-w-md"
      />
      <Button onClick={generateImage} disabled={loading}>
        {loading ? "Đang tạo..." : "Tạo hình ảnh"}
      </Button>
      {imageUrl && <img src={imageUrl} alt="Generated" className="mt-4 rounded-lg shadow" />}
    </div>
  );
}
