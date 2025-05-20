// SkyChart.jsx
import React, { useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import Modal from "./modal";
import {
  cargar,
  obtenerTopPorFOV,
  procesar,
  layout,
  estrellaPolarTrace,
} from "./skyChartUtils";
import { DataContext } from "../app.jsx";

const SkyChart = ({ hemisphere }) => {
  // Acceder al contexto de los estados globales y del Modal
  const {
    loading,
    setLoading,
    topPorFovNorth,
    setTopPorFovNorth,
    topPorFovSouth,
    setTopPorFovSouth,
    listasPorFovNorth,
    setListasPorFovNorth,
    listasPorFovSouth,
    setListasPorFovSouth,
    isModalOpen,
    setIsModalOpen, // Estado del modal
    selectedObject,
    setSelectedObject, // Objeto seleccionado
  } = useContext(DataContext);

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    const graficar = async () => {
      try {
        const { norte, sur } = await cargar();
        setTopPorFovNorth(obtenerTopPorFOV(norte));
        setTopPorFovSouth(obtenerTopPorFOV(sur));
        setListasPorFovNorth(norte);
        setListasPorFovSouth(sur);
      } catch (err) {
        console.error("Error al graficar:", err);
      } finally {
        setLoading(false);
      }
    };

    graficar();
  }, [
    setLoading,
    setTopPorFovNorth,
    setTopPorFovSouth,
    setListasPorFovNorth,
    setListasPorFovSouth,
  ]);

  // Manejador del clic en los puntos del gráfico para mostrar el modal
  const handlePointClick = (event, dataList) => {
    const pointIndex = event.points[0]?.pointIndex;
    const allObjects = Object.values(dataList).flat();
    const pointData = allObjects[pointIndex];

    if (pointData) {
        console.log(pointData)
      setSelectedObject(pointData); // Establecer el objeto seleccionado
      setIsModalOpen(true); // Abrir el modal
    }
  };

  // Función para renderizar el gráfico dependiendo del hemisferio
  const renderChart = (listas, top, includePolar = false) => {
    const data = [
      procesar(Object.values(listas).flat(), Object.values(top).flat()),
    ];
    if (includePolar) data.push(estrellaPolarTrace); // Incluir la estrella polar solo en el hemisferio norte
    return (
      <Plot
        data={data}
        layout={layout}
        onClick={(e) => handlePointClick(e, listas)} // Control de clic en los puntos
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    );
  };

  return (
    <div className="wrapper">
      <div className="skyChart">
        {loading ? (
          <p>Loading...</p>
        ) : hemisphere === "N" ? (
          renderChart(listasPorFovNorth, topPorFovNorth, true) // Gráfico del hemisferio norte
        ) : (
          renderChart(listasPorFovSouth, topPorFovSouth) // Gráfico del hemisferio sur
        )}
      </div>
      {/* Modal que se controla desde DataContext */}
      <Modal
        isOpen={isModalOpen} // Determina si el modal está abierto
        objectData={selectedObject} // Pasa el objeto seleccionado al modal
        onClose={() => setIsModalOpen(false)} // Cierra el modal
      />
    </div>
  );
};

export default SkyChart;
