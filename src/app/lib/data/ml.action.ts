import { PredictionResult } from "@/app/types/ml.type";
import { post } from "./fetcher";

export async function predict(body: { answers: number[] }) {
  const response = await post("ml/predict", body);
  if (response.status === "success") {
    return response.data as PredictionResult;
  } else {
    return null;
  }
}
