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
    if (!userImage || !client) return;

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

      // 3. Draw Footer Bar (Slightly taller for two lines of text: 15% height)
      const footerHeight = canvas.height * 0.15;
      ctx.fillStyle = client.footerColor || "rgba(0,0,0,0.8)"; 
      ctx.fillRect(0, canvas.height - footerHeight, canvas.width, footerHeight);

      // 4. Add Client Details from MongoDB
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      
      // Line 1: Shop Name & Location
      ctx.font = `bold ${canvas.width * 0.04}px Arial`; 
      const line1 = `${client.name} | ${client.location}`;
      ctx.fillText(line1, canvas.width / 2, canvas.height - (footerHeight * 0.6));

      // Line 2: Full Address & Phone
      // We use a slightly smaller font for the detailed address
      ctx.font = `${canvas.width * 0.028}px Arial`; 
      const line2 = `${client.address} | Ph: ${client.phone}`;
      ctx.fillText(line2, canvas.width / 2, canvas.height - (footerHeight * 0.25));
    };
  }, [userImage, client]);

  const download = () => {
    const link = document.createElement('a');
    link.download = `Poster_${client.name}_${Date.now()}.png`;
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
          <canvas ref={canvasRef} style={{ maxWidth: '100%', borderRadius: '8px' }} />
          <div style={{ marginTop: '15px' }}>
            <button onClick={download} className="btn-download">DOWNLOAD POSTER</button>
            <p onClick={() => setUserImage(null)} style={{ cursor: 'pointer', color: 'red', marginTop: '10px' }}>
              Change Photo
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosterGenerator;