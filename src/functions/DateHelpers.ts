const formatDateIsoTime = (isoString: string) => {
    const date = new Date(isoString);
    
    // Format date: DD/MM/YYYY
    const dateFormatted = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  
    // Format time: HH:MM
    const timeFormatted = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  
    return {
      date: dateFormatted,
      time: timeFormatted,
      fullFormat: `${dateFormatted} ${timeFormatted}`
    };
  };
  export {
    formatDateIsoTime
  }