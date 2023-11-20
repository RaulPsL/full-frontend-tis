import axios from "axios";

export const getApi = async (route) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/${route}`);

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
    const response = await axios.get(
      `http://localhost:8000/api/usuarios`
    );

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
    const response = await axios.get(
      `http://localhost:8000/api/estudiantes`
    );

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
    const response = await axios.get(
      `http://localhost:8000/api/docentes`
    );

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
    const response = await axios.get(
      `http://localhost:8000/api/facultades`
    );

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
    const response = await axios.get(
      `http://localhost:8000/api/frentes`
    );

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
    const response = await axios.get(
      `http://localhost:8000/api/elecciones`
    );

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
    const response = await axios.get(
      `http://localhost:8000/api/convocatorias`
    );

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
    const response = await axios.get(
      `http://localhost:8000/api/mesas`
    );

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
      `http://127.0.0.1:8000/api/v1/${route}`,
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
      `http://127.0.0.1:8000/api/postcandidato`,
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
      `http://127.0.0.1:8000/api/postconvocatorias`,
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
      `http://127.0.0.1:8000/api/posteleccion`,
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
      `http://127.0.0.1:8000/api/postfrente`,
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
      `http://127.0.0.1:8000/api/postmiembrocomite`,
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
      `http://127.0.0.1:8000/api/postmiembrocomite/${id}`,
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

export const deleteMiembro = async (id) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/deletemiembro/${id}`,
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
      `http://127.0.0.1:8000/api/updatefrente/${id}`,
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
  console.log(jsonData);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/${route}`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
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
export const putApi = async (route, productId, formData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/${route}/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("FormDATA: ", formData);
    return response.data;
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

export const boletaPDF = async () => {
  try {
    const a = document.createElement('a');
    //a.href = `${import.meta.env.VITE_BACKEND_PRODUCT}/generarBoleta`;
    a.href = 'http://localhost:8000/api/generar-boleta';
    a.target = '_blank';
    a.download = 'boleta.pdf';
    a.click();
  } catch (error) {
    console.error("Error al visualizar el pdf", error);
    throw error;
  }
};
