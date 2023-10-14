module.exports = async (req, res) => {
    const userId = req.query.userId;
  
    // Consulta los datos del usuario en tu base de datos usando userId
    // const userData = ...
  
    // Genera la imagen dinámica basada en los resultados del usuario (podrías usar una API o una biblioteca para esto)
    // const imageUrl = ...
  
    res.send(`
      <html>
        <head>
          <meta property="og:title" content="Resultado de ${userData.name}" />
          <meta property="og:description" content="${userData.resultDescription}" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:url" content="https://lpprojectpro.vercel.app/resultados/${userId}" />
        </head>
        <body>
          Redireccionando...
          <script>
            window.location.href = "https://lpprojectpro.vercel.app/main";
          </script>
        </body>
      </html>
    `);
  };