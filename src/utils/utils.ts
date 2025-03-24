export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString('en-US', { 
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: false
  })
}

interface FormValues {
  idInstance: string;
  apiTokenInstance: string;
}

export function getTrimmedValues(values: FormValues): FormValues {
  return {
    idInstance: values.idInstance.trim(),
    apiTokenInstance: values.apiTokenInstance.trim()
  }
}