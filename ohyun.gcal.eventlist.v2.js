/*
ohyun.middleschool.hompage.only
Hardboiled.wonderboy, hardboiledwonderboy@gmail.com, tragics@ohyun.ms.kr
*/

/*var.for.google.calendar.API*/
var gcalApiKey = 'AIzaSyDb2AUvKsfRul1jmYOMo54T7Sl6jm2DM9U',
d = new Date(), year = d.getFullYear(), month = d.getMonth()+1, day = d.getDate(),
today = year + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day + 'T00:00:00-00:00';
/*var.for.google.calendar.API*/



/*this.is.jquery*/
(function($) {

/*
jquery.load.google.calendar.eventlist
-------------------------------------
Hardboiled.wonderboy, hardboiledwonderboy@gmail.com, tragics@ohyun.ms.kr
*/

$.getGcalEvent = function(gcalId, eventNum, target) {
      $.ajax({
        url: 'https://www.googleapis.com/calendar/v3/calendars/' + gcalId + '/events?timeMin=' + today + '&singleEvents=True&orderBy=startTime&maxResults=' + eventNum + '&key=' + gcalApiKey,
        type: 'GET',
        dataType: 'json',
        success: function(json) {
          var printEvent = '';
          $.each(json.items, function(i, item) {
            var eventTitle = item.summary;
            var htmlLink = '<a href="' + item.htmlLink + '" target="_blank" title="세부 일정을 새창으로 엽니다."></a>';
             //detail.htmllink.not.used
            var description = item.description;
            var idNum = i+1;
            if(item.start.date) {
              var startTime = item.start.date, sd = new Date(startTime);
            }
            else {
              var startDateTime = item.start.dateTime;
              var sdt1 = startDateTime.substr(0,10);
              var sdt2 = startDateTime.substr(11,5);
            }
            if(item.end.date) {
              var endTime = item.end.date, ed = new Date(endTime);
              ed.setDate(ed.getDate() - 1);
              var eY = ed.getFullYear(), eM = ed.getMonth()+1, eD = ed.getDate();
              endTime = eY + '-' + (eM<10 ? '0' : '') + eM + '-' + (eD<10 ? '0' : '') + eD;
              if(ed - sd == 0) eventTime = startTime.substr(5,5); else eventTime = startTime.substr(5,5) + '~' + endTime.substr(5,5);
            }
            else {
              var endDateTime = item.end.dateTime;
              var edt1 = endDateTime.substr(0,10);
              var edt2 = edt1.substr(5,5);
              var edt3 = endDateTime.substr(11,5);
              if(sdt1 == edt1) eventTime = sdt1.substr(5,5) + '(' + sdt2 + '~' + edt3 + ')';
              else eventTime = sdt1.substr(5,5) + '(' + sdt2 + ')~' + edt2 + '(' + edt3 + ')';
            }
            var monStyle = sd1.getMonth();
            if(monStyle == 11) monStyle = 1; else monStyle = parseInt(monStyle/3) + 1;
            console.log(monStyle);
            console.log(eventTime);

            //Load description
            if(item.description) {
              description = description.replace(/href/gi,'class="description-link" target="_parent" href');
              description = '<a href="#popup' + idNum +'"><svg fill="#a4a4a4" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path id="description" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg></a><div id="popup' + idNum +'" class="overlay"><div class="popup"><h3>' + eventTitle  + '</h3><a class="close" href="#">×</a><div class="divider"></div><div style="padding-top: 10px;">' + description + '</div></div></div>';
            }
              else description = '';
            //Load location
            if(item.location) var location = '<a href="http://maps.google.com/maps?q=' + encodeURI(item.location) + '" target="_blank" title="[새창] ' + item.location + '"><svg fill="#a4a4a4" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path id="location" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg></a>'; else location = '';
            //Print event
            printEvent += '<li><span class="chips chips-' + monStyle +'">' + eventTime.replace(/-/gi, "/") + '</span><span style="vertical-align: baseline">' + eventTitle + description + location + '</span></li><li class="divider"></li>';
            $(target).html(printEvent);
          });
        }
      });
    } //get.google.calendar.event.list

//document.ready
$(function(){
$.getGcalEvent('event@ohyun.ms.kr', '7', '#gcaleventlist'); //load.google.calendar.eventlist
});
//document.ready

} //function($).end
)(jQuery);
