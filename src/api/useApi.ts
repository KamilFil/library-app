const API_URL = import.meta.env.VITE_API_URL;

export const useApi = () => {
  const call = async <R, P = object>(
    url: string,
    method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH',
    payload?: P,
  ): Promise<R> => {
    const fetchConfig = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload ? JSON.stringify(payload) : undefined,
    };

    try {
      const response = await fetch(`${API_URL}${url}`, fetchConfig);

      if (response.ok) {
        return response.json();
      } else {
        const apiError: string = await response.text();
        throw new Error(apiError);
      }
    } catch (e) {
      throw new Error(`Wystąpił błąd! ${e}`);
    }
  };

  const apiGet = async <R>(url: string) => {
    return await call<R>(url, 'GET');
  };

  const apiPost = async <R, P>(url: string, payload: P) => {
    return await call<R, P>(url, 'POST', payload);
  };

  const apiPut = async <R, P>(url: string, payload: P) => {
    return await call<R, P>(url, 'PUT', payload);
  };

  const apiPatch = async <R, P>(url: string, payload: P) => {
    return await call<R, P>(url, 'PATCH', payload);
  };

  const apiDelete = async <R>(url: string) => {
    return await call<R>(url, 'DELETE');
  };

  return {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    apiPatch,
  };
};
