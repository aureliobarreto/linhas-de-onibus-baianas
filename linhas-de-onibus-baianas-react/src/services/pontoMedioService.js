
   export default function calculateMidPoint(lat1, lon1, lat2, lon2) {
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
      }
      
      function toDegrees(radians) {
        return radians * 180 / Math.PI;
      }
    const dLon = toRadians(lon2 - lon1);
    const Bx = Math.cos(toRadians(lat2)) * Math.cos(dLon);
    const By = Math.cos(toRadians(lat2)) * Math.sin(dLon);
    const lat3 = Math.atan2(
      Math.sin(toRadians(lat1)) + Math.sin(toRadians(lat2)),
      Math.sqrt(
        (Math.cos(toRadians(lat1)) + Bx) *
        (Math.cos(toRadians(lat1)) + Bx) + By * By
      )
    );
    const lon3 = toRadians(lon1) + Math.atan2(By, Math.cos(toRadians(lat1)) + Bx);
    if(isNaN(lat3)|| isNaN(lon3)) {
        console.log('é NaN')
        return [-12.465285, -41.458080]
    }
    return [toDegrees(lat3), toDegrees(lon3)]    
  }
  
  