// export const uploadFile = async (formData: any, setLoading: any) => {
import { Dispatch, SetStateAction } from "react";

interface UploadResponse {
  result: string; // or any other fields returned from the server
}

export const uploadFile = async (
  formData: FormData,
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<UploadResponse> => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/upload`;
  setLoading(true);
  const config = {
    method: "POST",
    body: formData,
  };
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    setLoading(false);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
    throw error;
  }
};
