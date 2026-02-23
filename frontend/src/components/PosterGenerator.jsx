import React, { useRef, useState, useEffect } from 'react';

const PosterGenerator = ({ client }) => {
  const canvasRef = useRef(null);
  const [userImage, setUserImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!userImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = userImage;

    img.onload = () => {
      // 1. Set canvas to match uploaded image quality
      canvas.width = img.width;
      canvas.height = img.height;

      // 2. Draw the User's Photo
      ctx.drawImage(img, 0, 0);

      // 3. Draw Footer Bar (Bottom 10%)
      const footerHeight = canvas.height * 0.12;
      ctx.fillStyle = client.footerColor || "rgba(0,0,0,0.8)"; 
      ctx.fillRect(0, canvas.height - footerHeight, canvas.width, footerHeight);

      // 4. Add Client Details from MongoDB
      ctx.fillStyle = "white";
      ctx.font = `bold ${canvas.width * 0.035}px Arial`; // Scale font size to image
      ctx.textAlign = "center";
      
      const text = `${client.phone}  |  ${client.location}`;
      ctx.fillText(text, canvas.width / 2, canvas.height - (footerHeight / 2.5));
    };
  }, [userImage, client]);

  const download = () => {
    const link = document.createElement('a');
    link.download = `Poster_${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      {!userImage ? (
        <label className="upload-section">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className="btn-upload"> CLICK TO ADD PHOTO</div>
        </label>
      ) : (
        <div>
          <canvas ref={canvasRef} />
          <button onClick={download} className="btn-download">DOWNLOAD POSTER</button>
          <p onClick={() => setUserImage(null)} style={{cursor:'pointer', color:'red'}}>Change Photo</p>
        </div>
      )}
    </div>
  );
};

export default PosterGenerator;