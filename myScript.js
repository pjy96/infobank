/* xmark function */
function fClose(){
    var inputbar = document.getElementById('inputbar');
    inputbar.value = ""; /* 검색바 내용 삭제 */
}

/* after enter, run reg, print result */
var arr = []; // 배열생성
function printResult(inputbar){

    var inputbar = document.getElementById("inputbar").value; /* 입력 받은 내용*/
    var result = document.getElementById("result"); /* 검색결과 출력창*/
    var tc = document.getElementById("rClose"); /* 쓰레기통 모양 아이콘 */
    var element = document.getElementById("time"); /* div time (현재시간) */

    /* IP 정규식 : 0~255사이의 숫자 + "." + 0~255사이의 숫자 + "." + 0~255사이의 숫자 + "." 0~255사이의 숫자 */
    const regIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; 
    /* Email 정규식 : \w(=[0-9a-zA-Z_]) 1회이상 @ \w 1회이상 "." 숫자&알파벳 */
    const regEmail = /^\w+@\w+\.[0-9a-zA-Z]+$/;


    function deleteRow(idx){
        //slice
        //prnitResult
    }
    /*
    함수
        //배열을 만드는 함수(타입 : 이메일, ip, FAIL)
        //만약에 배열이 초과꽉찼어
            하나빼주고
            추가해줘
    
    */
    function addRow(resultString){

        result.innerText = ""; //출력창 초기화
        tst = element.innerHTML + " | " + inputbar + resultString;
        //배열의 길이가 5개를 넘지 않게
        if(arr.length >= 5){
            arr.pop(); // 가장 오래된 데이터 삭제
            arr.unshift(tst);
            console.log(arr)
        }
        // arr 사이즈 확인
    }

    function prnitResult(){
        //해당 div 출력
        // result.innerText = ""; //출력창 초기화
    }

    // function printIP(){ // IP 출력
    //     tst = element.innerText + " | " + inputbar + " is IP";
    //     arr.unshift(tst); // 배열에 저장(가장 최근 데이터가 위로 오게)
    //     arr.forEach(text => { // 배열의 요소 추출해서 출력
    //         result.innerText += text + "\n"; 
    //     })
    // }

    if(window.event.keyCode == 13){ /* enter's ascii code number = 13 */

        if(regIp.test(inputbar)){ /* regIp */
            addRow(" is ip");
        }else if(regEmail.test(inputbar)){ /* regEmail */
            addRow(" is Email");
        }else{ /* invalid */
            addRow(" is Invalid format");
        }

        //print array
        arr.forEach(text => { // 배열의 요소 추출해서 출력
            result.innerText = tst.innerHTML + "\n"; 
            
        })

        tc.disabled = false; /* 쓰레기통 모양 아이콘 활성화 */
    }

    const rClose = document.querySelectorAll(".rClose"); // 삭제버튼 선택
    rClose.forEach(btn => {
        btn.addEventListener("click", (event) => {
            result.innerHTML = "";
            tc.disabled = true; 
        })
    })
}










/* 쓰레기통 모양 아이콘 기능 : 출력 내용 삭제 */
// function rClose(){ 
//     var delt = document.getElementById('result');
//     var tc = document.getElementById("rClose"); /* 쓰레기통 모양 아이콘 */
//     delt.innerHTML = ""; /* 출력 내용 삭제 */
//     tc.disabled = true; /* 아이콘 비활성화 */
// }

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
