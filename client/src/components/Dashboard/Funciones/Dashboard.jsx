// Este es un esquema simplificado. Deberás manejar el estado de autenticación y el almacenamiento del token o userId adecuadamente.

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      // Suponiendo que tienes una función que obtiene el userId del token de sesión o localStorage
      const userId = getUserIdFromSession();
      
      const getUserData = async () => {
        try {
          const response = await axios.get(`https://tokenautasreact-node.onrender.com/users/${userId}`);
          if (response.status === 200) {
            setUserData(response.data);
          } else {
            // Manejar el caso de que el usuario no se encuentre
          }
        } catch (error) {
          console.error('No se pudo obtener la información del usuario', error);
        }
      };
      
      if (userId) {
        getUserData();
      }
    }, []);
  
    if (!userData) {
      return <div>Cargando datos del usuario...</div>;
    }
  
    return (
      <div>
        <h1>Bienvenido, {userData.username}</h1>
        {/* Mostrar imágenes con las rutas obtenidas desde la API */}
        <img src={`https://tokenautasreact-node.onrender.com/assets/${userData.imagenusdt}`} alt="Wallet USDT" />
        <img src={`https://tokenautasreact-node.onrender.com/assets/${userData.imagenbtc}`} alt="Wallet BTC" />
      </div>
    );
  };
  

  export default Dashboard;
