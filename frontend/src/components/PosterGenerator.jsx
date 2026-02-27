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
      //Set canvas to match uploaded image quality
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the User's Photo
      ctx.drawImage(img, 0, 0);

      //Draw Footer Bar
      const footerHeight = canvas.height * 0.15;
      ctx.fillStyle = client.footerColor || "rgba(0,0,0,0.8)"; 
      ctx.fillRect(0, canvas.height - footerHeight, canvas.width, footerHeight);

      //Add Client Details from MongoDB
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      
      //Shop Name & Location
      ctx.font = `bold ${canvas.width * 0.04}px Arial`; 
      const line1 = `${client.name} | ${client.location}`;
      ctx.fillText(line1, canvas.width / 2, canvas.height - (footerHeight * 0.6));

      //Phone number
 ctx.font = `bold ${canvas.width * 0.035}px Arial`; 
      const line2Text = `Ph: ${client.phone}`;
      ctx.fillText(
        line2Text, 
        canvas.width / 2, 
        canvas.height - (footerHeight * 0.25)
      );
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