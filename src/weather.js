(getTime => {

  (setTime => {
    let date = new Date();
    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    let time = hour + ":" + min;
    $("#time").html(time);  
    setGreeting(hour);  
  })();

  (setDate => {
    let date = new Date();  
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    let day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    let currentDate = month + "/" + day + "/" + year;
    $("#date").html(currentDate);    
  })();

  function setGreeting(hour){
    let greeting;
    (5 < hour && hour <= 12) ? (greeting = 'Morning') 
      : (12 < hour && hour <= 18) ? (greeting = 'Afternoon')
      : (18 < hour && hour <= 21) ? (greeting = 'Evening')
      : (greeting = 'Night');
    $('#greeting').text(`Good ${greeting}!`);
    $('body').css('background-image', `url('img/${greeting}.jpg')`); 
  }
})();