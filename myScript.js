/* xmark function */
function fClose(){
    var del = document.getElementById('inputbar');

    del.value = ""; /* 검색바 내용 삭제 */

}

/* after enter, run reg, print result */
function printResult(inputbar){

    var inputbar = document.getElementById("inputbar").value; /* 입력 받은 내용*/
    var result = document.getElementById("result"); /* 검색결과 출력*/
    var tc = document.getElementById("rClose"); /* 쓰레기통 모양 아이콘 */
    /* 
    IP 정규식
    : 0~255사이의 숫자 + "." + 0~255사이의 숫자 + "." + 0~255사이의 숫자 + "." 0~255사이의 숫자
    */
    const regIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; 
    /*
    Email 정규식
    : \w(=[0-9a-zA-Z_]) 1회이상 @ \w 1회이상 "." 숫자&알파벳
    */
    const regEmail = /^\w+@\w+\.[0-9a-zA-Z]+$/;

    if(window.event.keyCode == 13){ /* enter's ascii code number = 13 */
        if(regIp.test(inputbar)){ /* regIp와 input 값 비교 */
            result.innerHTML = inputbar + " is IP";
        }else if(regEmail.test(inputbar)){ /* regEmail과 input 값 비교 */
            result.innerHTML = inputbar + " is Email";
        }else{ /* 유효하지 않은 형식입니다 */
            result.innerHTML = inputbar + " is invalid format";
        }
        tc.disabled = false; /* 쓰레기통 모양 아이콘 활성화 */
    }
}

function rClose(){ /* 쓰레기통 모양 아이콘 기능 : 출력 내용 삭제 */
    var delt = document.getElementById('result');
    var tc = document.getElementById("rClose"); /* 쓰레기통 모양 아이콘 */
 
    delt.innerHTML = ""; /* 출력 내용 삭제 */
    tc.disabled = true; /* 아이콘 비활성화 */

}
setInterval(function serverTime(){ /* 좌상단 서버타임 출력하기 */

    const config = {
        method: "get"
    }; /* GET request */

    fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul", config) /* url 주소로 get 요청 보내기 */
    .then(response => response.json())    /* json 형식으로 응답받음 */
    .then(data => {
        const time = document.getElementById("time"); /* time 출력창 */
        var getTime = data.datetime;
        var setDay = getTime.substring(0,10); /* 전체 문자열 중 날짜에 해당 */
        var setTime = getTime.substring(11,19); /* 전체 문자열 중 시간에 해당 */
        
        time.innerText = "현재 시간 >> " + setDay + " " + setTime; /* 최종 time 출력 */
    })
    .catch(error => console.log(error)); /* error 발생시 */

},1000);