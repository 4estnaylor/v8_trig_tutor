// gets most recent (previous) sunday at midnight

const getMostRecentSunday = () => {
  const currentDate = new Date();
  const mostRecentSunday = new Date(currentDate.getTime());
  mostRecentSunday.setDate(
    mostRecentSunday.getDate() - mostRecentSunday.getDay()
  );
  mostRecentSunday.setHours(0);
  mostRecentSunday.setMinutes(0);
  mostRecentSunday.setSeconds(0);
  mostRecentSunday.setMilliseconds(0);
  return mostRecentSunday;
};

export default getMostRecentSunday;
