export interface ApiResponse<DataType = unknown> {
  success: boolean;
  status: number;
  data?: DataType;
  message?: string;
}

export interface ApiError<DataType = unknown> extends ApiResponse {
  success: false;
  data: DataType;
  message: string;
}
