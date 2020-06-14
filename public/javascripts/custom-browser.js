var agent = navigator.userAgent.toLowerCase();

if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
    alert('IE가 아닌 다른 브라우저로 접속해주세요.');
    location.href = "https://www.google.co.kr/chrome";
    //history.back();
}