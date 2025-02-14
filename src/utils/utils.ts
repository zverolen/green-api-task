export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString('en-US', { 
    hour: "2-digit", 
    minute: "2-digit", 
    hour12: false
  })
}