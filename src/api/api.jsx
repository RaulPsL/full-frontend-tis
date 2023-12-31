import axios from "axios";

export const getApi = async (route) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/${route}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todos los usuarios de la base de datos
 */
export const getApiUsuarios = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/usuarios`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todos los usuarios de la base de datos
 */
export const getApiEstudiantes = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/estudiantes`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todos los usuarios de la base de datos
 */
export const getApiDocentes = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/docentes`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todas las facultades registradas
 */
export const getApiFac = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/facultades`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todos los frentes de la base de datos
 */
export const getApiFrente = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/frentes`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todas las convocatorias estas estan contenidas y ordenadas por el tipo de eleccion
 */
export const getApiElecc = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/elecciones`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todas las convocatorias estas estan contenidas y ordenadas por el tipo de eleccion
 */
export const getApiConv = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/convocatorias`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @returns lista de todos los jurados
 */
export const getApiJurado = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/mesas`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 *
 * @param {objeto con el nombre de usuario y apellido del mismo para encontrar un usuario} request
 * @returns en el front retona el usuario buscado para agregarlo como candidato
 */
export const putApiUsuarioCand = async (request) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/putusuario`,
      request
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const postProduct = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/${route}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

/**
 * Inserta en base de datos todos los candidatos masivamente
 * @param {no necesaria} route
 * @param {objeto tipo json} formData
 * @returns
 */
export const postCandidatos = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/postcandidato`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

/**
 * Inserta en base de datos una nueva convocatoria
 * @param {no necesaria} route
 * @param {objeto tipo json} formData
 * @returns
 */
export const postConv = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/postconvocatorias`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

/**
 * Inserta en base de datos una nueva eleccion
 * @param {no necesaria} route
 * @param {objeto tipo json} formData
 * @returns
 */
export const postEleccion = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/posteleccion`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

/**
 * Inserta en base de datos un nuevo frente
 * @param {no necesaria} route
 * @param {objeto tipo json} formData
 * @returns
 */
export const postFrente = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/postfrente`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const postJurado = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/randomJurado`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const postMiembro = async (route, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/postmiembrocomite`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const putEditJurado = async (route, id, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/modifyJurado/${id}`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const putEditMiembro = async (route, id, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/postmiembrocomite/${id}`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const deleteJurado = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/deletejurado/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

export const deleteMiembro = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/deletemiembro/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

export const putConvFrente = async (route, id, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/updatefrente/${id}`,
      formData, // JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};

export const postApi = async (route, jsonData) => {
  console.log("API", jsonData);
  try {
    const response = await axios.post(
      `http://localhost:8000/api/${route}`,
      JSON.stringify(jsonData), // Convert jsonData to a JSON string
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al registrar los votos:", error);
    throw error;
  }
};
export const deleteApi = async (productId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/product/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

export const putApi = async (route, id, data) => {
  console.log("PUT", route, id, data);
  try {
    const response = await axios.put(
      `http://localhost:8000/api/${route}/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Data: ", data);
    return response.data;
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

export const boletaPDF = async () => {
  try {
    const a = document.createElement("a");
    //a.href = `${import.meta.env.VITE_BACKEND_PRODUCT}/generarBoleta`;
    a.href = "http://localhost:8000/api/generar-boleta";
    a.target = "_blank";
    a.download = "boleta.pdf";
    a.click();
  } catch (error) {
    console.error("Error al visualizar el pdf", error);
    throw error;
  }
};
