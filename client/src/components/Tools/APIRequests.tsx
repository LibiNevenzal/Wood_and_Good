import {config} from '../config'

interface QueryParams {
  [key: string]: any;
}

interface ResponseData {
  data: any[];
  total: any[];
}

export const getRequest = async (
  table: string,
  conditions: string | null,
  state: React.Dispatch<React.SetStateAction<any>>,
  comment: (message: string) => void,
  object: string = ""
): Promise<number> => {
  const url = `http://${config.SERVERPORT}/${table}${conditions ? `${conditions}` : ""}`;
  try {
    const response = await fetch(url, {
      headers: {
        Origin: `http://${config.SERVERPORT}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData: ResponseData = await response.json();

    if (responseData.data.length === 0) {
      switch (object) {
        case "תורם":
        case "משתמש":
        case "איש קשר":
          comment(`לא נמצא ${object}`);
          break;
        case "כתובת מייל":
          comment("כתובת מייל או סיסמא שגויים.");
          break;
        case "שכחתי סיסמה":
          comment("כתובת מייל זו אינה מופיעה במערכת.");
          break;
        default:
          comment(`לא נמצאה ${object}`);
          break;
      }
      return 0;
    } else {
      comment("");
      state(responseData.data);
      const total = responseData.total[0]?.total || responseData.data.length;
      return total;
    }
  } catch (error) {
    comment("שגיאת שרת");
    return 0;
  }
};

export const getByIdRequest = async (
  table: string,
  id: string | number,
  state: React.Dispatch<React.SetStateAction<any>>,
  comment: (message: string) => void
): Promise<boolean> => {
  const url = `http://${config.SERVERPORT}/${table}/${id}`;
  try {
    const response = await fetch(url, {
      headers: {
        Origin: `http://${config.SERVERPORT}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (Object.keys(data).length === 0) {
      return false;
    } else {
      state(data["data"][0]);
      return true;
    }
  } catch (error) {
    comment("שגיאת שרת");
    return false;
  }
};

export const getManyItemsByIdRequest = async (
  table: string,
  id: string | number,
  state: React.Dispatch<React.SetStateAction<any[]>>,
  comment: (message: string) => void
): Promise<boolean> => {
  const url = `http://${config.SERVERPORT}/${table}/${id}`;
  try {
    const response = await fetch(url, {
      headers: {
        Origin: `http://${config.SERVERPORT}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (data.data.length === 0) {
      comment("לא נמצא");
      return false;
    } else {
      state(data["data"]);
      return true;
    }
  } catch (error) {
    comment("שגיאת שרת");
    return false;
  }
};

export const putRequest = async (
  table: string,
  updatedObject: Record<string, any>,
  id: string | number,
  setIsSucceed: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  try {
    const response = await fetch(`http://${config.SERVERPORT}/${table}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Origin: `http://${config.SERVERPORT}`,
      },
      method: "PUT",
      body: JSON.stringify(updatedObject),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (Object.keys(data).length === 0) {
      setIsSucceed("error");
    } else {
      setIsSucceed("success");
    }
  } catch (error) {
    setIsSucceed("error");
  }
};

export const deleteRequest = async (
  table: string,
  id: string | number,
  setIsSucceed: React.Dispatch<React.SetStateAction<string>>
): Promise<boolean> => {
  try {
    const response = await fetch(`http://${config.SERVERPORT}/${table}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Origin: `http://${config.SERVERPORT}`,
      },
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (Object.keys(data).length === 0) {
      setIsSucceed("error");
      return false;
    } else {
      setIsSucceed("success");
      return true;
    }
  } catch (error) {
    setIsSucceed("error");
    return false;
  }
};

export const postRequest = async (
  table: string,
  newItem: Record<string, any>,
  comment: (message: string) => void,
  newID?: React.Dispatch<React.SetStateAction<number>>
): Promise<boolean> => {
  try {
    const response = await fetch(`http://${config.SERVERPORT}/${table}`, {
      headers: {
        "Content-Type": "application/json",
        Origin: `http://${config.SERVERPORT}`,
      },
      method: "POST",
      body: JSON.stringify(newItem),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (newID) {
      const insertId = data["insertId"];
      newID(insertId);
    }

    comment("success");
    return true;
  } catch (error) {
    comment("error");
    return false;
  }
};
