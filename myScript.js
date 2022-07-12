/* xmark function */
function fClose(){
    var del = document.getElementById('inputbar');
    del.value = ""; /* 검색바 내용 삭제 */
}

/* 쓰레기통 모양 아이콘 기능 : 출력 내용 삭제 */
function rClose(){ 
    var delt = document.getElementById('result');
    var tc = document.getElementById("rClose"); /* 쓰레기통 모양 아이콘 */
 
    delt.innerHTML = ""; /* 출력 내용 삭제 */
    tc.disabled = true; /* 아이콘 비활성화 */
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


    var addList = document.createElement("p"); // 새로운 태그를 마지막 자식노드로 추가
    var textnode = document.createTextNode(element.innerText + " | " + inputbar); //텍스트 생성

    if(window.event.keyCode == 13){ /* enter's ascii code number = 13 */

        addList.appendChild(textnode);
        result.innerText = addList.textContent;

        if(regIp.test(inputbar)){ /* regIp와 input 값 비교 */

            addList.append(element.innerText + " | " + inputbar + " is IP");
            result.innerText = addList.textContent;

        }else if(regEmail.test(inputbar)){ /* regEmail과 input 값 비교 */
            result.innerText = element.innerText + " | " + inputbar + " is Email";
        }else{ /* 유효하지 않은 형식입니다 */
            result.innerText = element.innerText + " | " + inputbar + " is invalid format";
        }

        tc.disabled = false; /* 쓰레기통 모양 아이콘 활성화 */

    }
}

function test(){

    var element = document.getElementById("time"); /* div time (현재시간) */
    var newDiv = document.createElement('div'); // div element 만들기
    var newText = document.createTextNode(element.innerText); // div에 들어갈 textnode 만들기

    newDiv.appendChild(newText); // div에 textnode 붙이기
    Container.appendChild(newDiv); // 결과 출력창에 div element 붙이기
    console.log(element.innerText)
    // 여기까진 element appendChild

    // var arr = [5]; // 배열선언
    // var entire = arr.push(element); // 배열에 element 추가

    // console.log(arr)
    // console.log(entire)
    
    // 클릭수++로 5개까지 제한하고 삭제할때 remove --

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
