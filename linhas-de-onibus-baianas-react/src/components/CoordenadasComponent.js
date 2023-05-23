import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CoordenadasComponent() {
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [coordenadas, setCoordenadas] = useState(null);

  useEffect(() => {
    // Função para fazer a chamada à API quando a cidade e o estado forem atualizados
    async function buscarCoordenadas() {
      if (cidade && estado) {
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              format: 'json',
              q: `${cidade}, ${estado}`,
              limit: 1,
            },
          });

          if (response.data && response.data.length > 0) {
            const latitude = parseFloat(response.data[0].lat);
            const longitude = parseFloat(response.data[0].lon);
            setCoordenadas({ latitude, longitude });
          } else {
            setCoordenadas(null);
          }
        } catch (error) {
          console.error('Erro ao buscar as coordenadas:', error);
          setCoordenadas(null);
        }
      }
    }

    buscarCoordenadas();
  }, [cidade, estado]);

  return (
    <div>
      <input
        type="text"
        value={cidade}
        onChange={(event) => setCidade(event.target.value)}
        placeholder="Digite a cidade"
      />
      <input
        type="text"
        value={estado}
        onChange={(event) => setEstado(event.target.value)}
        placeholder="Digite o estado"
      />

      {coordenadas && (
        <p>
          Latitude: {coordenadas.latitude}, Longitude: {coordenadas.longitude}
        </p>
      )}
    </div>
  );
}

export default CoordenadasComponent;
