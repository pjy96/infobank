/* xmark function */
function fClose(){
    var del = document.getElementById('inputbar');
    del.value = ""; /* 검색바 내용 삭제 */
}

/* after enter, run reg, print result */
function printResult(inputbar){

    var inputbar = document.getElementById("inputbar").value; /* 입력 받은 내용*/
    var result = document.getElementById("result"); /* 검색결과 출력창*/
    var tc = document.getElementById("rClose"); /* 쓰레기통 모양 아이콘 */
    var element = document.getElementById("time"); /* div time (현재시간) */

    /* IP 정규식 : 0~255사이의 숫자 + "." + 0~255사이의 숫자 + "." + 0~255사이의 숫자 + "." 0~255사이의 숫자 */
    const regIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; 
    /* Email 정규식 : \w(=[0-9a-zA-Z_]) 1회이상 @ \w 1회이상 "." 숫자&알파벳 */
    const regEmail = /^\w+@\w+\.[0-9a-zA-Z]+$/;

    // if(window.event.keyCode == 13){ /* enter's ascii code number = 13 */

    //     if(regIp.test(inputbar)){ /* regIp와 input 값 비교 */

    //         result.innerText = element.innerText + " | " + inputbar + " is IP";

    //     }else if(regEmail.test(inputbar)){ /* regEmail과 input 값 비교 */

    //         result.innerText = element.innerText + " | " + inputbar + " is Email";

    //     }else{ /* 유효하지 않은 형식입니다 */

    //         result.innerText = element.innerText + " | " + inputbar + " is invalid format";
    //     }

    //     tc.disabled = false; /* 쓰레기통 모양 아이콘 활성화 */

}

var arr = []; // 배열 생성
function test(){

    // enter 입력시 배열에 저장하고 가장 최근에 저장된 배열을 가장 위에 출력
    // foreach (각 요소 호출) -> var text += 시간 + " | " + inputbar + 검사결과 + "<br>";
    // pop : 마지막 요소 제거
    // unshift : (배열을 역순으로) 새 항목 추가

    // 1. enter 입력시 배열에 저장 
    // 2. 배열의 길이는 5개로 제한 (5개를 초과하면 가장 오래된/마지막 데이터 삭제)
    // 3. 가장 최근 데이터부터 출력 (배열 전체)
    // + 가장 최근 데이터가 데이터의 가장 처음 인덱스에 위치해야함 
    // 4. 배열의 길이가 0개 이상이면 

    var inputbar = document.getElementById("inputbar").value; // inputbar 값 가져오기
    var result = document.getElementById("result"); // 검색결과 출력창
    
    arr.unshift(inputbar); // 배열에 저장(가장 최근 데이터가 위로 오게)
    //배열의 길이가 5개를 넘지 않게
    if(arr.length > 5){
        arr.pop(); // 가장 오래된 데이터 삭제
    }

    // 화면에 출력
    arr.forEach(element => {
        console.log(element);
        result.innerText = element + "\n";
        result.innerText = arr
    })


}

/* 쓰레기통 모양 아이콘 기능 : 출력 내용 삭제 */
function rClose(){ 
    var delt = document.getElementById('result');
    var tc = document.getElementById("rClose"); /* 쓰레기통 모양 아이콘 */
 
    delt.innerHTML = ""; /* 출력 내용 삭제 */
    tc.disabled = true; /* 아이콘 비활성화 */
}

/* fetch로 좌상단 서버타임 출력하기 */
// setInterval(function serverTime(){ 
//     const config = {
//         method: "get"
//     }; /* GET request */
//     fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul", config) /* url 주소로 get 요청 보내기 */
//         .then(response => response.json())    /* json 형식으로 응답받음 */
//         .then(data => {
//             const time = document.getElementById("time"); /* time 출력창 */
//             var getTime = data.datetime;
//             var setDay = getTime.substring(0,10); /* 전체 문자열 중 날짜에 해당 */
//             var setTime = getTime.substring(11,19); /* 전체 문자열 중 시간에 해당 */
//             time.innerText = setDay + " " + setTime; /* 최종 time 출력 */
//     })
//     .catch(error => console.log(error)); /* error 발생시 */
// },1000);

// ajax로 서버시간 호출하기
setInterval(function request_time() {
    $.ajax({
        //Get 방식
        type: "GET", 
        url: "http://worldtimeapi.org/api/timezone/Asia/Seoul",
        //호출 성공했을때
        success: function(res){
            const time = document.getElementById("time"); //time 출력창
            var getTime = res.datetime; //worldtimeapi 중 datetime 추출
            var setDay = getTime.substring(0,10); // 전체 문자열 중 날짜에 해당
            var setTime = getTime.substring(11,19); // 전체 문자열 중 시간에 해당
            time.innerText = setDay + " " + setTime; // 최종 time 출력
        },
        //호출 error
        error:  function(XMLHttpRequest, textStatus, errorThrown){
            alert("Fail");
        } 
    })
}, 1000); //1초마다 한번씩
