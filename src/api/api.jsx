import axios from "axios";

export const getApi = async (route) => {
  try {
    const response = await axios.get(`http://softcode.tis.cs.umss.edu.bo/api/v1/${route}`);

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
      `http://softcode.tis.cs.umss.edu.bo/api/usuarios`
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
      `http://softcode.tis.cs.umss.edu.bo/api/estudiantes`
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
      `http://softcode.tis.cs.umss.edu.bo/api/docentes`
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
      `http://softcode.tis.cs.umss.edu.bo/api/facultades`
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
      `http://softcode.tis.cs.umss.edu.bo/api/frentes`
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
      `http://softcode.tis.cs.umss.edu.bo/api/elecciones`
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
      `http://softcode.tis.cs.umss.edu.bo/api/convocatorias`
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
      `http://softcode.tis.cs.umss.edu.bo/api/mesas`
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
      `http://softcode.tis.cs.umss.edu.bo/api/putusuario`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/v1/${route}`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/postcandidato`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/postconvocatorias`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/posteleccion`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/postfrente`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/randomJurado`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/postmiembrocomite`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/modifyJurado/${id}`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/postmiembrocomite/${id}`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/deletejurado/${id}`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/deletemiembro/${id}`,
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
      `http://softcode.tis.cs.umss.edu.bo/api/updatefrente/${id}`,
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
    a.href = 'http://softcode.tis.cs.umss.edu.bo/api/generar-boleta';
    a.target = '_blank';
    a.download = 'boleta.pdf';
    a.click();
  } catch (error) {
    console.error("Error al visualizar el pdf", error);
    throw error;
  }
};
